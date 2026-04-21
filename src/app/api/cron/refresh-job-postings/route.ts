import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { protectCronAPI } from '@/lib/auth'
import { ALL_NEIGHBORHOODS } from '@/lib/seo/locations'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const tokenParam = url.searchParams.get('token')
  const cronSecret = process.env.CRON_SECRET

  const tokenOk = cronSecret && tokenParam === cronSecret
  if (!tokenOk) {
    const authError = protectCronAPI(request)
    if (authError) return authError
  }

  revalidatePath('/available-florida-maid-jobs/[slug]', 'page')
  revalidatePath('/available-florida-maid-jobs', 'page')

  return NextResponse.json({
    success: true,
    revalidated: ALL_NEIGHBORHOODS.length + 1,
    at: new Date().toISOString(),
  })
}
