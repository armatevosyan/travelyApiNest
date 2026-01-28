"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const location_entity_1 = require("../../modules/locations/location.entity");
const file_entity_1 = require("../../modules/files/entities/file.entity");
const countries = [
    { name: 'Armenia', type: location_entity_1.LocationType.COUNTRY },
    { name: 'United States', type: location_entity_1.LocationType.COUNTRY },
    { name: 'United Kingdom', type: location_entity_1.LocationType.COUNTRY },
    { name: 'France', type: location_entity_1.LocationType.COUNTRY },
    { name: 'Germany', type: location_entity_1.LocationType.COUNTRY },
    { name: 'Italy', type: location_entity_1.LocationType.COUNTRY },
    { name: 'Spain', type: location_entity_1.LocationType.COUNTRY },
    { name: 'Russia', type: location_entity_1.LocationType.COUNTRY },
    { name: 'Georgia', type: location_entity_1.LocationType.COUNTRY },
    { name: 'Turkey', type: location_entity_1.LocationType.COUNTRY },
    { name: 'Greece', type: location_entity_1.LocationType.COUNTRY },
    { name: 'Netherlands', type: location_entity_1.LocationType.COUNTRY },
    { name: 'Belgium', type: location_entity_1.LocationType.COUNTRY },
    { name: 'Switzerland', type: location_entity_1.LocationType.COUNTRY },
    { name: 'Austria', type: location_entity_1.LocationType.COUNTRY },
    { name: 'Poland', type: location_entity_1.LocationType.COUNTRY },
    { name: 'Czech Republic', type: location_entity_1.LocationType.COUNTRY },
    { name: 'Portugal', type: location_entity_1.LocationType.COUNTRY },
    { name: 'Ireland', type: location_entity_1.LocationType.COUNTRY },
    { name: 'Sweden', type: location_entity_1.LocationType.COUNTRY },
    { name: 'Norway', type: location_entity_1.LocationType.COUNTRY },
    { name: 'Denmark', type: location_entity_1.LocationType.COUNTRY },
    { name: 'Finland', type: location_entity_1.LocationType.COUNTRY },
    { name: 'Japan', type: location_entity_1.LocationType.COUNTRY },
    { name: 'China', type: location_entity_1.LocationType.COUNTRY },
    { name: 'India', type: location_entity_1.LocationType.COUNTRY },
    { name: 'United Arab Emirates', type: location_entity_1.LocationType.COUNTRY },
    { name: 'Saudi Arabia', type: location_entity_1.LocationType.COUNTRY },
    { name: 'Israel', type: location_entity_1.LocationType.COUNTRY },
    { name: 'Canada', type: location_entity_1.LocationType.COUNTRY },
    { name: 'Mexico', type: location_entity_1.LocationType.COUNTRY },
    { name: 'Brazil', type: location_entity_1.LocationType.COUNTRY },
    { name: 'Argentina', type: location_entity_1.LocationType.COUNTRY },
    { name: 'Australia', type: location_entity_1.LocationType.COUNTRY },
    { name: 'New Zealand', type: location_entity_1.LocationType.COUNTRY },
    { name: 'South Korea', type: location_entity_1.LocationType.COUNTRY },
    { name: 'Thailand', type: location_entity_1.LocationType.COUNTRY },
    { name: 'Singapore', type: location_entity_1.LocationType.COUNTRY },
    { name: 'Malaysia', type: location_entity_1.LocationType.COUNTRY },
    { name: 'Indonesia', type: location_entity_1.LocationType.COUNTRY },
    { name: 'Philippines', type: location_entity_1.LocationType.COUNTRY },
    { name: 'Vietnam', type: location_entity_1.LocationType.COUNTRY },
    { name: 'Egypt', type: location_entity_1.LocationType.COUNTRY },
    { name: 'South Africa', type: location_entity_1.LocationType.COUNTRY },
];
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
const ukRegions = ['England', 'Scotland', 'Wales', 'Northern Ireland'];
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
const russiaRegions = [
    'Moscow Oblast',
    'Saint Petersburg',
    'Krasnodar Krai',
    'Rostov Oblast',
    'Novosibirsk Oblast',
    'Yekaterinburg Oblast',
    'Nizhny Novgorod Oblast',
    'Kazan Oblast',
    'Chelyabinsk Oblast',
    'Omsk Oblast',
];
const georgiaRegions = [
    'Tbilisi',
    'Adjara',
    'Imereti',
    'Kakheti',
    'Samegrelo-Zemo Svaneti',
    'Guria',
    'Racha-Lechkhumi and Kvemo Svaneti',
    'Samtskhe-Javakheti',
    'Mtskheta-Mtianeti',
    'Shida Kartli',
];
const turkeyProvinces = [
    'Istanbul',
    'Ankara',
    'Izmir',
    'Bursa',
    'Antalya',
    'Adana',
    'Konya',
    'Gaziantep',
    'Mersin',
    'Diyarbakır',
];
const citiesData = {
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
        Washington: ['Seattle', 'Spokane', 'Tacoma', 'Vancouver', 'Bellevue'],
        Massachusetts: [
            'Boston',
            'Worcester',
            'Springfield',
            'Cambridge',
            'Lowell',
        ],
        Arizona: ['Phoenix', 'Tucson', 'Mesa', 'Chandler', 'Scottsdale'],
        Tennessee: [
            'Nashville',
            'Memphis',
            'Knoxville',
            'Chattanooga',
            'Murfreesboro',
        ],
        Indiana: [
            'Indianapolis',
            'Fort Wayne',
            'Evansville',
            'South Bend',
            'Carmel',
        ],
        Missouri: [
            'Kansas City',
            'St. Louis',
            'Springfield',
            'Columbia',
            'Independence',
        ],
        Maryland: ['Baltimore', 'Frederick', 'Rockville', 'Gaithersburg', 'Bowie'],
        Wisconsin: ['Milwaukee', 'Madison', 'Green Bay', 'Kenosha', 'Racine'],
        Colorado: [
            'Denver',
            'Colorado Springs',
            'Aurora',
            'Fort Collins',
            'Lakewood',
        ],
        Minnesota: [
            'Minneapolis',
            'St. Paul',
            'Rochester',
            'Duluth',
            'Bloomington',
        ],
        'South Carolina': [
            'Charleston',
            'Columbia',
            'North Charleston',
            'Mount Pleasant',
            'Rock Hill',
        ],
        Alabama: ['Birmingham', 'Montgomery', 'Mobile', 'Huntsville', 'Tuscaloosa'],
        Louisiana: [
            'New Orleans',
            'Baton Rouge',
            'Shreveport',
            'Lafayette',
            'Lake Charles',
        ],
        Kentucky: [
            'Louisville',
            'Lexington',
            'Bowling Green',
            'Owensboro',
            'Covington',
        ],
        Oregon: ['Portland', 'Eugene', 'Salem', 'Gresham', 'Hillsboro'],
        Oklahoma: ['Oklahoma City', 'Tulsa', 'Norman', 'Broken Arrow', 'Lawton'],
        Connecticut: [
            'Bridgeport',
            'New Haven',
            'Hartford',
            'Stamford',
            'Waterbury',
        ],
        Iowa: [
            'Des Moines',
            'Cedar Rapids',
            'Davenport',
            'Sioux City',
            'Iowa City',
        ],
        Mississippi: ['Jackson', 'Gulfport', 'Southaven', 'Hattiesburg', 'Biloxi'],
        Arkansas: [
            'Little Rock',
            'Fort Smith',
            'Fayetteville',
            'Springdale',
            'Jonesboro',
        ],
        Kansas: ['Wichita', 'Overland Park', 'Kansas City', 'Olathe', 'Topeka'],
        Utah: [
            'Salt Lake City',
            'West Valley City',
            'Provo',
            'West Jordan',
            'Orem',
        ],
        Nevada: ['Las Vegas', 'Henderson', 'Reno', 'North Las Vegas', 'Sparks'],
        'New Mexico': [
            'Albuquerque',
            'Las Cruces',
            'Rio Rancho',
            'Santa Fe',
            'Roswell',
        ],
        Nebraska: ['Omaha', 'Lincoln', 'Bellevue', 'Grand Island', 'Kearney'],
        'West Virginia': [
            'Charleston',
            'Huntington',
            'Parkersburg',
            'Morgantown',
            'Wheeling',
        ],
        Idaho: ['Boise', 'Nampa', 'Meridian', 'Idaho Falls', 'Pocatello'],
        Hawaii: ['Honolulu', 'Pearl City', 'Hilo', 'Kailua', 'Kaneohe'],
        'New Hampshire': ['Manchester', 'Nashua', 'Concord', 'Derry', 'Rochester'],
        Maine: ['Portland', 'Lewiston', 'Bangor', 'South Portland', 'Auburn'],
        Montana: ['Billings', 'Missoula', 'Great Falls', 'Bozeman', 'Butte'],
        'Rhode Island': [
            'Providence',
            'Warwick',
            'Cranston',
            'Pawtucket',
            'East Providence',
        ],
        Delaware: ['Wilmington', 'Dover', 'Newark', 'Middletown', 'Smyrna'],
        'South Dakota': [
            'Sioux Falls',
            'Rapid City',
            'Aberdeen',
            'Brookings',
            'Watertown',
        ],
        'North Dakota': ['Fargo', 'Bismarck', 'Grand Forks', 'Minot', 'West Fargo'],
        Alaska: ['Anchorage', 'Fairbanks', 'Juneau', 'Sitka', 'Wasilla'],
        Vermont: [
            'Burlington',
            'Essex',
            'South Burlington',
            'Colchester',
            'Montpelier',
        ],
        Wyoming: ['Cheyenne', 'Casper', 'Laramie', 'Gillette', 'Rock Springs'],
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
        'Hauts-de-France': ['Lille', 'Amiens', 'Roubaix', 'Tourcoing', 'Dunkirk'],
        'Grand Est': ['Strasbourg', 'Reims', 'Metz', 'Nancy', 'Mulhouse'],
        Normandy: ['Rouen', 'Caen', 'Le Havre', 'Cherbourg', 'Évreux'],
        Brittany: ['Rennes', 'Brest', 'Quimper', 'Lorient', 'Vannes'],
        'Pays de la Loire': [
            'Nantes',
            'Le Mans',
            'Angers',
            'Saint-Nazaire',
            'La Roche-sur-Yon',
        ],
    },
    Germany: {
        Bavaria: ['Munich', 'Nuremberg', 'Augsburg', 'Regensburg'],
        'Baden-Württemberg': ['Stuttgart', 'Mannheim', 'Karlsruhe', 'Freiburg'],
        Berlin: ['Berlin'],
        'North Rhine-Westphalia': ['Cologne', 'Düsseldorf', 'Dortmund', 'Essen'],
        Hesse: ['Frankfurt', 'Wiesbaden', 'Kassel', 'Darmstadt'],
        'Lower Saxony': ['Hanover', 'Braunschweig', 'Oldenburg', 'Osnabrück'],
        Brandenburg: ['Potsdam', 'Cottbus', 'Brandenburg', 'Frankfurt'],
        Bremen: ['Bremen', 'Bremerhaven'],
        Hamburg: ['Hamburg'],
        'Mecklenburg-Vorpommern': [
            'Rostock',
            'Schwerin',
            'Neubrandenburg',
            'Stralsund',
        ],
        'Rhineland-Palatinate': ['Mainz', 'Ludwigshafen', 'Koblenz', 'Trier'],
        Saarland: ['Saarbrücken', 'Neunkirchen', 'Homburg', 'Völklingen'],
        Saxony: ['Dresden', 'Leipzig', 'Chemnitz', 'Zwickau'],
        'Saxony-Anhalt': ['Magdeburg', 'Halle', 'Dessau', 'Wittenberg'],
        'Schleswig-Holstein': ['Kiel', 'Lübeck', 'Flensburg', 'Neumünster'],
        Thuringia: ['Erfurt', 'Jena', 'Gera', 'Weimar'],
    },
    Italy: {
        Lombardy: ['Milan', 'Bergamo', 'Brescia', 'Como'],
        Lazio: ['Rome', 'Latina', 'Fiumicino', 'Tivoli'],
        Campania: ['Naples', 'Salerno', 'Caserta', 'Torre del Greco'],
        Sicily: ['Palermo', 'Catania', 'Messina', 'Syracuse'],
        Veneto: ['Venice', 'Verona', 'Padua', 'Vicenza'],
        'Emilia-Romagna': ['Bologna', 'Modena', 'Parma', 'Reggio Emilia'],
        Piedmont: ['Turin', 'Alessandria', 'Asti', 'Novara'],
        Apulia: ['Bari', 'Taranto', 'Foggia', 'Lecce'],
        Tuscany: ['Florence', 'Pisa', 'Livorno', 'Arezzo'],
        Calabria: ['Reggio Calabria', 'Catanzaro', 'Cosenza', 'Lamezia Terme'],
    },
    Spain: {
        Andalusia: ['Seville', 'Málaga', 'Córdoba', 'Granada'],
        Catalonia: ['Barcelona', 'Girona', 'Lleida', 'Tarragona'],
        Madrid: ['Madrid', 'Móstoles', 'Alcalá de Henares'],
        Valencia: ['Valencia', 'Alicante', 'Elche', 'Castellón'],
        'Basque Country': ['Bilbao', 'Vitoria-Gasteiz', 'San Sebastián'],
        'Castile and León': ['Valladolid', 'Burgos', 'Salamanca', 'León'],
        Galicia: ['Vigo', 'A Coruña', 'Ourense', 'Santiago de Compostela'],
        'Canary Islands': [
            'Las Palmas',
            'Santa Cruz de Tenerife',
            'San Cristóbal de La Laguna',
        ],
        'Castile-La Mancha': ['Toledo', 'Albacete', 'Ciudad Real', 'Guadalajara'],
        Murcia: ['Murcia', 'Cartagena', 'Lorca', 'Molina de Segura'],
    },
    Russia: {
        'Moscow Oblast': ['Moscow', 'Khimki', 'Podolsk', 'Korolyov'],
        'Saint Petersburg': ['Saint Petersburg', 'Kolpino', 'Pushkin'],
        'Krasnodar Krai': ['Krasnodar', 'Sochi', 'Novorossiysk'],
        'Rostov Oblast': ['Rostov-on-Don', 'Taganrog', 'Shakhty'],
        'Novosibirsk Oblast': ['Novosibirsk', 'Berdsk', 'Iskitim', 'Kuybyshev'],
        'Yekaterinburg Oblast': [
            'Yekaterinburg',
            'Nizhny Tagil',
            'Kamensk-Uralsky',
            'Pervouralsk',
        ],
        'Nizhny Novgorod Oblast': [
            'Nizhny Novgorod',
            'Dzerzhinsk',
            'Arzamas',
            'Sarov',
        ],
        'Kazan Oblast': [
            'Kazan',
            'Naberezhnye Chelny',
            'Almetyevsk',
            'Nizhnekamsk',
        ],
        'Chelyabinsk Oblast': ['Chelyabinsk', 'Magnitogorsk', 'Zlatoust', 'Miass'],
        'Omsk Oblast': ['Omsk', 'Tara', 'Kalachinsk', 'Iskitim'],
    },
    Georgia: {
        Tbilisi: ['Tbilisi', 'Rustavi', 'Gori'],
        Adjara: ['Batumi', 'Kobuleti', 'Poti'],
        Imereti: ['Kutaisi', 'Zestafoni', 'Samtredia'],
        Kakheti: ['Telavi', 'Sagarejo', 'Gurjaani'],
        'Samegrelo-Zemo Svaneti': ['Zugdidi', 'Senaki', 'Chkhorotsqu', 'Abasha'],
        Guria: ['Ozurgeti', 'Lanchkhuti', 'Chokhatauri', 'Kveda Nasakirali'],
        'Racha-Lechkhumi and Kvemo Svaneti': [
            'Ambrolauri',
            'Oni',
            'Tsageri',
            'Lentekhi',
        ],
        'Samtskhe-Javakheti': [
            'Akhaltsikhe',
            'Borjomi',
            'Akhalkalaki',
            'Ninotsminda',
        ],
        'Mtskheta-Mtianeti': ['Mtskheta', 'Dusheti', 'Kazbegi', 'Stepantsminda'],
        'Shida Kartli': ['Gori', 'Khashuri', 'Kareli', 'Kaspi'],
    },
    Turkey: {
        Istanbul: ['Istanbul', 'Beylikdüzü', 'Kadıköy'],
        Ankara: ['Ankara', 'Etimesgut', 'Keçiören'],
        Izmir: ['Izmir', 'Bornova', 'Karşıyaka'],
        Bursa: ['Bursa', 'Nilüfer', 'Osmangazi'],
        Antalya: ['Antalya', 'Muratpaşa', 'Kepez'],
        Adana: ['Adana', 'Seyhan', 'Çukurova', 'Yüreğir'],
        Konya: ['Konya', 'Selçuklu', 'Karatay', 'Meram'],
        Gaziantep: ['Gaziantep', 'Şahinbey', 'Şehitkamil', 'Oğuzeli'],
        Mersin: ['Mersin', 'Yenişehir', 'Toroslar', 'Akdeniz'],
        Diyarbakır: ['Diyarbakır', 'Bağlar', 'Kayapınar', 'Yenişehir'],
    },
};
const countryCodeMap = {
    Armenia: 'am',
    'United States': 'us',
    'United Kingdom': 'gb',
    France: 'fr',
    Germany: 'de',
    Italy: 'it',
    Spain: 'es',
    Russia: 'ru',
    Georgia: 'ge',
    Turkey: 'tr',
    Greece: 'gr',
    Netherlands: 'nl',
    Belgium: 'be',
    Switzerland: 'ch',
    Austria: 'at',
    Poland: 'pl',
    'Czech Republic': 'cz',
    Portugal: 'pt',
    Ireland: 'ie',
    Sweden: 'se',
    Norway: 'no',
    Denmark: 'dk',
    Finland: 'fi',
    Japan: 'jp',
    China: 'cn',
    India: 'in',
    'United Arab Emirates': 'ae',
    'Saudi Arabia': 'sa',
    Israel: 'il',
    Canada: 'ca',
    Mexico: 'mx',
    Brazil: 'br',
    Argentina: 'ar',
    Australia: 'au',
    'New Zealand': 'nz',
    'South Korea': 'kr',
    Thailand: 'th',
    Singapore: 'sg',
    Malaysia: 'my',
    Indonesia: 'id',
    Philippines: 'ph',
    Vietnam: 'vn',
    Egypt: 'eg',
    'South Africa': 'za',
};
const getCountryImageUrl = (countryName) => {
    const countryCode = countryCodeMap[countryName] || 'xx';
    return `https://flagcdn.com/w320/${countryCode}.png`;
};
class LocationSeeder {
    async run(dataSource) {
        const locationRepo = dataSource.getRepository(location_entity_1.Location);
        const fileRepo = dataSource.getRepository(file_entity_1.FileEntity);
        const countryMap = new Map();
        const stateMap = new Map();
        const getOrCreateCountryImage = async (countryName) => {
            try {
                const existingFile = await fileRepo.findOne({
                    where: {
                        fileName: `country-${countryName.toLowerCase().replace(/\s+/g, '-')}.png`,
                    },
                });
                if (existingFile) {
                    return existingFile.id;
                }
                const imageUrl = getCountryImageUrl(countryName);
                const file = fileRepo.create({
                    fileName: `country-${countryName.toLowerCase().replace(/\s+/g, '-')}.png`,
                    mimeType: 'image/png',
                    size: 0,
                    bucketPath: `countries/${countryName.toLowerCase().replace(/\s+/g, '-')}.png`,
                    url: imageUrl,
                    userId: null,
                });
                const savedFile = await fileRepo.save(file);
                return savedFile.id;
            }
            catch (error) {
                console.warn(`⚠️  Could not create image for ${countryName}:`, error);
                return null;
            }
        };
        console.log('🌍 Creating countries...');
        for (const countryData of countries) {
            const existing = await locationRepo.findOne({
                where: { name: countryData.name, type: location_entity_1.LocationType.COUNTRY },
                relations: ['image'],
            });
            if (!existing) {
                const imageId = await getOrCreateCountryImage(countryData.name);
                const country = locationRepo.create({
                    name: countryData.name,
                    type: location_entity_1.LocationType.COUNTRY,
                    parentId: null,
                    imageId: imageId,
                });
                const saved = await locationRepo.save(country);
                countryMap.set(countryData.name, saved.id);
                console.log(`✅ Created country: ${countryData.name}${imageId ? ' with image' : ''}`);
            }
            else {
                if (!existing.imageId) {
                    const imageId = await getOrCreateCountryImage(countryData.name);
                    if (imageId) {
                        existing.imageId = imageId;
                        await locationRepo.save(existing);
                        console.log(`✅ Added image to existing country: ${countryData.name}`);
                    }
                }
                countryMap.set(countryData.name, existing.id);
                console.log(`⏭️  Country already exists: ${countryData.name}`);
            }
        }
        console.log('🏛️ Creating states for Armenia...');
        const armeniaId = countryMap.get('Armenia');
        if (armeniaId) {
            for (const stateName of armeniaStates) {
                const existing = await locationRepo.findOne({
                    where: {
                        name: stateName,
                        type: location_entity_1.LocationType.STATE,
                        parentId: armeniaId,
                    },
                });
                if (!existing) {
                    const state = locationRepo.create({
                        name: stateName,
                        type: location_entity_1.LocationType.STATE,
                        parentId: armeniaId,
                    });
                    const saved = await locationRepo.save(state);
                    stateMap.set(`Armenia-${stateName}`, saved.id);
                    console.log(`✅ Created state: ${stateName} (Armenia)`);
                }
                else {
                    stateMap.set(`Armenia-${stateName}`, existing.id);
                }
            }
        }
        console.log('🏛️ Creating states for USA...');
        const usaId = countryMap.get('United States');
        if (usaId) {
            for (const stateName of usaStates) {
                const existing = await locationRepo.findOne({
                    where: {
                        name: stateName,
                        type: location_entity_1.LocationType.STATE,
                        parentId: usaId,
                    },
                });
                if (!existing) {
                    const state = locationRepo.create({
                        name: stateName,
                        type: location_entity_1.LocationType.STATE,
                        parentId: usaId,
                    });
                    const saved = await locationRepo.save(state);
                    stateMap.set(`United States-${stateName}`, saved.id);
                    console.log(`✅ Created state: ${stateName} (USA)`);
                }
                else {
                    stateMap.set(`United States-${stateName}`, existing.id);
                }
            }
        }
        const otherCountriesStates = {
            'United Kingdom': ukRegions,
            France: franceRegions,
            Germany: germanyStates,
            Italy: italyRegions,
            Spain: spainRegions,
            Russia: russiaRegions,
            Georgia: georgiaRegions,
            Turkey: turkeyProvinces,
        };
        for (const [countryName, states] of Object.entries(otherCountriesStates)) {
            const countryId = countryMap.get(countryName);
            if (countryId) {
                console.log(`🏛️ Creating states for ${countryName}...`);
                for (const stateName of states) {
                    const existing = await locationRepo.findOne({
                        where: {
                            name: stateName,
                            type: location_entity_1.LocationType.STATE,
                            parentId: countryId,
                        },
                    });
                    if (!existing) {
                        const state = locationRepo.create({
                            name: stateName,
                            type: location_entity_1.LocationType.STATE,
                            parentId: countryId,
                        });
                        const saved = await locationRepo.save(state);
                        stateMap.set(`${countryName}-${stateName}`, saved.id);
                        console.log(`✅ Created state: ${stateName} (${countryName})`);
                    }
                    else {
                        stateMap.set(`${countryName}-${stateName}`, existing.id);
                    }
                }
            }
        }
        console.log('🏙️ Creating cities...');
        for (const [countryName, statesObj] of Object.entries(citiesData)) {
            for (const [stateName, cities] of Object.entries(statesObj)) {
                const stateId = stateMap.get(`${countryName}-${stateName}`);
                if (stateId) {
                    for (const cityName of cities) {
                        const existing = await locationRepo.findOne({
                            where: {
                                name: cityName,
                                type: location_entity_1.LocationType.CITY,
                                parentId: stateId,
                            },
                        });
                        if (!existing) {
                            const city = locationRepo.create({
                                name: cityName,
                                type: location_entity_1.LocationType.CITY,
                                parentId: stateId,
                            });
                            await locationRepo.save(city);
                            console.log(`✅ Created city: ${cityName} (${stateName}, ${countryName})`);
                        }
                    }
                }
            }
        }
        console.log('🎉 Location seeding completed!');
    }
}
exports.default = LocationSeeder;
//# sourceMappingURL=location.seed.js.map