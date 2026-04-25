import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { protectAdminAPI } from '@/lib/auth'

interface ClickRow {
  action: string
  visitor_id: string | null
  device: string | null
  utm_source: string | null
  utm_medium: string | null
  utm_campaign: string | null
  referrer: string | null
  page: string | null
  created_at: string
}

interface ApplicationRow {
  id: string
  status: string | null
  utm_source: string | null
  utm_medium: string | null
  utm_campaign: string | null
  referrer: string | null
  device: string | null
  visitor_id: string | null
  created_at: string
}

async function fetchAll<T>(query: any, maxRows = 50000): Promise<T[]> {
  const PAGE = 1000
  let all: T[] = []
  let offset = 0
  while (all.length < maxRows) {
    const { data, error } = await query.range(offset, offset + PAGE - 1)
    if (error) throw error
    if (!data || data.length === 0) break
    all = all.concat(data as T[])
    if (data.length < PAGE) break
    offset += PAGE
  }
  return all.slice(0, maxRows)
}

function sourceLabel(row: { utm_source: string | null; referrer: string | null }): string {
  if (row.utm_source) return row.utm_source.toLowerCase()
  const ref = (row.referrer || '').toLowerCase()
  if (!ref || ref === 'direct') return 'direct'
  if (ref.includes('google')) return 'google_organic'
  if (ref.includes('facebook') || ref.includes('fb.com')) return 'facebook'
  if (ref.includes('instagram')) return 'instagram'
  if (ref.includes('indeed')) return 'indeed'
  if (ref.includes('craigslist')) return 'craigslist'
  if (ref.includes('reddit')) return 'reddit'
  if (ref.includes('tiktok')) return 'tiktok'
  if (ref.includes('youtube')) return 'youtube'
  try {
    const host = new URL(ref.startsWith('http') ? ref : `https://${ref}`).hostname.replace(/^www\./, '')
    return host || 'other'
  } catch {
    return 'other'
  }
}

export async function GET(request: Request) {
  const authError = await protectAdminAPI()
  if (authError) return authError

  try {
    const { searchParams } = new URL(request.url)
    const period = searchParams.get('period') || '30d'

    const now = new Date()
    let since: Date
    if (period === 'today') {
      since = new Date(now); since.setHours(0, 0, 0, 0)
    } else if (period === '7d') {
      since = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    } else if (period === '30d') {
      since = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
    } else {
      since = new Date(0)
    }
    const sinceIso = since.toISOString()

    const applyClicks = await fetchAll<ClickRow>(
      supabaseAdmin
        .from('lead_clicks')
        .select('action, visitor_id, device, utm_source, utm_medium, utm_campaign, referrer, page, created_at')
        .gte('created_at', sinceIso)
        .like('page', '/apply%')
        .order('created_at', { ascending: false }),
    )

    const applications = await fetchAll<ApplicationRow>(
      supabaseAdmin
        .from('cleaner_applications')
        .select('id, status, utm_source, utm_medium, utm_campaign, referrer, device, visitor_id, created_at')
        .gte('created_at', sinceIso)
        .order('created_at', { ascending: false }),
    )

    const visitorsByAction: Record<string, Set<string>> = {
      apply_view: new Set(),
      apply_start: new Set(),
      apply_submit_attempt: new Set(),
      apply_submit_success: new Set(),
      apply_submit_error: new Set(),
    }
    for (const row of applyClicks) {
      const v = row.visitor_id || `anon:${row.created_at}`
      const action = row.action === 'visit' ? 'apply_view' : row.action
      if (visitorsByAction[action]) visitorsByAction[action].add(v)
    }

    const fieldDropoff: Record<string, number> = {}
    for (const row of applyClicks) {
      if (row.action !== 'apply_field_complete') continue
    }

    const sourceFunnel: Record<string, { views: number; starts: number; submits: number; approved: number }> = {}
    for (const row of applyClicks) {
      const src = sourceLabel(row)
      if (!sourceFunnel[src]) sourceFunnel[src] = { views: 0, starts: 0, submits: 0, approved: 0 }
      const action = row.action === 'visit' ? 'apply_view' : row.action
      if (action === 'apply_view') sourceFunnel[src].views++
      else if (action === 'apply_start') sourceFunnel[src].starts++
      else if (action === 'apply_submit_success') sourceFunnel[src].submits++
    }
    for (const app of applications) {
      const src = sourceLabel(app)
      if (!sourceFunnel[src]) sourceFunnel[src] = { views: 0, starts: 0, submits: 0, approved: 0 }
      if (app.status === 'approved') sourceFunnel[src].approved++
    }

    const deviceCounts: Record<string, { views: number; submits: number }> = {
      mobile: { views: 0, submits: 0 },
      desktop: { views: 0, submits: 0 },
      tablet: { views: 0, submits: 0 },
    }
    for (const row of applyClicks) {
      const d = (row.device || 'desktop').toLowerCase()
      if (!deviceCounts[d]) deviceCounts[d] = { views: 0, submits: 0 }
      const action = row.action === 'visit' ? 'apply_view' : row.action
      if (action === 'apply_view') deviceCounts[d].views++
      if (action === 'apply_submit_success') deviceCounts[d].submits++
    }

    const totalApproved = applications.filter(a => a.status === 'approved').length
    const totalApps = applications.length

    return NextResponse.json({
      period,
      funnel: {
        views: visitorsByAction.apply_view.size,
        starts: visitorsByAction.apply_start.size,
        submit_attempts: visitorsByAction.apply_submit_attempt.size,
        submits: visitorsByAction.apply_submit_success.size,
        applications_in_db: totalApps,
        approved: totalApproved,
      },
      sources: Object.entries(sourceFunnel)
        .map(([source, v]) => ({ source, ...v, conversion: v.views > 0 ? (v.submits / v.views) : 0 }))
        .sort((a, b) => b.views - a.views),
      devices: deviceCounts,
      drop_off_fields: Object.entries(fieldDropoff)
        .map(([field, count]) => ({ field, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10),
    })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error'
    console.error('Funnel API error:', err)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
