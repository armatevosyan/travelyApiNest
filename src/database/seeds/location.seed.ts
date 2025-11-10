import { DataSource } from 'typeorm';
import { Location, LocationType } from '@/modules/locations/location.entity';
import { Seeder } from 'typeorm-extension';

// Countries
const countries = [
  { name: 'Armenia', type: LocationType.COUNTRY },
  { name: 'United States', type: LocationType.COUNTRY },
  { name: 'United Kingdom', type: LocationType.COUNTRY },
  { name: 'France', type: LocationType.COUNTRY },
  { name: 'Germany', type: LocationType.COUNTRY },
  { name: 'Italy', type: LocationType.COUNTRY },
  { name: 'Spain', type: LocationType.COUNTRY },
  { name: 'Russia', type: LocationType.COUNTRY },
  { name: 'Georgia', type: LocationType.COUNTRY },
  { name: 'Turkey', type: LocationType.COUNTRY },
  { name: 'Greece', type: LocationType.COUNTRY },
  { name: 'Netherlands', type: LocationType.COUNTRY },
  { name: 'Belgium', type: LocationType.COUNTRY },
  { name: 'Switzerland', type: LocationType.COUNTRY },
  { name: 'Austria', type: LocationType.COUNTRY },
  { name: 'Poland', type: LocationType.COUNTRY },
  { name: 'Czech Republic', type: LocationType.COUNTRY },
  { name: 'Portugal', type: LocationType.COUNTRY },
  { name: 'Ireland', type: LocationType.COUNTRY },
  { name: 'Sweden', type: LocationType.COUNTRY },
  { name: 'Norway', type: LocationType.COUNTRY },
  { name: 'Denmark', type: LocationType.COUNTRY },
  { name: 'Finland', type: LocationType.COUNTRY },
  { name: 'Japan', type: LocationType.COUNTRY },
  { name: 'China', type: LocationType.COUNTRY },
  { name: 'India', type: LocationType.COUNTRY },
  { name: 'United Arab Emirates', type: LocationType.COUNTRY },
  { name: 'Saudi Arabia', type: LocationType.COUNTRY },
  { name: 'Israel', type: LocationType.COUNTRY },
  { name: 'Canada', type: LocationType.COUNTRY },
  { name: 'Mexico', type: LocationType.COUNTRY },
  { name: 'Brazil', type: LocationType.COUNTRY },
  { name: 'Argentina', type: LocationType.COUNTRY },
  { name: 'Australia', type: LocationType.COUNTRY },
  { name: 'New Zealand', type: LocationType.COUNTRY },
  { name: 'South Korea', type: LocationType.COUNTRY },
  { name: 'Thailand', type: LocationType.COUNTRY },
  { name: 'Singapore', type: LocationType.COUNTRY },
  { name: 'Malaysia', type: LocationType.COUNTRY },
  { name: 'Indonesia', type: LocationType.COUNTRY },
  { name: 'Philippines', type: LocationType.COUNTRY },
  { name: 'Vietnam', type: LocationType.COUNTRY },
  { name: 'Egypt', type: LocationType.COUNTRY },
  { name: 'South Africa', type: LocationType.COUNTRY },
];

// States/Regions - Armenia
const armeniaStates = [
  'Yerevan',
  'Aragatsotn',
  'Ararat',
  'Armavir',
  'Gegharkunik',
  'Kotayk',
  'Lori',
  'Shirak',
  'Syunik',
  'Tavush',
  'Vayots Dzor',
];

// States - USA (all 50)
const usaStates = [
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'Florida',
  'Georgia',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming',
];

// UK Regions
const ukRegions = ['England', 'Scotland', 'Wales', 'Northern Ireland'];

// France Regions
const franceRegions = [
  'Île-de-France',
  "Provence-Alpes-Côte d'Azur",
  'Auvergne-Rhône-Alpes',
  'Nouvelle-Aquitaine',
  'Occitanie',
  'Hauts-de-France',
  'Grand Est',
  'Normandy',
  'Brittany',
  'Pays de la Loire',
];

// Germany States
const germanyStates = [
  'Bavaria',
  'Baden-Württemberg',
  'Berlin',
  'Brandenburg',
  'Bremen',
  'Hamburg',
  'Hesse',
  'Lower Saxony',
  'Mecklenburg-Vorpommern',
  'North Rhine-Westphalia',
  'Rhineland-Palatinate',
  'Saarland',
  'Saxony',
  'Saxony-Anhalt',
  'Schleswig-Holstein',
  'Thuringia',
];

// Italy Regions
const italyRegions = [
  'Lombardy',
  'Lazio',
  'Campania',
  'Sicily',
  'Veneto',
  'Emilia-Romagna',
  'Piedmont',
  'Apulia',
  'Tuscany',
  'Calabria',
];

// Spain Regions
const spainRegions = [
  'Andalusia',
  'Catalonia',
  'Madrid',
  'Valencia',
  'Basque Country',
  'Castile and León',
  'Galicia',
  'Canary Islands',
  'Castile-La Mancha',
  'Murcia',
];

// Cities data structure: { countryName: { stateName: [cities] } }
const citiesData: Record<string, Record<string, string[]>> = {
  Armenia: {
    Yerevan: ['Yerevan', 'Ashtarak', 'Abovyan'],
    Aragatsotn: ['Aparan', 'Talin', 'Aragats'],
    Ararat: ['Artashat', 'Ararat', 'Masis'],
    Armavir: ['Armavir', 'Echmiadzin', 'Metsamor'],
    Gegharkunik: ['Gavar', 'Sevan', 'Martuni'],
    Kotayk: ['Hrazdan', 'Abovyan', 'Charentsavan'],
    Lori: ['Vanadzor', 'Alaverdi', 'Spitak'],
    Shirak: ['Gyumri', 'Artik', 'Maralik'],
    Syunik: ['Kapan', 'Goris', 'Meghri'],
    Tavush: ['Ijevan', 'Dilijan', 'Berd'],
    'Vayots Dzor': ['Yeghegnadzor', 'Jermuk', 'Vayk'],
  },
  'United States': {
    California: [
      'Los Angeles',
      'San Francisco',
      'San Diego',
      'San Jose',
      'Sacramento',
      'Oakland',
      'Fresno',
      'Long Beach',
      'Santa Ana',
      'Anaheim',
    ],
    'New York': [
      'New York City',
      'Buffalo',
      'Rochester',
      'Albany',
      'Syracuse',
      'Yonkers',
      'Utica',
      'New Rochelle',
    ],
    Texas: [
      'Houston',
      'Dallas',
      'Austin',
      'San Antonio',
      'Fort Worth',
      'El Paso',
      'Arlington',
      'Corpus Christi',
    ],
    Florida: [
      'Miami',
      'Tampa',
      'Orlando',
      'Jacksonville',
      'Tallahassee',
      'Fort Lauderdale',
      'St. Petersburg',
    ],
    Illinois: ['Chicago', 'Aurora', 'Naperville', 'Rockford', 'Joliet'],
    Pennsylvania: ['Philadelphia', 'Pittsburgh', 'Allentown', 'Erie'],
    Ohio: ['Columbus', 'Cleveland', 'Cincinnati', 'Toledo', 'Akron'],
    Georgia: ['Atlanta', 'Augusta', 'Columbus', 'Savannah', 'Athens'],
    'North Carolina': ['Charlotte', 'Raleigh', 'Greensboro', 'Durham'],
    Michigan: ['Detroit', 'Grand Rapids', 'Warren', 'Sterling Heights'],
  },
  'United Kingdom': {
    England: [
      'London',
      'Manchester',
      'Birmingham',
      'Liverpool',
      'Leeds',
      'Sheffield',
      'Bristol',
      'Leicester',
    ],
    Scotland: ['Edinburgh', 'Glasgow', 'Aberdeen', 'Dundee', 'Inverness'],
    Wales: ['Cardiff', 'Swansea', 'Newport', 'Wrexham'],
    'Northern Ireland': ['Belfast', 'Derry', 'Lisburn', 'Newry'],
  },
  France: {
    'Île-de-France': ['Paris', 'Versailles', 'Boulogne-Billancourt'],
    "Provence-Alpes-Côte d'Azur": [
      'Marseille',
      'Nice',
      'Toulon',
      'Aix-en-Provence',
    ],
    'Auvergne-Rhône-Alpes': [
      'Lyon',
      'Grenoble',
      'Saint-Étienne',
      'Clermont-Ferrand',
    ],
    'Nouvelle-Aquitaine': ['Bordeaux', 'Limoges', 'Poitiers', 'La Rochelle'],
    Occitanie: ['Toulouse', 'Montpellier', 'Nîmes', 'Perpignan'],
  },
  Germany: {
    Bavaria: ['Munich', 'Nuremberg', 'Augsburg', 'Regensburg'],
    'Baden-Württemberg': ['Stuttgart', 'Mannheim', 'Karlsruhe', 'Freiburg'],
    Berlin: ['Berlin'],
    'North Rhine-Westphalia': ['Cologne', 'Düsseldorf', 'Dortmund', 'Essen'],
    Hesse: ['Frankfurt', 'Wiesbaden', 'Kassel', 'Darmstadt'],
    'Lower Saxony': ['Hanover', 'Braunschweig', 'Oldenburg', 'Osnabrück'],
  },
  Italy: {
    Lombardy: ['Milan', 'Bergamo', 'Brescia', 'Como'],
    Lazio: ['Rome', 'Latina', 'Fiumicino', 'Tivoli'],
    Campania: ['Naples', 'Salerno', 'Caserta', 'Torre del Greco'],
    Sicily: ['Palermo', 'Catania', 'Messina', 'Syracuse'],
    Veneto: ['Venice', 'Verona', 'Padua', 'Vicenza'],
  },
  Spain: {
    Andalusia: ['Seville', 'Málaga', 'Córdoba', 'Granada'],
    Catalonia: ['Barcelona', 'Girona', 'Lleida', 'Tarragona'],
    Madrid: ['Madrid', 'Móstoles', 'Alcalá de Henares'],
    Valencia: ['Valencia', 'Alicante', 'Elche', 'Castellón'],
    'Basque Country': ['Bilbao', 'Vitoria-Gasteiz', 'San Sebastián'],
  },
  Russia: {
    'Moscow Oblast': ['Moscow', 'Khimki', 'Podolsk', 'Korolyov'],
    'Saint Petersburg': ['Saint Petersburg', 'Kolpino', 'Pushkin'],
    'Krasnodar Krai': ['Krasnodar', 'Sochi', 'Novorossiysk'],
    'Rostov Oblast': ['Rostov-on-Don', 'Taganrog', 'Shakhty'],
  },
  Georgia: {
    Tbilisi: ['Tbilisi', 'Rustavi', 'Gori'],
    Adjara: ['Batumi', 'Kobuleti', 'Poti'],
    Imereti: ['Kutaisi', 'Zestafoni', 'Samtredia'],
    Kakheti: ['Telavi', 'Sagarejo', 'Gurjaani'],
  },
  Turkey: {
    Istanbul: ['Istanbul', 'Beylikdüzü', 'Kadıköy'],
    Ankara: ['Ankara', 'Etimesgut', 'Keçiören'],
    Izmir: ['Izmir', 'Bornova', 'Karşıyaka'],
    Bursa: ['Bursa', 'Nilüfer', 'Osmangazi'],
    Antalya: ['Antalya', 'Muratpaşa', 'Kepez'],
  },
};

export default class LocationSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const locationRepo = dataSource.getRepository(Location);
    const countryMap = new Map<string, number>();
    const stateMap = new Map<string, number>();

    // Step 1: Create all countries
    console.log('🌍 Creating countries...');
    for (const countryData of countries) {
      const existing = await locationRepo.findOne({
        where: { name: countryData.name, type: LocationType.COUNTRY },
      });

      if (!existing) {
        const country = locationRepo.create({
          name: countryData.name,
          type: LocationType.COUNTRY,
          parentId: null,
        });
        const saved = await locationRepo.save(country);
        countryMap.set(countryData.name, saved.id);
        console.log(`✅ Created country: ${countryData.name}`);
      } else {
        countryMap.set(countryData.name, existing.id);
        console.log(`⏭️  Country already exists: ${countryData.name}`);
      }
    }

    // Step 2: Create states for Armenia
    console.log('🏛️ Creating states for Armenia...');
    const armeniaId = countryMap.get('Armenia');
    if (armeniaId) {
      for (const stateName of armeniaStates) {
        const existing = await locationRepo.findOne({
          where: {
            name: stateName,
            type: LocationType.STATE,
            parentId: armeniaId,
          },
        });

        if (!existing) {
          const state = locationRepo.create({
            name: stateName,
            type: LocationType.STATE,
            parentId: armeniaId,
          });
          const saved = await locationRepo.save(state);
          stateMap.set(`Armenia-${stateName}`, saved.id);
          console.log(`✅ Created state: ${stateName} (Armenia)`);
        } else {
          stateMap.set(`Armenia-${stateName}`, existing.id);
        }
      }
    }

    // Step 3: Create states for USA
    console.log('🏛️ Creating states for USA...');
    const usaId = countryMap.get('United States');
    if (usaId) {
      for (const stateName of usaStates) {
        const existing = await locationRepo.findOne({
          where: {
            name: stateName,
            type: LocationType.STATE,
            parentId: usaId,
          },
        });

        if (!existing) {
          const state = locationRepo.create({
            name: stateName,
            type: LocationType.STATE,
            parentId: usaId,
          });
          const saved = await locationRepo.save(state);
          stateMap.set(`United States-${stateName}`, saved.id);
          console.log(`✅ Created state: ${stateName} (USA)`);
        } else {
          stateMap.set(`United States-${stateName}`, existing.id);
        }
      }
    }

    // Step 4: Create states for other countries
    const otherCountriesStates: Record<string, string[]> = {
      'United Kingdom': ukRegions,
      France: franceRegions,
      Germany: germanyStates,
      Italy: italyRegions,
      Spain: spainRegions,
    };

    for (const [countryName, states] of Object.entries(otherCountriesStates)) {
      const countryId = countryMap.get(countryName);
      if (countryId) {
        console.log(`🏛️ Creating states for ${countryName}...`);
        for (const stateName of states) {
          const existing = await locationRepo.findOne({
            where: {
              name: stateName,
              type: LocationType.STATE,
              parentId: countryId,
            },
          });

          if (!existing) {
            const state = locationRepo.create({
              name: stateName,
              type: LocationType.STATE,
              parentId: countryId,
            });
            const saved = await locationRepo.save(state);
            stateMap.set(`${countryName}-${stateName}`, saved.id);
            console.log(`✅ Created state: ${stateName} (${countryName})`);
          } else {
            stateMap.set(`${countryName}-${stateName}`, existing.id);
          }
        }
      }
    }

    // Step 5: Create cities
    console.log('🏙️ Creating cities...');
    for (const [countryName, statesObj] of Object.entries(citiesData)) {
      for (const [stateName, cities] of Object.entries(statesObj)) {
        const stateId = stateMap.get(`${countryName}-${stateName}`);
        if (stateId) {
          for (const cityName of cities) {
            const existing = await locationRepo.findOne({
              where: {
                name: cityName,
                type: LocationType.CITY,
                parentId: stateId,
              },
            });

            if (!existing) {
              const city = locationRepo.create({
                name: cityName,
                type: LocationType.CITY,
                parentId: stateId,
              });
              await locationRepo.save(city);
              console.log(
                `✅ Created city: ${cityName} (${stateName}, ${countryName})`,
              );
            }
          }
        }
      }
    }

    console.log('🎉 Location seeding completed!');
  }
}
