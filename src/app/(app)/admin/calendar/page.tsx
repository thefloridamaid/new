'use client'

import { useEffect, useState, useCallback } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import SidePanel from '@/components/SidePanel'

interface Client { id: string; name: string; phone: string; address: string }
interface Cleaner { id: string; name: string }
interface CleanerAvail { id: string; name: string; available: boolean; conflict?: string }
interface Booking {
  id: string
  start_time: string
  end_time: string
  service_type: string
  price: number
  status: string
  payment_status: string
  payment_method: string | null
  notes: string | null
  client_id: string
  cleaner_id: string
  clients: Client | null
  cleaners: Cleaner | null
  hourly_rate?: number
  recurring_type?: string | null
  schedule_id?: string | null
}

interface BookingEvent {
  id: string
  title: string
  start: string
  end: string
  backgroundColor: string
  borderColor?: string
  extendedProps: { booking: Booking | null; cleanerId?: string }
}

const CLEANER_COLORS = [
  '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6',
  '#ec4899', '#14b8a6', '#f97316'
]

export default function CalendarPage() {
  useEffect(() => { document.title = 'Calendar | The Florida Maid' }, [])
  const [bookings, setBookings] = useState<BookingEvent[]>([])
  const [allBookings, setAllBookings] = useState<Booking[]>([])
  const [cleaners, setCleaners] = useState<Cleaner[]>([])
  const [selectedCleaner, setSelectedCleaner] = useState<string>('')
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>(['pending', 'scheduled', 'in_progress', 'completed'])
  const [cleanerColors, setCleanerColors] = useState<Record<string, string>>({})
  const [dateRange, setDateRange] = useState<{ from: string; to: string } | null>(null)

  // SidePanel state
  const [panelBooking, setPanelBooking] = useState<Booking | null>(null)
  const [panelCleaners, setPanelCleaners] = useState<CleanerAvail[]>([])
  const [panelCleanerId, setPanelCleanerId] = useState<string>('')
  const [panelSaving, setPanelSaving] = useState(false)
  const [panelWarning, setPanelWarning] = useState<string>('')
  const [loadingCleanerAvail, setLoadingCleanerAvail] = useState(false)

  useEffect(() => { loadCleaners() }, [])

  // Load bookings when date range changes
  useEffect(() => {
    if (dateRange) loadBookings(dateRange.from, dateRange.to)
  }, [dateRange])

  useEffect(() => { filterBookings() }, [allBookings, selectedCleaner, selectedStatuses, cleanerColors])

  const loadBookings = async (from: string, to: string) => {
    const res = await fetch(`/api/bookings?from=${from}&to=${to}`)
    if (res.ok) setAllBookings(await res.json())
  }

  const loadCleaners = async () => {
    const res = await fetch('/api/cleaners')
    if (res.ok) {
      const data = await res.json()
      setCleaners(data)
      const colors: Record<string, string> = {}
      data.forEach((c: Cleaner, i: number) => { colors[c.id] = CLEANER_COLORS[i % CLEANER_COLORS.length] })
      setCleanerColors(colors)
    }
  }

  const filterBookings = useCallback(() => {
    let filtered = [...allBookings]
    if (selectedCleaner) filtered = filtered.filter(b => b.cleaner_id === selectedCleaner)
    if (selectedStatuses.length > 0) filtered = filtered.filter(b => selectedStatuses.includes(b.status))

    const events: BookingEvent[] = filtered.map((b: Booking) => {
      const prefix = b.status === 'pending' ? '\u23F3 ' : b.status === 'in_progress' ? '\u25B6\uFE0F ' : ''
      const bg = b.status === 'pending' ? '#dc2626' : cleanerColors[b.cleaner_id] || '#000000'
      const clientName = (b.clients?.name || 'Client').split(' ')[0]
      const [, timePart] = b.start_time.split('T')
      const [h, m] = (timePart || '00:00').split(':').map(Number)
      const ampm = h >= 12 ? 'p' : 'a'
      const hr = h % 12 || 12
      const timeStr = m > 0 ? `${hr}:${String(m).padStart(2, '0')}${ampm}` : `${hr}${ampm}`
      return {
        id: b.id,
        title: `${timeStr} ${prefix}${clientName}`,
        start: b.start_time,
        end: b.end_time,
        backgroundColor: bg,
        borderColor: bg,
        extendedProps: { booking: b, cleanerId: b.cleaner_id }
      }
    })
    setBookings(events)
  }, [allBookings, selectedCleaner, selectedStatuses, cleanerColors])

  const toggleStatus = (status: string) => {
    setSelectedStatuses(prev => prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status])
  }

  const toLocalISOString = (d: Date) => {
    const pad = (n: number) => String(n).padStart(2, '0')
    return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:00`
  }

  const formatNaiveTime = (timeStr: string) => {
    const [, t] = timeStr.split('T')
    const [h, m] = (t || '00:00').split(':').map(Number)
    const ampm = h >= 12 ? 'PM' : 'AM'
    const hr = h % 12 || 12
    return m > 0 ? `${hr}:${String(m).padStart(2, '0')} ${ampm}` : `${hr} ${ampm}`
  }

  const formatNaiveDate = (timeStr: string) => {
    const [datePart] = timeStr.split('T')
    const [y, mo, d] = datePart.split('-').map(Number)
    return new Date(y, mo - 1, d).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
  }

  // FullCalendar datesSet — fires when visible range changes
  const handleDatesSet = (info: { startStr: string; endStr: string }) => {
    const from = info.startStr.split('T')[0]
    const to = info.endStr.split('T')[0]
    setDateRange({ from, to })
  }

  // === SidePanel: open on event click ===
  const openPanel = async (booking: Booking) => {
    setPanelBooking(booking)
    setPanelCleanerId(booking.cleaner_id || '')
    setPanelWarning('')
    setPanelSaving(false)

    // Fetch cleaner availability for this booking's slot
    const date = booking.start_time.split('T')[0]
    const [, t] = booking.start_time.split('T')
    const startTime = (t || '09:00').slice(0, 5)
    const [sh, sm] = startTime.split(':').map(Number)
    const [, et] = booking.end_time.split('T')
    const [eh, em] = (et || '11:00').split(':').map(Number)
    const duration = Math.round(((eh * 60 + em) - (sh * 60 + sm)) / 60) || 2

    setLoadingCleanerAvail(true)
    try {
      const res = await fetch(`/api/admin/cleaner-availability?date=${date}&start_time=${startTime}&duration=${duration}&exclude_booking=${booking.id}`)
      if (res.ok) {
        const data = await res.json()
        setPanelCleaners(data.cleaners || [])
      }
    } catch { /* fallback: show all cleaners without availability info */ }
    setLoadingCleanerAvail(false)
  }

  const closePanel = () => {
    setPanelBooking(null)
    setPanelCleaners([])
    setPanelWarning('')
  }

  // Check for conflicts after save
  const checkPostSaveConflicts = (bookingId: string, cleanerId: string, startTime: string, endTime: string) => {
    const date = startTime.split('T')[0]
    const [, st] = startTime.split('T')
    const [sh, sm] = (st || '00:00').split(':').map(Number)
    const startMin = sh * 60 + sm
    const [, et] = endTime.split('T')
    const [eh, em] = (et || '00:00').split(':').map(Number)
    const endMin = eh * 60 + em

    const overlaps = allBookings.filter(b => {
      if (b.id === bookingId) return false
      if (b.cleaner_id !== cleanerId) return false
      if (b.status === 'cancelled') return false
      if (!b.start_time.startsWith(date)) return false
      const [, bst] = b.start_time.split('T')
      const [bsh, bsm] = (bst || '00:00').split(':').map(Number)
      const bStart = bsh * 60 + bsm
      const [, bet] = b.end_time.split('T')
      const [beh, bem] = (bet || '00:00').split(':').map(Number)
      const bEnd = beh * 60 + bem
      return startMin < bEnd && endMin > bStart
    })

    if (overlaps.length > 0) {
      const names = overlaps.map(b => b.clients?.name || 'another client').join(', ')
      const cleanerName = cleaners.find(c => c.id === cleanerId)?.name || 'This cleaner'
      return `${cleanerName} has overlapping bookings on this date: ${names}`
    }
    return ''
  }

  // Confirm booking (pending -> scheduled) with cleaner assignment
  const handleConfirm = async () => {
    if (!panelBooking) return
    setPanelSaving(true)
    setPanelWarning('')

    const updates: Record<string, unknown> = { status: 'scheduled' }
    if (panelCleanerId) updates.cleaner_id = panelCleanerId

    const res = await fetch(`/api/bookings/${panelBooking.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    })

    if (res.ok) {
      const warning = panelCleanerId ? checkPostSaveConflicts(panelBooking.id, panelCleanerId, panelBooking.start_time, panelBooking.end_time) : ''
      if (warning) setPanelWarning(warning)
      else closePanel()
      if (dateRange) loadBookings(dateRange.from, dateRange.to)
    } else if (res.status === 409) {
      const data = await res.json()
      setPanelWarning(data.error || 'Cleaner is unavailable on this date')
    } else {
      setPanelWarning('Failed to confirm booking')
    }
    setPanelSaving(false)
  }

  // Quick-assign cleaner (for already scheduled bookings)
  const handleAssignCleaner = async () => {
    if (!panelBooking || !panelCleanerId) return
    setPanelSaving(true)
    setPanelWarning('')

    const res = await fetch(`/api/bookings/${panelBooking.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cleaner_id: panelCleanerId })
    })

    if (res.ok) {
      const warning = checkPostSaveConflicts(panelBooking.id, panelCleanerId, panelBooking.start_time, panelBooking.end_time)
      if (warning) setPanelWarning(warning)
      else closePanel()
      if (dateRange) loadBookings(dateRange.from, dateRange.to)
    } else if (res.status === 409) {
      const data = await res.json()
      setPanelWarning(data.error || 'Cleaner is unavailable on this date')
    } else {
      setPanelWarning('Failed to assign cleaner')
    }
    setPanelSaving(false)
  }

  // Decline booking
  const handleDecline = async () => {
    if (!panelBooking || !confirm('Cancel this booking? Client and cleaner will be notified.')) return
    setPanelSaving(true)
    await fetch(`/api/bookings/${panelBooking.id}`, { method: 'DELETE' })
    closePanel()
    if (dateRange) loadBookings(dateRange.from, dateRange.to)
    setPanelSaving(false)
  }

  // Event click -> open panel instead of navigating away
  const handleEventClick = (info: { event: { id: string } }) => {
    const booking = allBookings.find(b => b.id === info.event.id)
    if (booking) openPanel(booking)
  }

  // Select empty slot -> create booking
  const handleSelect = (info: { start: Date }) => {
    const date = info.start
    const pad = (n: number) => String(n).padStart(2, '0')
    const dateStr = `${date.getFullYear()}-${pad(date.getMonth()+1)}-${pad(date.getDate())}`
    const timeStr = pad(date.getHours()) + ':' + pad(date.getMinutes())
    window.location.href = `/admin/bookings?date=${dateStr}&time=${timeStr}`
  }

  // Drag/drop — slim payload, only send time changes
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEventDrop = async (info: any) => {
    const booking = info.event.extendedProps.booking
    const newStart = toLocalISOString(info.event.start)
    const newEnd = toLocalISOString(info.event.end)
    const clientName = booking.clients?.name || 'this client'
    const newDateLabel = info.event.start.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })
    if (!confirm(`Move ${clientName} to ${newDateLabel}?`)) {
      info.revert()
      return
    }
    const res = await fetch(`/api/bookings/${booking.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ start_time: newStart, end_time: newEnd })
    })
    if (res.ok) {
      if (dateRange) loadBookings(dateRange.from, dateRange.to)
    } else {
      info.revert()
    }
  }

  // Resize — slim payload, only send time + price update
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEventResize = async (info: any) => {
    const booking = info.event.extendedProps.booking
    const newStart = toLocalISOString(info.event.start)
    const newEnd = toLocalISOString(info.event.end)
    const hours = Math.round((info.event.end.getTime() - info.event.start.getTime()) / (1000 * 60 * 60))
    const clientName = booking.clients?.name || 'this client'
    if (!confirm(`Resize ${clientName} to ${hours} hours?`)) {
      info.revert()
      return
    }
    const hourlyRate = booking.hourly_rate || 75
    const res = await fetch(`/api/bookings/${booking.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ start_time: newStart, end_time: newEnd, price: hours * hourlyRate * 100 })
    })
    if (res.ok) {
      if (dateRange) loadBookings(dateRange.from, dateRange.to)
    } else {
      info.revert()
    }
  }

  return (
    <main className="p-3 md:p-6">
      {/* Filters */}
      <div className="mb-2 flex flex-col md:flex-row flex-wrap gap-4 items-start md:items-center bg-gray-50 px-3 py-2 rounded-lg overflow-x-hidden">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Team Member</label>
          <select value={selectedCleaner} onChange={(e) => setSelectedCleaner(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg text-[#1E2A4A] text-sm">
            <option value="">All Team</option>
            {cleaners.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Status</label>
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            {[
              { key: 'pending', label: 'Pending', cls: 'text-red-700 font-medium', accent: 'accent-red-600' },
              { key: 'scheduled', label: 'Scheduled', cls: 'text-gray-700', accent: '' },
              { key: 'in_progress', label: 'In Progress', cls: 'text-[#1E2A4A]/70 font-medium', accent: 'accent-[#1E2A4A]' },
              { key: 'completed', label: 'Completed', cls: 'text-gray-700', accent: '' },
              { key: 'cancelled', label: 'Cancelled', cls: 'text-gray-700', accent: '' },
            ].map(s => (
              <label key={s.key} className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={selectedStatuses.includes(s.key)} onChange={() => toggleStatus(s.key)} className={`w-4 h-4 ${s.accent}`} />
                <span className={`text-sm ${s.cls}`}>{s.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="w-full md:w-auto md:ml-auto">
          <label className="block text-xs font-medium text-gray-600 mb-1">Team Colors</label>
          <div className="flex gap-2 flex-wrap">
            {cleaners.map(c => (
              <div key={c.id} className="flex items-center gap-1">
                <div className="w-3 h-3 rounded" style={{ backgroundColor: cleanerColors[c.id] }} />
                <span className="text-xs text-gray-600">{c.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop Calendar */}
      <div className="hidden md:block">
        <style>{`
          .fc .fc-icon-chevron-left::before { content: '\\2039' !important; }
          .fc .fc-icon-chevron-right::before { content: '\\203A' !important; }
          .fc-daygrid-day-number { font-size: 12px !important; font-weight: 600 !important; padding: 2px 4px !important; color: #666 !important; }
          .fc-daygrid-day-events { display: grid !important; grid-template-columns: 1fr 1fr !important; gap: 1px !important; padding: 0 2px !important; }
          .fc-daygrid-event-harness { margin-top: 0 !important; margin-bottom: 0 !important; min-width: 0 !important; }
          .fc-daygrid-event { font-size: 9px !important; line-height: 1.2 !important; padding: 1px 2px !important; border-radius: 3px !important; overflow: hidden !important; margin: 0 !important; }
          .fc-daygrid-event .fc-event-main { padding: 0 !important; overflow: hidden !important; white-space: nowrap !important; text-overflow: ellipsis !important; }
          .fc-daygrid-event .fc-event-title { font-size: 9px !important; font-weight: 500 !important; }
          .fc-daygrid-event .fc-event-time { display: none !important; }
          .fc-daygrid-more-link { font-size: 9px !important; grid-column: 1 / -1 !important; }
        `}</style>
        <div className="border border-gray-200 rounded-lg p-2 bg-white">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{ left: 'prev,next today', center: 'title', right: 'dayGridMonth,timeGridWeek,timeGridDay' }}
            events={bookings}
            datesSet={handleDatesSet}
            eventClick={handleEventClick}
            select={handleSelect}
            eventDrop={handleEventDrop}
            eventResize={handleEventResize}
            editable={true}
            selectable={true}
            selectMirror={true}
            slotMinTime="06:00:00"
            slotMaxTime="22:00:00"
            height="calc(100vh - 140px)"
            eventDisplay="block"
            eventTimeFormat={{ hour: 'numeric', minute: '2-digit', meridiem: 'short' }}
            dayMaxEvents={6}
            snapDuration="00:30:00"
            slotDuration="00:30:00"
            firstDay={1}
            fixedWeekCount={false}
            showNonCurrentDates={false}
            eventOrder="title"
          />
        </div>

        <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
          <span>Click to view/edit — Drag to move</span>
          <span className="ml-auto">
            {allBookings.filter(b => b.status === 'pending').length > 0 && (
              <><span className="text-red-600 font-medium">{allBookings.filter(b => b.status === 'pending').length}</span> pending<span className="mx-2">•</span></>
            )}
            <span className="text-[#1E2A4A] font-medium">{allBookings.filter(b => b.status === 'scheduled').length}</span> scheduled
            <span className="mx-2">•</span>
            <span className="font-medium">{allBookings.length}</span> total
          </span>
        </div>
      </div>

      {/* Mobile List View */}
      <div className="md:hidden">
        {(() => {
          let filtered = [...allBookings]
          if (selectedCleaner) filtered = filtered.filter(b => b.cleaner_id === selectedCleaner)
          if (selectedStatuses.length > 0) filtered = filtered.filter(b => selectedStatuses.includes(b.status))
          filtered.sort((a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime())
          const todayStr = new Date().toISOString().split('T')[0]
          filtered = filtered.filter(b => b.start_time.split('T')[0] >= todayStr)

          const grouped: Record<string, Booking[]> = {}
          for (const b of filtered) {
            const dateKey = b.start_time.split('T')[0]
            if (!grouped[dateKey]) grouped[dateKey] = []
            grouped[dateKey].push(b)
          }

          const dateKeys = Object.keys(grouped).sort()
          if (dateKeys.length === 0) return <p className="text-center text-gray-500 py-8">No upcoming appointments</p>

          return dateKeys.map(dateKey => {
            const dayDate = new Date(dateKey + 'T12:00:00')
            const isToday = dateKey === todayStr
            const label = isToday ? 'Today' : dayDate.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })
            return (
              <div key={dateKey} className="mb-4">
                <h3 className={`text-xs font-semibold uppercase tracking-wide mb-1.5 px-1 ${isToday ? 'text-[#1E2A4A]' : 'text-gray-400'}`}>{label}</h3>
                <div className="space-y-1.5">
                  {grouped[dateKey].map(b => {
                    const color = b.status === 'pending' ? '#dc2626' : cleanerColors[b.cleaner_id] || '#000'
                    const [, st] = b.start_time.split('T'); const [sh, sm] = (st || '00:00').split(':').map(Number)
                    const [, et] = b.end_time.split('T'); const [eh, em] = (et || '00:00').split(':').map(Number)
                    const time = new Date(2000, 0, 1, sh, sm).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
                    const endTime = new Date(2000, 0, 1, eh, em).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
                    return (
                      <button key={b.id} onClick={() => openPanel(b)} className="w-full flex items-center gap-3 bg-white rounded-lg p-3 border border-gray-100 active:bg-gray-50 text-left">
                        <div className="w-1 self-stretch rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm text-[#1E2A4A] truncate">
                            {b.status === 'pending' && '\u23F3 '}{b.status === 'in_progress' && '\u25B6\uFE0F '}{b.clients?.name || 'Client'}
                          </p>
                          <p className="text-xs text-gray-500 truncate">{b.service_type} — {b.cleaners?.name || 'Unassigned'}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-sm font-medium text-[#1E2A4A]">{time}</p>
                          <p className="text-xs text-gray-400">{endTime}</p>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          })
        })()}
      </div>

      {/* === Booking Detail SidePanel === */}
      <SidePanel open={!!panelBooking} onClose={closePanel} title={panelBooking?.clients?.name || 'Booking'} width="max-w-md">
        {panelBooking && (
          <div className="space-y-5">
            {/* Warning banner */}
            {panelWarning && (
              <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-3 text-sm text-yellow-800">
                {panelWarning}
                <button onClick={() => setPanelWarning('')} className="ml-2 text-yellow-600 underline">Dismiss</button>
              </div>
            )}

            {/* Status badge */}
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                panelBooking.status === 'pending' ? 'bg-red-100 text-red-700' :
                panelBooking.status === 'scheduled' ? 'bg-green-100 text-green-700' :
                panelBooking.status === 'in_progress' ? 'bg-blue-100 text-blue-700' :
                panelBooking.status === 'completed' ? 'bg-gray-100 text-gray-700' :
                'bg-gray-100 text-gray-500'
              }`}>{panelBooking.status.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase())}</span>
              {panelBooking.recurring_type && (
                <span className="px-2 py-1 bg-purple-50 text-purple-600 rounded-full text-xs font-medium">{panelBooking.recurring_type}</span>
              )}
            </div>

            {/* Client info */}
            <div className="space-y-1">
              <p className="font-semibold text-[#1E2A4A] text-lg">{panelBooking.clients?.name || 'Unknown Client'}</p>
              {panelBooking.clients?.phone && (
                <a href={`tel:${panelBooking.clients.phone}`} className="text-sm text-blue-600 hover:underline block">{panelBooking.clients.phone}</a>
              )}
              {panelBooking.clients?.address && (
                <p className="text-sm text-gray-600">{panelBooking.clients.address}</p>
              )}
            </div>

            {/* Booking details */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Date</span>
                <span className="text-[#1E2A4A] font-medium">{formatNaiveDate(panelBooking.start_time)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Time</span>
                <span className="text-[#1E2A4A] font-medium">{formatNaiveTime(panelBooking.start_time)} - {formatNaiveTime(panelBooking.end_time)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Service</span>
                <span className="text-[#1E2A4A] font-medium">{panelBooking.service_type}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Price</span>
                <span className="text-[#1E2A4A] font-medium">${(panelBooking.price / 100).toFixed(0)}</span>
              </div>
              {panelBooking.notes && (
                <div className="pt-2 border-t border-gray-200">
                  <p className="text-xs text-gray-500">Notes</p>
                  <p className="text-sm text-[#1E2A4A]">{panelBooking.notes}</p>
                </div>
              )}
            </div>

            {/* Cleaner assignment */}
            <div>
              <label className="block text-sm font-medium text-[#1E2A4A] mb-2">
                {panelBooking.status === 'pending' ? 'Assign Cleaner' : 'Cleaner'}
              </label>
              {loadingCleanerAvail ? (
                <p className="text-sm text-gray-400">Checking availability...</p>
              ) : (
                <div className="space-y-1.5">
                  {(panelCleaners.length > 0 ? panelCleaners : cleaners.map(c => ({ id: c.id, name: c.name, available: true, conflict: undefined as string | undefined }))).map(c => {
                    const isOff = !c.available && (c.conflict === 'Not scheduled to work' || c.conflict?.includes('off') || c.conflict?.includes('unavailable'))
                    return (
                      <button
                        key={c.id}
                        onClick={() => !isOff && setPanelCleanerId(c.id)}
                        disabled={isOff}
                        className={`w-full flex items-center justify-between p-3 rounded-lg border text-left text-sm transition-colors ${
                          isOff
                            ? 'border-red-200 bg-red-50 opacity-70 cursor-not-allowed'
                            : panelCleanerId === c.id
                              ? 'border-[#1E2A4A] bg-[#1E2A4A]/5'
                              : c.available
                                ? 'border-gray-200 hover:bg-gray-50'
                                : 'border-yellow-200 bg-yellow-50'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cleanerColors[c.id] || '#666' }} />
                          <span className={`font-medium ${isOff ? 'text-red-400' : panelCleanerId === c.id ? 'text-[#1E2A4A]' : 'text-gray-700'}`}>{c.name}</span>
                        </div>
                        {isOff && (
                          <span className="text-xs text-red-600 font-medium">OFF — Cannot assign</span>
                        )}
                        {!c.available && !isOff && c.conflict && (
                          <span className="text-xs text-yellow-600">{c.conflict}</span>
                        )}
                        {c.available && (
                          <span className="text-xs text-green-600">Available</span>
                        )}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Action buttons */}
            <div className="space-y-2 pt-2">
              {panelBooking.status === 'pending' && (
                <>
                  <button
                    onClick={handleConfirm}
                    disabled={panelSaving || !panelCleanerId}
                    className="w-full py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:opacity-50"
                  >
                    {panelSaving ? 'Confirming...' : 'Confirm Booking'}
                  </button>
                  <button
                    onClick={handleDecline}
                    disabled={panelSaving}
                    className="w-full py-2.5 border border-red-300 text-red-600 rounded-lg font-medium hover:bg-red-50"
                  >
                    Decline
                  </button>
                </>
              )}

              {panelBooking.status !== 'pending' && panelCleanerId !== panelBooking.cleaner_id && panelCleanerId && (
                <button
                  onClick={handleAssignCleaner}
                  disabled={panelSaving}
                  className="w-full py-3 bg-[#1E2A4A] text-white rounded-lg font-medium hover:bg-[#1E2A4A]/90 disabled:opacity-50"
                >
                  {panelSaving ? 'Saving...' : 'Reassign Cleaner'}
                </button>
              )}

              <a
                href={`/admin/bookings?edit=${panelBooking.id}`}
                className="w-full py-2.5 border border-gray-300 text-[#1E2A4A] rounded-lg font-medium text-center block hover:bg-gray-50"
              >
                Full Edit
              </a>
            </div>
          </div>
        )}
      </SidePanel>
    </main>
  )
}
