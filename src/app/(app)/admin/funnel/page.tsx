'use client'

import { useEffect, useState } from 'react'

type Period = 'today' | '7d' | '30d' | 'all'

interface FunnelCounts {
  views: number
  starts: number
  submit_attempts: number
  submits: number
  applications_in_db: number
  approved: number
}

interface SourceRow {
  source: string
  views: number
  starts: number
  submits: number
  approved: number
  conversion: number
}

interface DeviceRow {
  views: number
  submits: number
}

interface FunnelData {
  period: Period
  funnel: FunnelCounts
  sources: SourceRow[]
  devices: Record<string, DeviceRow>
}

function pct(num: number, den: number): string {
  if (!den) return '—'
  return ((num / den) * 100).toFixed(1) + '%'
}

export default function FunnelPage() {
  const [period, setPeriod] = useState<Period>('30d')
  const [data, setData] = useState<FunnelData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    fetch(`/api/admin/funnel?period=${period}`)
      .then(r => r.json())
      .then((json) => {
        if (json.error) setError(json.error)
        else { setData(json); setError('') }
      })
      .catch((e) => setError(String(e)))
      .finally(() => setLoading(false))
  }, [period])

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#1E2A4A]">Applicant Funnel</h1>
        <div className="flex gap-2">
          {(['today', '7d', '30d', 'all'] as Period[]).map(p => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 text-sm rounded-lg border ${
                period === p ? 'bg-[#1E2A4A] text-white border-[#1E2A4A]' : 'bg-white text-[#1E2A4A] border-gray-300'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {loading && <p className="text-gray-500">Loading…</p>}
      {error && <p className="text-red-600 bg-red-50 px-4 py-3 rounded">Error: {error}</p>}

      {data && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-8">
            <Metric label="Page Views" value={data.funnel.views} />
            <Metric label="Form Started" value={data.funnel.starts} sublabel={pct(data.funnel.starts, data.funnel.views)} />
            <Metric label="Submit Attempts" value={data.funnel.submit_attempts} sublabel={pct(data.funnel.submit_attempts, data.funnel.starts)} />
            <Metric label="Submitted" value={data.funnel.submits} sublabel={pct(data.funnel.submits, data.funnel.submit_attempts)} />
            <Metric label="In DB" value={data.funnel.applications_in_db} />
            <Metric label="Approved" value={data.funnel.approved} sublabel={pct(data.funnel.approved, data.funnel.applications_in_db)} />
          </div>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3 text-[#1E2A4A]">By Source</h2>
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-600">
                  <tr>
                    <th className="text-left px-4 py-2">Source</th>
                    <th className="text-right px-4 py-2">Views</th>
                    <th className="text-right px-4 py-2">Starts</th>
                    <th className="text-right px-4 py-2">Submits</th>
                    <th className="text-right px-4 py-2">Approved</th>
                    <th className="text-right px-4 py-2">View → Submit</th>
                  </tr>
                </thead>
                <tbody>
                  {data.sources.length === 0 ? (
                    <tr><td colSpan={6} className="px-4 py-6 text-center text-gray-400">No data yet for this period</td></tr>
                  ) : data.sources.map(s => (
                    <tr key={s.source} className="border-t border-gray-100">
                      <td className="px-4 py-2 text-[#1E2A4A] font-medium">{s.source}</td>
                      <td className="text-right px-4 py-2">{s.views}</td>
                      <td className="text-right px-4 py-2">{s.starts}</td>
                      <td className="text-right px-4 py-2">{s.submits}</td>
                      <td className="text-right px-4 py-2">{s.approved}</td>
                      <td className="text-right px-4 py-2 font-medium">{(s.conversion * 100).toFixed(1)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3 text-[#1E2A4A]">By Device</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {(['mobile', 'desktop', 'tablet'] as const).map(d => {
                const v = data.devices[d] || { views: 0, submits: 0 }
                return (
                  <div key={d} className="bg-white rounded-lg border border-gray-200 p-4">
                    <div className="text-xs uppercase tracking-wider text-gray-500">{d}</div>
                    <div className="text-2xl font-bold text-[#1E2A4A] mt-1">{v.views} views</div>
                    <div className="text-sm text-gray-600">{v.submits} submits · {pct(v.submits, v.views)} conversion</div>
                  </div>
                )
              })}
            </div>
          </section>
        </>
      )}
    </div>
  )
}

function Metric({ label, value, sublabel }: { label: string; value: number; sublabel?: string }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-3">
      <div className="text-xs uppercase tracking-wider text-gray-500">{label}</div>
      <div className="text-2xl font-bold text-[#1E2A4A] mt-1">{value}</div>
      {sublabel && <div className="text-xs text-gray-500 mt-0.5">{sublabel}</div>}
    </div>
  )
}
