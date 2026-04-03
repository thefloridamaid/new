export const SERVICE_ZONES = [
  { id: 'miami_dade', label: 'Miami-Dade County', labelES: 'Condado de Miami-Dade', car_required: true },
  { id: 'broward', label: 'Broward County', labelES: 'Condado de Broward', car_required: true },
  { id: 'palm_beach', label: 'Palm Beach County', labelES: 'Condado de Palm Beach', car_required: true },
  { id: 'tampa_bay', label: 'Tampa Bay Area', labelES: 'Área de Tampa Bay', car_required: true },
  { id: 'orlando', label: 'Orlando / Central Florida', labelES: 'Orlando / Florida Central', car_required: true },
  { id: 'jacksonville', label: 'Jacksonville / Northeast FL', labelES: 'Jacksonville / Noreste de FL', car_required: true },
  { id: 'southwest_fl', label: 'Southwest Florida (Naples / Fort Myers)', labelES: 'Suroeste de Florida (Naples / Fort Myers)', car_required: true },
  { id: 'space_coast', label: 'Space Coast / Brevard', labelES: 'Space Coast / Brevard', car_required: true },
  { id: 'florida_keys', label: 'Florida Keys', labelES: 'Cayos de Florida', car_required: true },
  { id: 'north_central', label: 'North Central Florida (Gainesville / Ocala)', labelES: 'Norte Central de Florida (Gainesville / Ocala)', car_required: true },
  { id: 'panhandle', label: 'Panhandle (Pensacola / Destin / Panama City)', labelES: 'Panhandle (Pensacola / Destin / Panama City)', car_required: true },
] as const

export type ServiceZoneId = typeof SERVICE_ZONES[number]['id']

// Given an address, guess the zone (used for smart suggestions)
export function guessZoneFromAddress(address: string): ServiceZoneId | null {
  const a = address.toLowerCase()

  // Florida Keys
  if (a.includes('key west') || a.includes('key largo') || a.includes('islamorada') || a.includes('marathon') || a.includes('big pine') || a.includes('florida keys') || /\b330[0-5]\d\b/.test(a)) return 'florida_keys'

  // Miami-Dade
  if (a.includes('miami') || a.includes('hialeah') || a.includes('homestead') || a.includes('coral gables') || a.includes('doral') || a.includes('kendall') || a.includes('aventura') || a.includes('north miami') || /\b331\d{2}\b/.test(a) || /\b330[6-9]\d\b/.test(a)) return 'miami_dade'

  // Broward
  if (a.includes('fort lauderdale') || a.includes('ft lauderdale') || a.includes('hollywood, fl') || a.includes('pembroke pines') || a.includes('miramar') || a.includes('coral springs') || a.includes('pompano') || a.includes('davie') || a.includes('plantation') || a.includes('sunrise') || a.includes('weston') || /\b333\d{2}\b/.test(a)) return 'broward'

  // Palm Beach
  if (a.includes('west palm') || a.includes('boca raton') || a.includes('boynton') || a.includes('delray') || a.includes('jupiter') || a.includes('palm beach') || a.includes('wellington') || a.includes('lake worth') || /\b334\d{2}\b/.test(a) || /\b3348\d\b/.test(a)) return 'palm_beach'

  // Tampa Bay
  if (a.includes('tampa') || a.includes('st petersburg') || a.includes('st. petersburg') || a.includes('clearwater') || a.includes('brandon') || a.includes('largo') || a.includes('sarasota') || a.includes('bradenton') || /\b336\d{2}\b/.test(a) || /\b337\d{2}\b/.test(a) || /\b342\d{2}\b/.test(a)) return 'tampa_bay'

  // Orlando
  if (a.includes('orlando') || a.includes('kissimmee') || a.includes('winter park') || a.includes('sanford') || a.includes('lake mary') || a.includes('altamonte') || a.includes('oviedo') || a.includes('daytona') || /\b328\d{2}\b/.test(a) || /\b327\d{2}\b/.test(a) || /\b321\d{2}\b/.test(a)) return 'orlando'

  // Jacksonville
  if (a.includes('jacksonville') || a.includes('st augustine') || a.includes('st. augustine') || a.includes('ponte vedra') || a.includes('orange park') || a.includes('fleming island') || /\b322\d{2}\b/.test(a) || /\b320\d{2}\b/.test(a)) return 'jacksonville'

  // Southwest FL
  if (a.includes('naples') || a.includes('fort myers') || a.includes('ft myers') || a.includes('cape coral') || a.includes('bonita springs') || a.includes('estero') || a.includes('marco island') || /\b339\d{2}\b/.test(a) || /\b341\d{2}\b/.test(a)) return 'southwest_fl'

  // Space Coast
  if (a.includes('melbourne') || a.includes('cocoa') || a.includes('titusville') || a.includes('palm bay') || a.includes('brevard') || a.includes('merritt island') || a.includes('viera') || /\b329\d{2}\b/.test(a)) return 'space_coast'

  // North Central
  if (a.includes('gainesville') || a.includes('ocala') || a.includes('alachua') || a.includes('lake city') || /\b326\d{2}\b/.test(a) || /\b344\d{2}\b/.test(a)) return 'north_central'

  // Panhandle
  if (a.includes('pensacola') || a.includes('destin') || a.includes('panama city') || a.includes('fort walton') || a.includes('tallahassee') || a.includes('crestview') || /\b325\d{2}\b/.test(a) || /\b324\d{2}\b/.test(a) || /\b323\d{2}\b/.test(a)) return 'panhandle'

  return null
}

// Check if a zone requires a car
export function zoneRequiresCar(zoneId: string): boolean {
  return SERVICE_ZONES.find(z => z.id === zoneId)?.car_required ?? false
}
