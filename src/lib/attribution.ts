// Zip code → Neighborhood → Domains mapping for attribution
// Note: Each zip maps to ONE primary neighborhood (no duplicates)

export const ZIP_TO_NEIGHBORHOOD: Record<string, string> = {
  // === Miami-Dade County ===
  // South Beach / Miami Beach
  '33139': 'South Beach',
  '33140': 'Miami Beach',
  '33141': 'Miami Beach',
  '33154': 'Surfside',
  '33160': 'Sunny Isles Beach',
  '33109': 'Fisher Island',

  // Downtown Miami / Urban Core
  '33131': 'Brickell',
  '33129': 'Brickell',
  '33130': 'Downtown Miami',
  '33128': 'Downtown Miami',
  '33132': 'Edgewater',
  '33137': 'Wynwood',
  '33127': 'Design District',
  '33136': 'Overtown',
  '33135': 'Little Havana',
  '33145': 'Little Havana',
  '33125': 'Allapattah',
  '33142': 'Liberty City',
  '33138': 'Upper East Side',
  '33150': 'Little Haiti',

  // Coral Gables / South Miami
  '33134': 'Coral Gables',
  '33143': 'Coral Gables',
  '33146': 'Coral Gables',
  '33133': 'Coconut Grove',
  '33149': 'Key Biscayne',
  '33156': 'Pinecrest',
  '33158': 'Pinecrest',
  '33155': 'South Miami',

  // West Miami-Dade
  '33122': 'Doral',
  '33166': 'Doral',
  '33172': 'Doral',
  '33178': 'Doral',
  '33176': 'Kendall',
  '33183': 'Kendall',
  '33186': 'Kendall',
  '33196': 'The Hammocks',
  '33030': 'Homestead',
  '33031': 'Homestead',
  '33032': 'Homestead',
  '33033': 'Homestead',
  '33035': 'Homestead',
  '33034': 'Florida City',
  '33180': 'Aventura',
  '33010': 'Hialeah',
  '33012': 'Hialeah',
  '33013': 'Hialeah',
  '33014': 'Hialeah',
  '33015': 'Miami Lakes',
  '33016': 'Hialeah Gardens',
  '33018': 'Hialeah Gardens',
  '33161': 'North Miami',
  '33162': 'North Miami',
  '33168': 'Miami Shores',
  '33181': 'North Miami',
  '33169': 'North Miami Beach',
  '33179': 'North Miami Beach',
  '33054': 'Opa-locka',
  '33055': 'Miami Gardens',
  '33056': 'Miami Gardens',
  '33174': 'Sweetwater',
  '33184': 'Sweetwater',
  '33144': 'West Miami',
  '33165': 'Westchester',
  '33175': 'Tamiami',
  '33173': 'Sunset',
  '33185': 'Three Lakes',
  '33190': 'Cutler Bay',
  '33189': 'Cutler Bay',
  '33157': 'Palmetto Bay',
  '33170': 'Palmetto Bay',
  '33177': 'South Miami Heights',
  '33147': 'Liberty City',
  '33126': 'Fountainebleau',
  '33199': 'University Park',

  // === Broward County ===
  // Fort Lauderdale
  '33301': 'Fort Lauderdale',
  '33304': 'Fort Lauderdale Beach',
  '33305': 'Wilton Manors',
  '33306': 'Oakland Park',
  '33308': 'Lauderdale-by-the-Sea',
  '33309': 'Fort Lauderdale',
  '33310': 'Fort Lauderdale',
  '33311': 'Fort Lauderdale',
  '33312': 'Fort Lauderdale',
  '33313': 'Plantation',
  '33314': 'Davie',
  '33315': 'Fort Lauderdale',
  '33316': 'Las Olas Isles',
  '33334': 'Wilton Manors',

  // Hollywood / Southern Broward
  '33019': 'Hollywood',
  '33020': 'Hollywood',
  '33021': 'Hollywood',
  '33022': 'Hollywood',
  '33023': 'Hollywood',
  '33009': 'Hallandale Beach',
  '33004': 'Dania Beach',

  // Western Broward
  '33024': 'Pembroke Pines',
  '33025': 'Pembroke Pines',
  '33026': 'Pembroke Pines',
  '33027': 'Pembroke Pines',
  '33028': 'Pembroke Pines',
  '33029': 'Pembroke Pines',
  '33326': 'Weston',
  '33327': 'Weston',
  '33331': 'Weston',
  '33332': 'Weston',
  '33330': 'Southwest Ranches',
  '33317': 'Davie',
  '33324': 'Plantation',
  '33325': 'Plantation',
  '33328': 'Davie',
  '33322': 'Sunrise',
  '33321': 'Sunrise',
  '33323': 'Sunrise',

  // Northern Broward
  '33060': 'Pompano Beach',
  '33062': 'Pompano Beach',
  '33063': 'Margate',
  '33064': 'Lighthouse Point',
  '33069': 'Pompano Beach',
  '33073': 'Coconut Creek',
  '33065': 'Coral Springs',
  '33067': 'Coral Springs',
  '33071': 'Coral Springs',
  '33076': 'Parkland',
  '33441': 'Deerfield Beach',
  '33442': 'Deerfield Beach',
  '33443': 'Deerfield Beach',
  '33066': 'Coconut Creek',
  '33319': 'Lauderhill',
  '33351': 'Tamarac',
  '33068': 'North Lauderdale',
  '33388': 'Plantation',

  // === Palm Beach County ===
  // Coastal
  '33401': 'West Palm Beach',
  '33403': 'West Palm Beach',
  '33404': 'Singer Island',
  '33405': 'West Palm Beach',
  '33406': 'West Palm Beach',
  '33407': 'West Palm Beach',
  '33409': 'West Palm Beach',
  '33410': 'Palm Beach Gardens',
  '33411': 'Royal Palm Beach',
  '33412': 'Palm Beach Gardens',
  '33413': 'Greenacres',
  '33414': 'Wellington',
  '33415': 'West Palm Beach',
  '33417': 'Haverhill',
  '33480': 'Palm Beach',
  '33431': 'Boca Raton',
  '33432': 'Boca Raton',
  '33433': 'Boca Raton',
  '33434': 'Boca Raton',
  '33486': 'Boca Raton',
  '33487': 'Highland Beach',
  '33496': 'Boca Raton',
  '33498': 'Boca Raton',
  '33428': 'Boca Raton',
  '33444': 'Delray Beach',
  '33445': 'Delray Beach',
  '33446': 'Delray Beach',
  '33483': 'Gulf Stream',
  '33484': 'Delray Beach',
  '33435': 'Boynton Beach',
  '33436': 'Boynton Beach',
  '33437': 'Boynton Beach',
  '33460': 'Lake Worth Beach',
  '33461': 'Palm Springs',
  '33462': 'Lantana',
  '33463': 'Lake Worth Beach',
  '33408': 'Juno Beach',
  '33418': 'Palm Beach Gardens',

  // Northern Palm Beach
  '33458': 'Jupiter',
  '33468': 'Jupiter',
  '33469': 'Tequesta',
  '33477': 'Jupiter',
  '33478': 'Jupiter Farms',
  '33449': 'Wellington',
  '33470': 'The Acreage',
  '33455': 'Hobe Sound',

  // Western / Glades
  '33430': 'Belle Glade',
  '33476': 'Pahokee',
  '33493': 'South Bay',

  // === Tampa Bay ===
  // Tampa Proper
  '33606': 'South Tampa',
  '33609': 'South Tampa',
  '33611': 'South Tampa',
  '33616': 'South Tampa',
  '33629': 'South Tampa',
  '33602': 'Downtown Tampa',
  '33605': 'Ybor City',
  '33603': 'Seminole Heights',
  '33604': 'Seminole Heights',
  '33626': 'Westchase',
  '33618': 'Carrollwood',
  '33624': 'Carrollwood',
  '33625': 'Citrus Park',
  '33637': 'New Tampa',
  '33647': 'New Tampa',
  '33617': 'Temple Terrace',
  '33610': 'East Tampa',
  '33607': 'Westshore',
  '33614': 'Westshore',
  '33615': 'Town N Country',
  '33634': 'Town N Country',
  '33635': 'Town N Country',
  '33548': 'Lutz',
  '33549': 'Lutz',
  '33558': 'Lutz',
  '33559': 'Lutz',
  '34637': 'Land O Lakes',
  '34638': 'Land O Lakes',
  '34639': 'Land O Lakes',

  // Hillsborough East
  '33510': 'Brandon',
  '33511': 'Brandon',
  '33527': 'Brandon',
  '33594': 'Valrico',
  '33578': 'Riverview',
  '33579': 'Riverview',
  '33569': 'Riverview',
  '33596': 'Valrico',
  '33547': 'Lithia',
  '33563': 'Plant City',
  '33564': 'Plant City',
  '33565': 'Plant City',
  '33543': 'Wesley Chapel',
  '33544': 'Wesley Chapel',
  '33545': 'Wesley Chapel',

  // Pinellas / St. Pete / Clearwater
  '33701': 'St. Petersburg',
  '33702': 'St. Petersburg',
  '33703': 'St. Petersburg',
  '33704': 'St. Petersburg',
  '33705': 'St. Petersburg',
  '33707': 'Gulfport',
  '33710': 'St. Petersburg',
  '33711': 'St. Petersburg',
  '33712': 'St. Petersburg',
  '33713': 'St. Petersburg',
  '33714': 'St. Petersburg',
  '33715': 'Tierra Verde',
  '33706': 'St. Pete Beach',
  '33708': 'Madeira Beach',
  '33755': 'Clearwater',
  '33756': 'Clearwater',
  '33759': 'Clearwater',
  '33760': 'Clearwater',
  '33761': 'Clearwater',
  '33763': 'Clearwater',
  '33764': 'Clearwater',
  '33765': 'Clearwater',
  '33767': 'Clearwater Beach',
  '33770': 'Largo',
  '33771': 'Largo',
  '33773': 'Largo',
  '33774': 'Largo',
  '33778': 'Largo',
  '33772': 'Seminole',
  '33776': 'Seminole',
  '33777': 'Seminole',
  '34698': 'Dunedin',
  '34695': 'Safety Harbor',
  '34688': 'Tarpon Springs',
  '34689': 'Tarpon Springs',
  '34683': 'Palm Harbor',
  '34684': 'Palm Harbor',
  '34685': 'Palm Harbor',
  '34677': 'Oldsmar',
  '33781': 'Pinellas Park',
  '33782': 'Pinellas Park',
  '34655': 'Trinity',
  '34690': 'Holiday',
  '34691': 'Holiday',
  '33785': 'Indian Rocks Beach',
  '33786': 'Belleair Beach',
  '33709': 'Kenneth City',
  '33744': 'Bay Pines',

  // Pasco County
  '33539': 'Zephyrhills',
  '33540': 'Zephyrhills',
  '33541': 'Zephyrhills',
  '33542': 'Zephyrhills',
  '33523': 'Dade City',
  '33524': 'Dade City',
  '33525': 'Dade City',
  '34652': 'New Port Richey',
  '34653': 'New Port Richey',
  '34654': 'New Port Richey',
  '34668': 'Port Richey',
  '34673': 'Port Richey',
  '34667': 'Hudson',
  '34669': 'Hudson',

  // South Hillsborough
  '33573': 'Sun City Center',
  '33570': 'Ruskin',
  '33572': 'Apollo Beach',
  '33534': 'Gibsonton',

  // === Orlando / Central Florida ===
  // Orlando Core
  '32801': 'Downtown Orlando',
  '32802': 'Downtown Orlando',
  '32803': 'Mills 50',
  '32804': 'College Park',
  '32806': 'SoDo',
  '32814': 'Baldwin Park',

  // Winter Park / Nearby
  '32789': 'Winter Park',
  '32792': 'Winter Park',
  '32751': 'Maitland',
  '32701': 'Altamonte Springs',
  '32714': 'Altamonte Springs',
  '32707': 'Casselberry',
  '32730': 'Casselberry',
  '32765': 'Oviedo',
  '32766': 'Oviedo',
  '32708': 'Winter Springs',
  '32750': 'Longwood',
  '32779': 'Longwood',

  // Sanford / Lake Mary
  '32771': 'Sanford',
  '32773': 'Sanford',
  '32746': 'Lake Mary',
  '32713': 'DeBary',
  '32725': 'Deltona',
  '32738': 'Deltona',
  '32720': 'DeLand',
  '32724': 'DeLand',

  // West Orlando
  '34787': 'Winter Garden',
  '34786': 'Windermere',
  '32819': 'Dr. Phillips',
  '32836': 'Bay Hill',
  '32821': 'International Drive',

  // South Orlando / Osceola
  '32827': 'Lake Nona',
  '32832': 'Lake Nona',
  '34747': 'Celebration',
  '34741': 'Kissimmee',
  '34743': 'Kissimmee',
  '34744': 'Kissimmee',
  '34746': 'Kissimmee',
  '34758': 'Poinciana',
  '34759': 'Poinciana',
  '34769': 'St. Cloud',
  '34771': 'St. Cloud',
  '34772': 'St. Cloud',
  '33844': 'Haines City',
  '33837': 'Davenport',
  '33896': 'Davenport',
  '33897': 'Davenport',

  // Lake County
  '34711': 'Clermont',
  '34714': 'Clermont',
  '34715': 'Clermont',
  '34748': 'Leesburg',
  '34788': 'Leesburg',
  '32757': 'Mount Dora',
  '32778': 'Tavares',
  '32726': 'Eustis',
  '32159': 'Lady Lake',
  '32162': 'The Villages',
  '32163': 'The Villages',

  // North / Northwest Orlando
  '32703': 'Apopka',
  '32712': 'Apopka',
  '34761': 'Ocoee',

  // East Orlando
  '32816': 'UCF Area',
  '32817': 'UCF Area',
  '32826': 'Waterford Lakes',
  '32828': 'Avalon Park',
  '32763': 'Orange City',

  // === Jacksonville ===
  // Beaches
  '32250': 'Jacksonville Beach',
  '32266': 'Neptune Beach',
  '32233': 'Atlantic Beach',
  '32082': 'Ponte Vedra Beach',

  // Historic / Urban Core
  '32207': 'San Marco',
  '32204': 'Riverside',
  '32205': 'Avondale',
  '32210': 'Ortega',
  '32206': 'Springfield',
  '32202': 'Downtown Jacksonville',

  // Suburban Jacksonville
  '32223': 'Mandarin',
  '32257': 'Mandarin',
  '32258': 'Mandarin',
  '32256': 'Baymeadows',
  '32246': 'Deerwood',
  '32244': 'Argyle Forest',
  '32221': 'Westside Jacksonville',
  '32218': 'Northside Jacksonville',
  '32219': 'Northside Jacksonville',
  '32226': 'Fort George Island',
  '32211': 'Eastside / Arlington',
  '32277': 'Eastside / Arlington',
  '32216': 'Southside',
  '32224': 'Intracoastal West',
  '32217': 'San Jose',

  // St. Johns County
  '32259': 'Julington Creek',
  '32081': 'Nocatee',
  '32092': 'World Golf Village',

  // Clay County
  '32003': 'Orange Park',
  '32065': 'Orange Park',
  '32073': 'Orange Park',
  '32068': 'Middleburg',
  '32043': 'Green Cove Springs',

  // Nassau County
  '32034': 'Fernandina Beach',
  '32035': 'Fernandina Beach',
  '32097': 'Yulee',
  '32011': 'Callahan',

  // St. Augustine Area
  '32080': 'St. Augustine Beach',
  '32084': 'St. Augustine',
  '32086': 'St. Augustine',
  '32095': 'St. Augustine',

  // === Southwest Florida ===
  // Naples / Collier County
  '34102': 'Naples',
  '34103': 'Naples',
  '34104': 'Naples',
  '34105': 'Naples',
  '34108': 'Pelican Bay',
  '34109': 'North Naples',
  '34110': 'North Naples',
  '34112': 'Naples',
  '34113': 'Lely',
  '34114': 'Naples',
  '34116': 'Golden Gate',
  '34117': 'Naples',
  '34119': 'Vineyards',
  '34120': 'Golden Gate',
  '34145': 'Marco Island',
  '34146': 'Marco Island',
  '34139': 'Everglades City',

  // Lee County / Fort Myers
  '33901': 'Fort Myers',
  '33903': 'Fort Myers',
  '33905': 'Fort Myers',
  '33907': 'Fort Myers',
  '33908': 'Iona',
  '33912': 'San Carlos Park',
  '33913': 'Gateway',
  '33916': 'Fort Myers',
  '33919': 'Fort Myers',
  '33931': 'Fort Myers Beach',
  '33904': 'Cape Coral',
  '33909': 'Cape Coral',
  '33914': 'Cape Coral',
  '33990': 'Cape Coral',
  '33991': 'Cape Coral',
  '33993': 'Cape Coral',
  '33917': 'North Fort Myers',
  '33922': 'Pine Island',
  '33956': 'Pine Island',
  '33957': 'Sanibel Island',
  '33924': 'Captiva Island',
  '34134': 'Bonita Springs',
  '34135': 'Bonita Springs',
  '33928': 'Estero',
  '33967': 'Estero',
  '33936': 'Lehigh Acres',
  '33971': 'Lehigh Acres',
  '33972': 'Lehigh Acres',
  '33973': 'Lehigh Acres',

  // Charlotte County
  '33948': 'Port Charlotte',
  '33952': 'Port Charlotte',
  '33953': 'Port Charlotte',
  '33954': 'Port Charlotte',
  '33950': 'Punta Gorda',
  '33955': 'Punta Gorda',
  '33947': 'Rotonda West',

  // Sarasota County
  '34230': 'Sarasota',
  '34231': 'Gulf Gate',
  '34232': 'Sarasota',
  '34233': 'Bee Ridge',
  '34234': 'Sarasota',
  '34235': 'Sarasota',
  '34236': 'Sarasota',
  '34237': 'Sarasota',
  '34238': 'Palmer Ranch',
  '34239': 'Sarasota',
  '34240': 'Lakewood Ranch',
  '34242': 'Siesta Key',
  '34243': 'Sarasota',
  '34228': 'Longboat Key',
  '34229': 'Osprey',
  '34275': 'Nokomis',
  '34285': 'Venice',
  '34292': 'Venice',
  '34293': 'Venice',
  '34286': 'North Port',
  '34287': 'North Port',
  '34288': 'North Port',
  '34289': 'North Port',
  '34223': 'Englewood',
  '34224': 'Englewood',

  // Manatee County / Bradenton
  '34201': 'University Park',
  '34202': 'Lakewood Ranch',
  '34203': 'Bradenton',
  '34205': 'Bradenton',
  '34207': 'Bradenton',
  '34208': 'Bradenton',
  '34209': 'Bradenton',
  '34210': 'Bradenton',
  '34211': 'Lakewood Ranch',
  '34212': 'Lakewood Ranch',
  '34217': 'Bradenton Beach',
  '34216': 'Anna Maria Island',
  '34218': 'Anna Maria Island',
  '34219': 'Parrish',
  '34220': 'Palmetto',
  '34221': 'Palmetto',
  '34222': 'Ellenton',

  // === Space Coast / Treasure Coast ===
  // Brevard County
  '32901': 'Melbourne',
  '32903': 'Indialantic',
  '32904': 'West Melbourne',
  '32907': 'Palm Bay',
  '32934': 'Melbourne',
  '32935': 'Eau Gallie',
  '32940': 'Suntree',
  '32937': 'Satellite Beach',
  '32925': 'Patrick Space Force Base Area',
  '32931': 'Cocoa Beach',
  '32920': 'Cape Canaveral',
  '32952': 'Merritt Island',
  '32953': 'Merritt Island',
  '32780': 'Titusville',
  '32796': 'Titusville',
  '32955': 'Rockledge',
  '32922': 'Cocoa',
  '32926': 'Cocoa',
  '32927': 'Cocoa',
  '32905': 'Palm Bay',
  '32908': 'Palm Bay',
  '32909': 'Palm Bay',
  '32951': 'Melbourne Beach',

  // Indian River County
  '32960': 'Vero Beach',
  '32962': 'Vero Beach',
  '32963': 'Indian River Shores',
  '32966': 'Vero Beach',
  '32967': 'Vero Beach',
  '32968': 'Vero Beach',
  '32958': 'Sebastian',

  // St. Lucie County
  '34952': 'Port St. Lucie',
  '34953': 'Port St. Lucie',
  '34983': 'Port St. Lucie',
  '34984': 'Port St. Lucie',
  '34986': 'Port St. Lucie',
  '34987': 'Tradition',
  '34988': 'Port St. Lucie',
  '34945': 'Fort Pierce',
  '34946': 'Fort Pierce',
  '34947': 'Fort Pierce',
  '34950': 'Fort Pierce',
  '34951': 'Fort Pierce',
  '34982': 'Fort Pierce',

  // Martin County
  '34994': 'Stuart',
  '34996': 'Stuart',
  '34997': 'Stuart',
  '34957': 'Jensen Beach',
  '34949': 'Hutchinson Island',
  '34990': 'Palm City',
  '34991': 'Palm City',

  // Volusia County
  '32168': 'New Smyrna Beach',
  '32169': 'New Smyrna Beach',
  '32114': 'Daytona Beach',
  '32117': 'Daytona Beach',
  '32118': 'Daytona Beach',
  '32119': 'Daytona Beach',
  '32174': 'Ormond Beach',
  '32176': 'Ormond Beach',
  '32127': 'Port Orange',
  '32128': 'Port Orange',
  '32129': 'Port Orange',

  // Flagler County
  '32135': 'Palm Coast',
  '32136': 'Flagler Beach',
  '32137': 'Palm Coast',
  '32164': 'Palm Coast',

  // === Florida Keys ===
  '33037': 'Key Largo',
  '33070': 'Tavernier',
  '33036': 'Islamorada',
  '33001': 'Layton',
  '33050': 'Marathon',
  '33051': 'Marathon',
  '33043': 'Big Pine Key',
  '33042': 'Summerland Key',
  '33040': 'Key West',
  '33041': 'Key West',
  '33045': 'Key West',

  // === Florida Panhandle ===
  // Pensacola
  '32501': 'Pensacola',
  '32502': 'Pensacola',
  '32503': 'Pensacola',
  '32504': 'Pensacola',
  '32505': 'Pensacola',
  '32506': 'Pensacola',
  '32507': 'Perdido Key',
  '32514': 'Pensacola',
  '32561': 'Pensacola Beach',
  '32563': 'Gulf Breeze',
  '32533': 'Cantonment',

  // Santa Rosa County
  '32570': 'Milton',
  '32571': 'Pace',
  '32583': 'Milton',
  '32566': 'Navarre',

  // Emerald Coast / Okaloosa
  '32547': 'Fort Walton Beach',
  '32548': 'Fort Walton Beach',
  '32541': 'Destin',
  '32550': 'Miramar Beach',
  '32578': 'Niceville',
  '32579': 'Shalimar',
  '32536': 'Crestview',
  '32539': 'Crestview',

  // 30A / Walton County
  '32459': 'Santa Rosa Beach',
  '32461': 'Rosemary Beach',
  '32433': 'DeFuniak Springs',
  '32435': 'DeFuniak Springs',

  // Panama City / Bay County
  '32401': 'Panama City',
  '32404': 'Panama City',
  '32405': 'Panama City',
  '32407': 'Panama City Beach',
  '32408': 'Panama City Beach',
  '32413': 'Panama City Beach',
  '32444': 'Lynn Haven',
  '32456': 'Port St. Joe',

  // Tallahassee
  '32301': 'Tallahassee',
  '32303': 'Tallahassee',
  '32304': 'Tallahassee',
  '32308': 'Tallahassee',
  '32309': 'Tallahassee',
  '32310': 'Tallahassee',
  '32311': 'Tallahassee',
  '32312': 'Tallahassee',

  // === North Central Florida ===
  // Gainesville
  '32601': 'Gainesville',
  '32603': 'Gainesville',
  '32605': 'Gainesville',
  '32606': 'Gainesville',
  '32607': 'Gainesville',
  '32608': 'Gainesville',
  '32609': 'Gainesville',
  '32641': 'Gainesville',

  // Ocala / Marion County
  '34470': 'Ocala',
  '34471': 'Ocala',
  '34472': 'Ocala',
  '34473': 'Ocala',
  '34474': 'Ocala',
  '34475': 'Ocala',
  '34476': 'Ocala',
  '34480': 'Ocala',
  '34481': 'Ocala',
  '34482': 'Ocala',

  // The Villages / Sumter County
  '34785': 'Wildwood',
  '33513': 'Bushnell',
  '34484': 'Oxford',

  // Citrus County
  '34423': 'Crystal River',
  '34428': 'Crystal River',
  '34429': 'Crystal River',
  '34446': 'Homosassa',
  '34448': 'Homosassa',
  '34450': 'Inverness',
  '34452': 'Inverness',
  '34453': 'Inverness',

  // Hernando County
  '34606': 'Spring Hill',
  '34607': 'Spring Hill',
  '34608': 'Spring Hill',
  '34609': 'Spring Hill',
  '34601': 'Brooksville',
  '34602': 'Brooksville',
  '34604': 'Brooksville',

  // Dunnellon
  '34430': 'Dunnellon',
  '34431': 'Dunnellon',
  '34432': 'Dunnellon',
  '34433': 'Dunnellon',
}

export const NEIGHBORHOOD_TO_DOMAINS: Record<string, string[]> = {
  // All Florida neighborhoods map to thefloridamaid.com for now
  // Miami-Dade
  'South Beach': ['thefloridamaid.com'],
  'Miami Beach': ['thefloridamaid.com'],
  'Surfside': ['thefloridamaid.com'],
  'Sunny Isles Beach': ['thefloridamaid.com'],
  'Fisher Island': ['thefloridamaid.com'],
  'Brickell': ['thefloridamaid.com'],
  'Downtown Miami': ['thefloridamaid.com'],
  'Edgewater': ['thefloridamaid.com'],
  'Wynwood': ['thefloridamaid.com'],
  'Design District': ['thefloridamaid.com'],
  'Overtown': ['thefloridamaid.com'],
  'Little Havana': ['thefloridamaid.com'],
  'Allapattah': ['thefloridamaid.com'],
  'Liberty City': ['thefloridamaid.com'],
  'Upper East Side': ['thefloridamaid.com'],
  'Little Haiti': ['thefloridamaid.com'],
  'Coral Gables': ['thefloridamaid.com'],
  'Coconut Grove': ['thefloridamaid.com'],
  'Key Biscayne': ['thefloridamaid.com'],
  'Pinecrest': ['thefloridamaid.com'],
  'South Miami': ['thefloridamaid.com'],
  'Doral': ['thefloridamaid.com'],
  'Kendall': ['thefloridamaid.com'],
  'The Hammocks': ['thefloridamaid.com'],
  'Homestead': ['thefloridamaid.com'],
  'Florida City': ['thefloridamaid.com'],
  'Aventura': ['thefloridamaid.com'],
  'Hialeah': ['thefloridamaid.com'],
  'Hialeah Gardens': ['thefloridamaid.com'],
  'Miami Lakes': ['thefloridamaid.com'],
  'North Miami': ['thefloridamaid.com'],
  'Miami Shores': ['thefloridamaid.com'],
  'North Miami Beach': ['thefloridamaid.com'],
  'Opa-locka': ['thefloridamaid.com'],
  'Miami Gardens': ['thefloridamaid.com'],
  'Sweetwater': ['thefloridamaid.com'],
  'West Miami': ['thefloridamaid.com'],
  'Westchester': ['thefloridamaid.com'],
  'Tamiami': ['thefloridamaid.com'],
  'Sunset': ['thefloridamaid.com'],
  'Three Lakes': ['thefloridamaid.com'],
  'Cutler Bay': ['thefloridamaid.com'],
  'Palmetto Bay': ['thefloridamaid.com'],
  'South Miami Heights': ['thefloridamaid.com'],
  'Fountainebleau': ['thefloridamaid.com'],
  'University Park': ['thefloridamaid.com'],

  // Broward
  'Fort Lauderdale': ['thefloridamaid.com'],
  'Fort Lauderdale Beach': ['thefloridamaid.com'],
  'Wilton Manors': ['thefloridamaid.com'],
  'Oakland Park': ['thefloridamaid.com'],
  'Lauderdale-by-the-Sea': ['thefloridamaid.com'],
  'Las Olas Isles': ['thefloridamaid.com'],
  'Hollywood': ['thefloridamaid.com'],
  'Hallandale Beach': ['thefloridamaid.com'],
  'Dania Beach': ['thefloridamaid.com'],
  'Pembroke Pines': ['thefloridamaid.com'],
  'Weston': ['thefloridamaid.com'],
  'Southwest Ranches': ['thefloridamaid.com'],
  'Davie': ['thefloridamaid.com'],
  'Plantation': ['thefloridamaid.com'],
  'Sunrise': ['thefloridamaid.com'],
  'Coral Springs': ['thefloridamaid.com'],
  'Parkland': ['thefloridamaid.com'],
  'Pompano Beach': ['thefloridamaid.com'],
  'Lighthouse Point': ['thefloridamaid.com'],
  'Deerfield Beach': ['thefloridamaid.com'],
  'Coconut Creek': ['thefloridamaid.com'],
  'Margate': ['thefloridamaid.com'],
  'Lauderhill': ['thefloridamaid.com'],
  'Tamarac': ['thefloridamaid.com'],
  'North Lauderdale': ['thefloridamaid.com'],
  'Cooper City': ['thefloridamaid.com'],

  // Palm Beach
  'West Palm Beach': ['thefloridamaid.com'],
  'Palm Beach': ['thefloridamaid.com'],
  'Boca Raton': ['thefloridamaid.com'],
  'Highland Beach': ['thefloridamaid.com'],
  'Delray Beach': ['thefloridamaid.com'],
  'Gulf Stream': ['thefloridamaid.com'],
  'Boynton Beach': ['thefloridamaid.com'],
  'Lake Worth Beach': ['thefloridamaid.com'],
  'Palm Springs': ['thefloridamaid.com'],
  'Lantana': ['thefloridamaid.com'],
  'Juno Beach': ['thefloridamaid.com'],
  'Singer Island': ['thefloridamaid.com'],
  'Palm Beach Gardens': ['thefloridamaid.com'],
  'Jupiter': ['thefloridamaid.com'],
  'Tequesta': ['thefloridamaid.com'],
  'Jupiter Farms': ['thefloridamaid.com'],
  'Wellington': ['thefloridamaid.com'],
  'Royal Palm Beach': ['thefloridamaid.com'],
  'The Acreage': ['thefloridamaid.com'],
  'Hobe Sound': ['thefloridamaid.com'],
  'Greenacres': ['thefloridamaid.com'],
  'Haverhill': ['thefloridamaid.com'],
  'Belle Glade': ['thefloridamaid.com'],
  'Pahokee': ['thefloridamaid.com'],
  'South Bay': ['thefloridamaid.com'],

  // Tampa Bay
  'South Tampa': ['thefloridamaid.com'],
  'Hyde Park': ['thefloridamaid.com'],
  'Davis Islands': ['thefloridamaid.com'],
  'Downtown Tampa': ['thefloridamaid.com'],
  'Channelside': ['thefloridamaid.com'],
  'Ybor City': ['thefloridamaid.com'],
  'Seminole Heights': ['thefloridamaid.com'],
  'Westchase': ['thefloridamaid.com'],
  'Carrollwood': ['thefloridamaid.com'],
  'New Tampa': ['thefloridamaid.com'],
  'Temple Terrace': ['thefloridamaid.com'],
  'East Tampa': ['thefloridamaid.com'],
  'Westshore': ['thefloridamaid.com'],
  'Town N Country': ['thefloridamaid.com'],
  'Citrus Park': ['thefloridamaid.com'],
  'Lutz': ['thefloridamaid.com'],
  'Land O Lakes': ['thefloridamaid.com'],
  'Brandon': ['thefloridamaid.com'],
  'Riverview': ['thefloridamaid.com'],
  'Valrico': ['thefloridamaid.com'],
  'Lithia': ['thefloridamaid.com'],
  'Plant City': ['thefloridamaid.com'],
  'Wesley Chapel': ['thefloridamaid.com'],
  'St. Petersburg': ['thefloridamaid.com'],
  'Gulfport': ['thefloridamaid.com'],
  'St. Pete Beach': ['thefloridamaid.com'],
  'Treasure Island': ['thefloridamaid.com'],
  'Madeira Beach': ['thefloridamaid.com'],
  'Clearwater': ['thefloridamaid.com'],
  'Clearwater Beach': ['thefloridamaid.com'],
  'Largo': ['thefloridamaid.com'],
  'Seminole': ['thefloridamaid.com'],
  'Dunedin': ['thefloridamaid.com'],
  'Safety Harbor': ['thefloridamaid.com'],
  'Tarpon Springs': ['thefloridamaid.com'],
  'Palm Harbor': ['thefloridamaid.com'],
  'Oldsmar': ['thefloridamaid.com'],
  'Pinellas Park': ['thefloridamaid.com'],
  'Trinity': ['thefloridamaid.com'],
  'Holiday': ['thefloridamaid.com'],
  'Indian Rocks Beach': ['thefloridamaid.com'],
  'Belleair Beach': ['thefloridamaid.com'],
  'Kenneth City': ['thefloridamaid.com'],
  'Bay Pines': ['thefloridamaid.com'],
  'Tierra Verde': ['thefloridamaid.com'],
  'Zephyrhills': ['thefloridamaid.com'],
  'Dade City': ['thefloridamaid.com'],
  'New Port Richey': ['thefloridamaid.com'],
  'Port Richey': ['thefloridamaid.com'],
  'Hudson': ['thefloridamaid.com'],
  'Sun City Center': ['thefloridamaid.com'],
  'Ruskin': ['thefloridamaid.com'],
  'Apollo Beach': ['thefloridamaid.com'],
  'Gibsonton': ['thefloridamaid.com'],

  // Orlando
  'Downtown Orlando': ['thefloridamaid.com'],
  'Thornton Park': ['thefloridamaid.com'],
  'College Park': ['thefloridamaid.com'],
  'Mills 50': ['thefloridamaid.com'],
  'SoDo': ['thefloridamaid.com'],
  'Baldwin Park': ['thefloridamaid.com'],
  'Winter Park': ['thefloridamaid.com'],
  'Maitland': ['thefloridamaid.com'],
  'Altamonte Springs': ['thefloridamaid.com'],
  'Casselberry': ['thefloridamaid.com'],
  'Oviedo': ['thefloridamaid.com'],
  'Winter Springs': ['thefloridamaid.com'],
  'Longwood': ['thefloridamaid.com'],
  'Sanford': ['thefloridamaid.com'],
  'Lake Mary': ['thefloridamaid.com'],
  'DeBary': ['thefloridamaid.com'],
  'Deltona': ['thefloridamaid.com'],
  'DeLand': ['thefloridamaid.com'],
  'Winter Garden': ['thefloridamaid.com'],
  'Windermere': ['thefloridamaid.com'],
  'Dr. Phillips': ['thefloridamaid.com'],
  'Bay Hill': ['thefloridamaid.com'],
  'International Drive': ['thefloridamaid.com'],
  'Lake Nona': ['thefloridamaid.com'],
  'Celebration': ['thefloridamaid.com'],
  'Kissimmee': ['thefloridamaid.com'],
  'St. Cloud': ['thefloridamaid.com'],
  'Poinciana': ['thefloridamaid.com'],
  'Haines City': ['thefloridamaid.com'],
  'Davenport': ['thefloridamaid.com'],
  'Clermont': ['thefloridamaid.com'],
  'Leesburg': ['thefloridamaid.com'],
  'Mount Dora': ['thefloridamaid.com'],
  'Tavares': ['thefloridamaid.com'],
  'Eustis': ['thefloridamaid.com'],
  'Lady Lake': ['thefloridamaid.com'],
  'The Villages': ['thefloridamaid.com'],
  'Apopka': ['thefloridamaid.com'],
  'Ocoee': ['thefloridamaid.com'],
  'UCF Area': ['thefloridamaid.com'],
  'Waterford Lakes': ['thefloridamaid.com'],
  'Avalon Park': ['thefloridamaid.com'],
  'Orange City': ['thefloridamaid.com'],

  // Jacksonville
  'Jacksonville Beach': ['thefloridamaid.com'],
  'Neptune Beach': ['thefloridamaid.com'],
  'Atlantic Beach': ['thefloridamaid.com'],
  'Ponte Vedra Beach': ['thefloridamaid.com'],
  'San Marco': ['thefloridamaid.com'],
  'Riverside': ['thefloridamaid.com'],
  'Avondale': ['thefloridamaid.com'],
  'Ortega': ['thefloridamaid.com'],
  'Springfield': ['thefloridamaid.com'],
  'Downtown Jacksonville': ['thefloridamaid.com'],
  'Mandarin': ['thefloridamaid.com'],
  'Baymeadows': ['thefloridamaid.com'],
  'Deerwood': ['thefloridamaid.com'],
  'Argyle Forest': ['thefloridamaid.com'],
  'Westside Jacksonville': ['thefloridamaid.com'],
  'Northside Jacksonville': ['thefloridamaid.com'],
  'Fort George Island': ['thefloridamaid.com'],
  'Eastside / Arlington': ['thefloridamaid.com'],
  'Southside': ['thefloridamaid.com'],
  'Intracoastal West': ['thefloridamaid.com'],
  'San Jose': ['thefloridamaid.com'],
  'Julington Creek': ['thefloridamaid.com'],
  'Nocatee': ['thefloridamaid.com'],
  'World Golf Village': ['thefloridamaid.com'],
  'Orange Park': ['thefloridamaid.com'],
  'Middleburg': ['thefloridamaid.com'],
  'Green Cove Springs': ['thefloridamaid.com'],
  'Fernandina Beach': ['thefloridamaid.com'],
  'Yulee': ['thefloridamaid.com'],
  'Callahan': ['thefloridamaid.com'],
  'St. Augustine': ['thefloridamaid.com'],
  'St. Augustine Beach': ['thefloridamaid.com'],

  // Southwest Florida
  'Naples': ['thefloridamaid.com'],
  'North Naples': ['thefloridamaid.com'],
  'Pelican Bay': ['thefloridamaid.com'],
  'Vineyards': ['thefloridamaid.com'],
  'Marco Island': ['thefloridamaid.com'],
  'Golden Gate': ['thefloridamaid.com'],
  'Lely': ['thefloridamaid.com'],
  'Everglades City': ['thefloridamaid.com'],
  'Fort Myers': ['thefloridamaid.com'],
  'Fort Myers Beach': ['thefloridamaid.com'],
  'Cape Coral': ['thefloridamaid.com'],
  'North Fort Myers': ['thefloridamaid.com'],
  'Pine Island': ['thefloridamaid.com'],
  'Sanibel Island': ['thefloridamaid.com'],
  'Captiva Island': ['thefloridamaid.com'],
  'Bonita Springs': ['thefloridamaid.com'],
  'Estero': ['thefloridamaid.com'],
  'Lehigh Acres': ['thefloridamaid.com'],
  'Iona': ['thefloridamaid.com'],
  'San Carlos Park': ['thefloridamaid.com'],
  'Gateway': ['thefloridamaid.com'],
  'Port Charlotte': ['thefloridamaid.com'],
  'Punta Gorda': ['thefloridamaid.com'],
  'Rotonda West': ['thefloridamaid.com'],
  'Sarasota': ['thefloridamaid.com'],
  'Siesta Key': ['thefloridamaid.com'],
  'Longboat Key': ['thefloridamaid.com'],
  'Osprey': ['thefloridamaid.com'],
  'Nokomis': ['thefloridamaid.com'],
  'Venice': ['thefloridamaid.com'],
  'Bee Ridge': ['thefloridamaid.com'],
  'Gulf Gate': ['thefloridamaid.com'],
  'Palmer Ranch': ['thefloridamaid.com'],
  'North Port': ['thefloridamaid.com'],
  'Englewood': ['thefloridamaid.com'],
  'Bradenton': ['thefloridamaid.com'],
  'Bradenton Beach': ['thefloridamaid.com'],
  'Anna Maria Island': ['thefloridamaid.com'],
  'Lakewood Ranch': ['thefloridamaid.com'],
  'Palmetto': ['thefloridamaid.com'],
  'Parrish': ['thefloridamaid.com'],
  'Ellenton': ['thefloridamaid.com'],

  // Space Coast / Treasure Coast
  'Melbourne': ['thefloridamaid.com'],
  'West Melbourne': ['thefloridamaid.com'],
  'Melbourne Beach': ['thefloridamaid.com'],
  'Indialantic': ['thefloridamaid.com'],
  'Satellite Beach': ['thefloridamaid.com'],
  'Suntree': ['thefloridamaid.com'],
  'Eau Gallie': ['thefloridamaid.com'],
  'Patrick Space Force Base Area': ['thefloridamaid.com'],
  'Cocoa Beach': ['thefloridamaid.com'],
  'Cape Canaveral': ['thefloridamaid.com'],
  'Merritt Island': ['thefloridamaid.com'],
  'Titusville': ['thefloridamaid.com'],
  'Rockledge': ['thefloridamaid.com'],
  'Cocoa': ['thefloridamaid.com'],
  'Viera': ['thefloridamaid.com'],
  'Palm Bay': ['thefloridamaid.com'],
  'Vero Beach': ['thefloridamaid.com'],
  'Indian River Shores': ['thefloridamaid.com'],
  'Sebastian': ['thefloridamaid.com'],
  'Port St. Lucie': ['thefloridamaid.com'],
  'Tradition': ['thefloridamaid.com'],
  'Fort Pierce': ['thefloridamaid.com'],
  'Stuart': ['thefloridamaid.com'],
  'Jensen Beach': ['thefloridamaid.com'],
  'Hutchinson Island': ['thefloridamaid.com'],
  'Palm City': ['thefloridamaid.com'],
  'New Smyrna Beach': ['thefloridamaid.com'],
  'Daytona Beach': ['thefloridamaid.com'],
  'Ormond Beach': ['thefloridamaid.com'],
  'Port Orange': ['thefloridamaid.com'],
  'Palm Coast': ['thefloridamaid.com'],
  'Flagler Beach': ['thefloridamaid.com'],

  // Florida Keys
  'Key Largo': ['thefloridamaid.com'],
  'Tavernier': ['thefloridamaid.com'],
  'Islamorada': ['thefloridamaid.com'],
  'Layton': ['thefloridamaid.com'],
  'Marathon': ['thefloridamaid.com'],
  'Big Pine Key': ['thefloridamaid.com'],
  'Summerland Key': ['thefloridamaid.com'],
  'Key West': ['thefloridamaid.com'],

  // Panhandle
  'Pensacola': ['thefloridamaid.com'],
  'Pensacola Beach': ['thefloridamaid.com'],
  'Perdido Key': ['thefloridamaid.com'],
  'Gulf Breeze': ['thefloridamaid.com'],
  'Cantonment': ['thefloridamaid.com'],
  'Milton': ['thefloridamaid.com'],
  'Pace': ['thefloridamaid.com'],
  'Navarre': ['thefloridamaid.com'],
  'Fort Walton Beach': ['thefloridamaid.com'],
  'Destin': ['thefloridamaid.com'],
  'Miramar Beach': ['thefloridamaid.com'],
  'Niceville': ['thefloridamaid.com'],
  'Shalimar': ['thefloridamaid.com'],
  'Crestview': ['thefloridamaid.com'],
  'Santa Rosa Beach': ['thefloridamaid.com'],
  'Rosemary Beach': ['thefloridamaid.com'],
  'DeFuniak Springs': ['thefloridamaid.com'],
  'Panama City': ['thefloridamaid.com'],
  'Panama City Beach': ['thefloridamaid.com'],
  'Lynn Haven': ['thefloridamaid.com'],
  'Port St. Joe': ['thefloridamaid.com'],
  'Tallahassee': ['thefloridamaid.com'],

}

// Extract zip code from address string
export function extractZip(address: string): string | null {
  // Match 5-digit zip at end of string
  const match = address.match(/\b(\d{5})(?:-\d{4})?\s*$/)
  if (match) return match[1]

  // Match 5-digit zip anywhere
  const anyMatch = address.match(/\b(\d{5})\b/)
  return anyMatch ? anyMatch[1] : null
}

// Get neighborhood from zip
export function getNeighborhood(zip: string): string | null {
  return ZIP_TO_NEIGHBORHOOD[zip] || null
}

// Get domains for a neighborhood
export function getDomainsForNeighborhood(neighborhood: string): string[] {
  return NEIGHBORHOOD_TO_DOMAINS[neighborhood] || []
}

// Search engine / AI referrer detection
const SEARCH_DOMAINS = ['google.', 'bing.com', 'duckduckgo.', 'yahoo.', 'baidu.', 'yandex.', 'ecosia.', 'brave.', 'perplexity.ai', 'chatgpt.com', 'you.com']
function isSearchReferrer(referrer: string | null): boolean {
  if (!referrer) return false
  const low = referrer.toLowerCase()
  return SEARCH_DOMAINS.some(d => low.includes(d))
}

// Generic domains — high traffic, only match on CTA actions within short window
const GENERIC_DOMAINS = [
  'thefloridamaid.com',
  'theusamaid.com',
]

// Core attribution logic:
// Site visited within 24h before booking from that location = 100% attribution
// Beyond 24h = no attribution
export async function attributeByAddress(
  address: string,
  submittedAt?: string,
  excludeClickIds?: string[]
): Promise<{
  domain: string
  confidence: number
  action: string
  minutesAgo: number
  neighborhood: string
  clickId: string
} | null> {
  const { supabaseAdmin } = await import('@/lib/supabase')

  const zip = extractZip(address)
  if (!zip) return null

  const neighborhood = getNeighborhood(zip)
  if (!neighborhood) return null

  const neighborhoodDomains = getDomainsForNeighborhood(neighborhood)
  const now = new Date(submittedAt || new Date().toISOString())
  const lookback10d = new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000)

  // Include both www and non-www variants for all domains
  const allDomains = [...neighborhoodDomains, ...GENERIC_DOMAINS.filter(d => !neighborhoodDomains.includes(d))]
  const allDomainVariants = allDomains.flatMap(d => [d, `www.${d}`])

  if (allDomainVariants.length > 0) {
    // Priority 1: CTA clicks (call/text) — highest confidence
    let ctaQuery = supabaseAdmin
      .from('lead_clicks')
      .select('id, domain, action, created_at')
      .in('domain', allDomainVariants)
      .in('action', ['call', 'text'])
      .gte('created_at', lookback10d.toISOString())
      .lte('created_at', now.toISOString())
      .order('created_at', { ascending: false })
      .limit(1)

    if (excludeClickIds && excludeClickIds.length > 0) {
      ctaQuery = ctaQuery.not('id', 'in', `(${excludeClickIds.join(',')})`)
    }

    const { data: ctas } = await ctaQuery

    if (ctas && ctas.length > 0) {
      const match = ctas[0]
      const minutes = Math.floor((now.getTime() - new Date(match.created_at).getTime()) / 60000)
      const confidence = calculateConfidence(minutes)
      if (confidence > 0) {
        return { domain: match.domain.replace(/^www\./, ''), confidence, action: match.action, minutesAgo: minutes, neighborhood, clickId: match.id }
      }
    }

    // Priority 2: Search-referred visits (Google/Bing/AI) within 3 days — person searched, saw site, called manually
    const lookback3d = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000)
    const { data: recentVisits } = await supabaseAdmin
      .from('lead_clicks')
      .select('id, domain, action, created_at, referrer, engaged_30s')
      .in('domain', allDomainVariants)
      .eq('action', 'visit')
      .gte('created_at', lookback3d.toISOString())
      .lte('created_at', now.toISOString())
      .order('created_at', { ascending: false })
      .limit(20)

    if (recentVisits && recentVisits.length > 0) {
      // 2a: Search-referred visit — strongest non-CTA signal
      const searchVisit = recentVisits.find(v => isSearchReferrer(v.referrer))
      if (searchVisit) {
        const minutes = Math.floor((now.getTime() - new Date(searchVisit.created_at).getTime()) / 60000)
        const confidence = Math.min(90, calculateConfidence(minutes))
        if (confidence > 0) {
          return { domain: searchVisit.domain.replace(/^www\./, ''), confidence, action: 'search_visit', minutesAgo: minutes, neighborhood, clickId: searchVisit.id }
        }
      }

      // 2b: Engaged visit (30s+) — they browsed, then called
      const engagedVisit = recentVisits.find(v => v.engaged_30s)
      if (engagedVisit) {
        const minutes = Math.floor((now.getTime() - new Date(engagedVisit.created_at).getTime()) / 60000)
        const confidence = Math.min(80, calculateConfidence(minutes))
        if (confidence > 0) {
          return { domain: engagedVisit.domain.replace(/^www\./, ''), confidence, action: 'engaged_visit', minutesAgo: minutes, neighborhood, clickId: engagedVisit.id }
        }
      }
    }

    // Priority 3: Any visit from neighborhood domains within 24h — weakest signal
    const lookback1d = new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000)
    // Only match neighborhood-specific domains (not generic ones) for visit-only attribution
    const neighborhoodVariants = neighborhoodDomains.flatMap(d => [d, `www.${d}`])
    if (neighborhoodVariants.length > 0) {
      const recentNeighborhood = recentVisits?.filter(v =>
        neighborhoodVariants.includes(v.domain) &&
        new Date(v.created_at) >= lookback1d
      )
      const match = recentNeighborhood && recentNeighborhood.length > 0 ? recentNeighborhood[0] : null

      if (!match) {
        // Fallback query if no match in the 3-day window (visit might be from different domain set)
        const { data: visits } = await supabaseAdmin
          .from('lead_clicks')
          .select('id, domain, action, created_at')
          .in('domain', neighborhoodVariants)
          .eq('action', 'visit')
          .gte('created_at', lookback1d.toISOString())
          .lte('created_at', now.toISOString())
          .order('created_at', { ascending: false })
          .limit(1)

        if (visits && visits.length > 0) {
          const v = visits[0]
          const minutes = Math.floor((now.getTime() - new Date(v.created_at).getTime()) / 60000)
          const confidence = Math.min(50, calculateConfidence(minutes))
          if (confidence > 0) {
            return { domain: v.domain.replace(/^www\./, ''), confidence, action: 'visit', minutesAgo: minutes, neighborhood, clickId: v.id }
          }
        }
      } else {
        const minutes = Math.floor((now.getTime() - new Date(match.created_at).getTime()) / 60000)
        const confidence = Math.min(50, calculateConfidence(minutes))
        if (confidence > 0) {
          return { domain: match.domain.replace(/^www\./, ''), confidence, action: 'visit', minutesAgo: minutes, neighborhood, clickId: match.id }
        }
      }
    }
  }

  return null
}

// Attribute a collect form submission — called when a new lead submits their info
export async function attributeCollectForm(
  clientName: string,
  address: string,
  clientId: string
): Promise<{ domain: string; confidence: number } | null> {
  const { supabaseAdmin } = await import('@/lib/supabase')

  const result = await attributeByAddress(address)
  if (!result) return null

  // Build notification message
  const timeLabel = result.minutesAgo < 60
    ? `${result.minutesAgo}min ago`
    : result.minutesAgo < 1440
      ? `${Math.round(result.minutesAgo / 60)}hr ago`
      : `${Math.round(result.minutesAgo / 1440)}d ago`

  const actionLabels: Record<string, string> = {
    call: '📞 Called from',
    text: '💬 Texted from',
    book: '📅 Booked from',
    search_visit: '🔍 Found',
    engaged_visit: '👀 Browsed',
    visit: '🌐 Visited',
  }
  const actionLabel = actionLabels[result.action] || '🌐 Visited'

  await supabaseAdmin.from('notifications').insert({
    type: 'hot_lead',
    title: 'Website → Lead',
    message: `${clientName} (${result.neighborhood}) — ${actionLabel} ${result.domain} ${timeLabel} → submitted collect form (${result.confidence}%)`
  })

  return { domain: result.domain, confidence: result.confidence }
}

// Attribute a booking — called when a booking is created
export async function autoAttributeBooking(
  bookingId: string,
  clientId: string,
  bookingCreatedAt?: string
): Promise<{ domain: string; confidence: number } | null> {
  const { supabaseAdmin } = await import('@/lib/supabase')

  const { data: client } = await supabaseAdmin
    .from('clients')
    .select('address, name')
    .eq('id', clientId)
    .single()

  if (!client?.address) return null

  const result = await attributeByAddress(client.address, bookingCreatedAt)
  if (!result) return null

  // Update booking with attribution
  await supabaseAdmin
    .from('bookings')
    .update({
      attributed_domain: result.domain,
      attribution_confidence: result.confidence,
      attributed_at: new Date().toISOString()
    })
    .eq('id', bookingId)

  // Build notification message
  const timeLabel = result.minutesAgo < 60
    ? `${result.minutesAgo}min ago`
    : result.minutesAgo < 1440
      ? `${Math.round(result.minutesAgo / 60)}hr ago`
      : `${Math.round(result.minutesAgo / 1440)}d ago`

  const actionLabels: Record<string, string> = {
    call: '📞 Called from',
    text: '💬 Texted from',
    book: '📅 Booked from',
    search_visit: '🔍 Found',
    engaged_visit: '👀 Browsed',
    visit: '🌐 Visited',
  }
  const actionLabel = actionLabels[result.action] || '🌐 Visited'

  await supabaseAdmin.from('notifications').insert({
    type: 'hot_lead',
    title: 'Website → Sale',
    message: `${client.name} (${result.neighborhood}) — ${actionLabel} ${result.domain} ${timeLabel} → booked (${result.confidence}%)`,
    booking_id: bookingId
  })

  return { domain: result.domain, confidence: result.confidence }
}

// Calculate confidence based on time difference (in minutes)
// Day 1 (24h) = 100%, then drops 10% per day, Day 11+ = 0%
export function calculateConfidence(minutesAgo: number): number {
  const days = Math.floor(minutesAgo / 1440)
  if (days <= 0) return 100
  if (days >= 10) return 0
  return 100 - (days * 10)
}
