'use client'
import { useEffect, useState } from 'react'
import WebsitesMap from '@/components/WebsitesMap'

interface Website {
  domain: string
  location: string
  region: string
  url: string
  lat?: number
  lng?: number
}

const ITEMS_PER_PAGE = 24

export default function WebsitesPage() {
  useEffect(() => { document.title = 'Websites | The Florida Maid Cleaning Service Cleaning Service' }, []);
  const [websites, setWebsites] = useState<Website[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRegion, setSelectedRegion] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    loadWebsites()
  }, [])

  const loadWebsites = () => {
    const sites: Website[] = [
      // ========== FLORIDA ==========
      { domain: 'thefloridamaid.com', location: 'Florida', region: 'Statewide', url: 'https://thefloridamaid.com', lat: 28.5383, lng: -81.3792 },
    ]

    setWebsites(sites)
  }

  const filteredWebsites = websites.filter(site => {
    const matchesSearch = site.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         site.domain.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRegion = selectedRegion === 'all' || site.region === selectedRegion
    return matchesSearch && matchesRegion
  })

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, selectedRegion])

  // Pagination
  const totalPages = Math.ceil(filteredWebsites.length / ITEMS_PER_PAGE)
  const paginatedWebsites = filteredWebsites.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const regions = ['all', ...Array.from(new Set(websites.map(s => s.region))).sort()]

  const getRegionColor = (region: string) => {
    const colors: Record<string, string> = {
      'Manhattan': '#3b82f6',
      'Brooklyn': '#10b981',
      'Queens': '#f59e0b',
      'Long Island': '#8b5cf6',
      'New Jersey': '#ec4899',
      'Florida': '#ef4444',
      'NYC Metro': '#6366f1',
      'National': '#64748b',
      'Other': '#14b8a6'
    }
    return colors[region] || '#000000'
  }

  // Count by region
  const regionCounts = websites.reduce((acc, site) => {
    acc[site.region] = (acc[site.region] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  // Unique locations count
  const uniqueLocations = new Set(websites.map(s => s.location)).size
  const activeRegions = Object.keys(regionCounts).length

  return (
    <>
      <main className="p-3 md:p-6">
        {/* Page Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#CC6222] mb-1">
            Website Network
          </h2>
          <p className="text-sm text-gray-500">Coverage across NYC, NJ, FL, and national reach</p>
        </div>

        {/* Stat Cards Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8">
          {/* Total Domains */}
          <div className="rounded-xl p-4 bg-[#CC6222] text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-full -translate-y-6 translate-x-6" />
            <p className="text-xs font-medium uppercase tracking-wider text-white/70 mb-1">Total Domains</p>
            <p className="text-3xl font-bold">{websites.length}</p>
            <p className="text-xs text-white/50 mt-1">All registered</p>
          </div>

          {/* Active Regions */}
          <div className="rounded-xl p-4 bg-[#34D399]/20 border border-[#34D399]/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-[#34D399]/10 rounded-full -translate-y-6 translate-x-6" />
            <p className="text-xs font-medium uppercase tracking-wider text-[#CC6222]/60 mb-1">Active Regions</p>
            <p className="text-3xl font-bold text-[#CC6222]">{activeRegions}</p>
            <p className="text-xs text-[#CC6222]/40 mt-1">Markets covered</p>
          </div>

          {/* Neighborhoods */}
          <div className="rounded-xl p-4 bg-blue-50 border border-blue-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-blue-100/50 rounded-full -translate-y-6 translate-x-6" />
            <p className="text-xs font-medium uppercase tracking-wider text-blue-500 mb-1">Neighborhoods</p>
            <p className="text-3xl font-bold text-blue-700">{uniqueLocations}</p>
            <p className="text-xs text-blue-400 mt-1">Unique locations</p>
          </div>

          {/* Filtered */}
          <div className="rounded-xl p-4 bg-green-50 border border-green-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-green-100/50 rounded-full -translate-y-6 translate-x-6" />
            <p className="text-xs font-medium uppercase tracking-wider text-green-600 mb-1">Showing</p>
            <p className="text-3xl font-bold text-green-700">{filteredWebsites.length}</p>
            <p className="text-xs text-green-400 mt-1">{selectedRegion === 'all' ? 'All domains' : selectedRegion}</p>
          </div>
        </div>

        {/* Region Filter Pills */}
        <div className="mb-6">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#CC6222]/50 mb-3">Filter by Region</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedRegion('all')}
              className={`px-3.5 py-2 rounded-full text-xs font-semibold transition-all ${
                selectedRegion === 'all'
                  ? 'bg-[#CC6222] text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All ({websites.length})
            </button>
            {Object.entries(regionCounts).sort((a, b) => b[1] - a[1]).map(([region, count]) => (
              <button
                key={region}
                onClick={() => setSelectedRegion(selectedRegion === region ? 'all' : region)}
                className={`px-3.5 py-2 rounded-full text-xs font-semibold transition-all inline-flex items-center gap-1.5 ${
                  selectedRegion === region
                    ? 'shadow-md ring-1 ring-offset-1'
                    : 'hover:shadow-sm'
                }`}
                style={{
                  backgroundColor: selectedRegion === region ? getRegionColor(region) : getRegionColor(region) + '18',
                  color: selectedRegion === region ? '#ffffff' : getRegionColor(region),
                  '--tw-ring-color': getRegionColor(region),
                } as React.CSSProperties}
              >
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{
                    backgroundColor: selectedRegion === region ? '#ffffff' : getRegionColor(region),
                  }}
                />
                {region} ({count})
              </button>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6 flex gap-3">
          <div className="relative flex-1">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search locations or domains..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm text-[#CC6222] bg-white focus:outline-none focus:ring-2 focus:ring-[#CC6222]/20 focus:border-[#CC6222]/30 transition"
            />
          </div>
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-[#CC6222] bg-white focus:outline-none focus:ring-2 focus:ring-[#CC6222]/20 focus:border-[#CC6222]/30 transition"
          >
            {regions.map(region => (
              <option key={region} value={region}>
                {region === 'all' ? 'All Regions' : region}
              </option>
            ))}
          </select>
        </div>

        {/* Map Section */}
        <div className="mb-8">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#CC6222]/50 mb-3 flex items-center gap-2">
            <span>MAP VIEW</span>
            <span className="text-xs font-normal text-gray-400">({filteredWebsites.length} pins)</span>
          </h3>
          <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
            <WebsitesMap websites={filteredWebsites} />
          </div>
        </div>

        {/* Domain Portfolio Section Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#CC6222]/50 flex items-center gap-2">
            <span>DOMAIN PORTFOLIO</span>
            <span className="text-xs font-normal bg-[#CC6222]/8 text-[#CC6222]/60 px-2 py-0.5 rounded-full">
              {filteredWebsites.length} domains
            </span>
          </h3>
          {totalPages > 1 && (
            <p className="text-xs text-gray-400">
              Page {currentPage} of {totalPages}
            </p>
          )}
        </div>

        {/* Website Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {paginatedWebsites.map((site) => (
            <a
              key={site.domain}
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white border border-gray-100 rounded-xl p-4 hover:border-[#CC6222]/20 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  {/* Region badge + location */}
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0 ring-2 ring-white shadow-sm"
                      style={{ backgroundColor: getRegionColor(site.region) }}
                    />
                    <h3 className="font-semibold text-[#CC6222] text-sm truncate">{site.location}</h3>
                  </div>
                  {/* Region tag */}
                  <span
                    className="inline-block px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-wide mb-2"
                    style={{
                      backgroundColor: getRegionColor(site.region) + '15',
                      color: getRegionColor(site.region),
                    }}
                  >
                    {site.region}
                  </span>
                  {/* Domain name in monospace */}
                  <p className="text-xs text-gray-400 font-mono truncate">{site.domain}</p>
                </div>
                <svg className="w-4 h-4 text-gray-300 group-hover:text-[#CC6222] flex-shrink-0 ml-2 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
            </a>
          ))}
        </div>

        {/* Empty State */}
        {filteredWebsites.length === 0 && (
          <div className="text-center py-16">
            <div className="text-4xl mb-3">
              <span role="img" aria-label="globe">&#127760;</span>
            </div>
            <h3 className="text-lg font-semibold text-[#CC6222] mb-1">No websites found</h3>
            <p className="text-sm text-gray-500">Try adjusting your search or region filter</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between border-t border-gray-100 pt-6 gap-3">
            <p className="text-xs text-gray-400">
              Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}
              {' '}-{' '}
              {Math.min(currentPage * ITEMS_PER_PAGE, filteredWebsites.length)}
              {' '}of {filteredWebsites.length} domains
            </p>
            <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1">
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="px-2.5 py-1.5 text-xs font-medium rounded-lg border border-gray-200 text-[#CC6222] hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition"
              >
                First
              </button>
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-200 text-[#CC6222] hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition"
              >
                Prev
              </button>
              {/* Page numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(page => {
                  if (totalPages <= 7) return true
                  if (page === 1 || page === totalPages) return true
                  if (Math.abs(page - currentPage) <= 1) return true
                  return false
                })
                .reduce<(number | string)[]>((acc, page, idx, arr) => {
                  if (idx > 0 && typeof arr[idx - 1] === 'number' && (page as number) - (arr[idx - 1] as number) > 1) {
                    acc.push('...')
                  }
                  acc.push(page)
                  return acc
                }, [])
                .map((item, idx) =>
                  typeof item === 'string' ? (
                    <span key={`ellipsis-${idx}`} className="px-1.5 text-xs text-gray-300">...</span>
                  ) : (
                    <button
                      key={item}
                      onClick={() => setCurrentPage(item)}
                      className={`w-8 h-8 text-xs font-medium rounded-lg transition ${
                        currentPage === item
                          ? 'bg-[#CC6222] text-white shadow-sm'
                          : 'border border-gray-200 text-[#CC6222] hover:bg-gray-50'
                      }`}
                    >
                      {item}
                    </button>
                  )
                )}
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-200 text-[#CC6222] hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition"
              >
                Next
              </button>
              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className="px-2.5 py-1.5 text-xs font-medium rounded-lg border border-gray-200 text-[#CC6222] hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition"
              >
                Last
              </button>
            </div>
          </div>
        )}
      </main>
    </>
  )
}
