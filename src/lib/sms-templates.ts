// ============================================
// SMS TEMPLATES — Short text versions of emails
// All messages end with opt-out info per TCPA
// ============================================

const STOP_TEXT = '\nReply STOP to opt out.'
const STOP_TEXT_ES = '\nResponde STOP para cancelar.'

// ============================================
// CLIENT SMS
// ============================================

export function smsBookingReceived(booking: any): string {
  const date = new Date(booking.start_time).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
  const time = new Date(booking.start_time).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  return `Florida Maid: We received your booking request for ${date} at ${time}. We'll confirm with your cleaner's details shortly. Questions? (954) 710-3636${STOP_TEXT}`
}

export function smsBookingConfirmation(booking: any): string {
  const date = new Date(booking.start_time).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
  const time = new Date(booking.start_time).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  const cleanerName = booking.cleaners?.name?.split(' ')[0] || 'Your cleaner'
  const isRecurring = !!booking.recurring_type
  const cancelPolicy = isRecurring ? '7 days notice required for changes.' : 'One-time services are non-cancellable.'
  return `Florida Maid: Confirmed — ${date} at ${time} with ${cleanerName}.\n\nPayment: Zelle (hi@thefloridamaid.com) or Apple Pay, collected 15 min before end. Time billed until cleaner leaves/payment is collected.\n\n${cancelPolicy}\n\nPortal: thefloridamaid.com/book${STOP_TEXT}`
}

export function smsReminder(booking: any, timeframe: string): string {
  const time = new Date(booking.start_time).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  const cleanerName = booking.cleaners?.name?.split(' ')[0] || 'Your cleaner'
  if (timeframe === 'in 2 hours') {
    return `Florida Maid: Reminder — ${cleanerName} arrives at ${time}. Almost time!${STOP_TEXT}`
  }
  return `Florida Maid: Reminder — cleaning ${timeframe} at ${time} with ${cleanerName}.${STOP_TEXT}`
}

export function smsCancellation(booking: any): string {
  const date = new Date(booking.start_time).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
  return `Florida Maid: Your ${date} cleaning has been cancelled. Rebook: thefloridamaid.com/book${STOP_TEXT}`
}

export function smsReschedule(booking: any): string {
  const newDate = new Date(booking.start_time).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
  const newTime = new Date(booking.start_time).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  return `Florida Maid: Your cleaning has been rescheduled to ${newDate} at ${newTime}. Details: thefloridamaid.com/book${STOP_TEXT}`
}

export function smsThankYou(clientName: string): string {
  const firstName = clientName?.split(' ')[0] || 'there'
  return `Florida Maid: Thanks ${firstName}! Enjoy 10% off your next booking. Book: thefloridamaid.com/book${STOP_TEXT}`
}

export function smsVerificationCode(code: string): string {
  return `Florida Maid: Your code is ${code}. Expires in 10 min.`
}

// ============================================
// CLIENT SMS (Spanish)
// ============================================

export function smsBookingConfirmationES(booking: any): string {
  const date = new Date(booking.start_time).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
  const time = new Date(booking.start_time).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  const cleanerName = booking.cleaners?.name?.split(' ')[0] || 'Tu limpiador/a'
  return `Florida Maid: Tu limpieza está confirmada para ${date} a las ${time} con ${cleanerName}. Detalles: thefloridamaid.com/book${STOP_TEXT_ES}`
}

export function smsReminderES(booking: any, timeframe: string): string {
  const time = new Date(booking.start_time).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  const cleanerName = booking.cleaners?.name?.split(' ')[0] || 'Tu limpiador/a'
  const tfMap: Record<string, string> = {
    'in 2 hours': 'en 2 horas',
    'tomorrow': 'mañana',
    'in 1 hour': 'en 1 hora',
  }
  const tfES = tfMap[timeframe] || timeframe
  if (timeframe === 'in 2 hours') {
    return `Florida Maid: Recordatorio — ${cleanerName} llega a las ${time}. ¡Ya casi!${STOP_TEXT_ES}`
  }
  return `Florida Maid: Recordatorio — limpieza ${tfES} a las ${time} con ${cleanerName}.${STOP_TEXT_ES}`
}

export function smsCancellationES(booking: any): string {
  const date = new Date(booking.start_time).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
  return `Florida Maid: Tu limpieza del ${date} ha sido cancelada. Reservar de nuevo: thefloridamaid.com/book${STOP_TEXT_ES}`
}

export function smsRescheduleES(booking: any): string {
  const newDate = new Date(booking.start_time).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
  const newTime = new Date(booking.start_time).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  return `Florida Maid: Tu limpieza ha sido reprogramada para ${newDate} a las ${newTime}. Detalles: thefloridamaid.com/book${STOP_TEXT_ES}`
}

export function smsThankYouES(clientName: string): string {
  const firstName = clientName?.split(' ')[0] || ''
  return `Florida Maid: ¡Gracias ${firstName}! Disfruta 10% de descuento en tu próxima reserva. Reservar: thefloridamaid.com/book${STOP_TEXT_ES}`
}

// ============================================
// CLEANER SMS (Bilingual EN/ES)
// ============================================

export function smsJobAssignment(booking: any): string {
  const date = new Date(booking.start_time).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
  const time = new Date(booking.start_time).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  const pin = booking.cleaners?.pin || ''
  return `Florida Maid: New job ${date} ${time} - ${booking.clients?.name || 'Client'}. Portal: thefloridamaid.com/team PIN: ${pin}\nNuevo trabajo ${date} ${time}. Portal: thefloridamaid.com/team PIN: ${pin}${STOP_TEXT}`
}

export function smsDailySummary(cleanerName: string, count: number, pin?: string, bookings?: any[]): string {
  const firstName = cleanerName.split(' ')[0]
  const pinText = pin ? ` PIN: ${pin}` : ''

  let jobLines = ''
  if (bookings && bookings.length > 0) {
    jobLines = '\n' + bookings.map(b => {
      const d = new Date(b.start_time)
      const date = d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
      const time = d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
      const client = b.clients?.name || 'Client'
      const addr = b.clients?.address || ''
      const phone = b.clients?.phone || ''
      return `\n${date} ${time}\n${client}${phone ? ' ' + phone : ''}${addr ? '\n' + addr : ''}`
    }).join('\n')
  }

  return `Florida Maid: Hi ${firstName}, ${count} job${count === 1 ? '' : 's'} next 3 days:${jobLines}\n\nPortal: thefloridamaid.com/team${pinText}${STOP_TEXT}`
}

export function smsJobCancelled(booking: any): string {
  const date = new Date(booking.start_time).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
  const pin = booking.cleaners?.pin || ''
  return `Florida Maid: Cancelled - ${date} job (${booking.clients?.name || 'Client'}). Portal: thefloridamaid.com/team PIN: ${pin}\nCancelado - trabajo del ${date}. Portal: thefloridamaid.com/team PIN: ${pin}${STOP_TEXT}`
}

export function smsJobRescheduled(booking: any): string {
  const newDate = new Date(booking.start_time).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
  const newTime = new Date(booking.start_time).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  const pin = booking.cleaners?.pin || ''
  return `Florida Maid: Rescheduled - ${booking.clients?.name || 'Client'} moved to ${newDate} ${newTime}. Portal: thefloridamaid.com/team PIN: ${pin}\nReprogramado al ${newDate} ${newTime}. Portal: thefloridamaid.com/team PIN: ${pin}${STOP_TEXT}`
}

export function smsUrgentBroadcast(booking: any): string {
  const date = new Date(booking.start_time).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
  const time = new Date(booking.start_time).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  const payRate = booking.cleaner_pay_rate || 40
  return `Florida Maid URGENT: $${payRate}/hr job available ${date} ${time}. Claim now: thefloridamaid.com/team\nURGENTE: Trabajo $${payRate}/hr ${date} ${time}. Reclamar: thefloridamaid.com/team${STOP_TEXT}`
}

// ============================================
// CLIENT PAYMENT SMS
// ============================================

export function smsPaymentDue(clientName: string, amount: string): string {
  const firstName = clientName?.split(' ')[0] || 'there'
  return `Florida Maid: Hi ${firstName}, your cleaning is wrapping up soon! Payment of $${amount} is due via Zelle (hi@thefloridamaid.com) or Apple Pay (2120292200). Our team can't leave until payment is processed — thank you!${STOP_TEXT}`
}

export function smsPaymentDueES(clientName: string, amount: string): string {
  const firstName = clientName?.split(' ')[0] || ''
  return `Florida Maid: Hola ${firstName}, tu limpieza está por terminar. El pago de $${amount} se puede hacer por Zelle (hi@thefloridamaid.com) o Apple Pay (2120292200). Nuestro equipo no puede irse hasta que se procese el pago — ¡gracias!${STOP_TEXT_ES}`
}

// ============================================
// ADMIN SMS
// ============================================

export function smsPaymentDueAdmin(clientName: string, cleanerName: string, amount: string): string {
  return `Florida Maid: 15 min left — ${clientName} with ${cleanerName}. Collect $${amount} via Zelle/Apple Pay`
}

export function smsNewClient(name: string): string {
  return `Florida Maid: New client — ${name} via collect form`
}

export function smsNewBooking(booking: any): string {
  const date = new Date(booking.start_time).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
  return `Florida Maid: New booking — ${booking.clients?.name || 'Unknown'} on ${date}`
}

export function smsNewApplication(name: string): string {
  return `Florida Maid: New cleaner application — ${name}`
}

export function smsNewReferrer(name: string, code: string): string {
  return `Florida Maid: New referrer — ${name} (${code})`
}
