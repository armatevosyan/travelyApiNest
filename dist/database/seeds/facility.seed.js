"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const facility_entity_1 = require("../../modules/facilities/facility.entity");
class FacilitySeeder {
    async run(dataSource) {
        const facilityRepository = dataSource.getRepository(facility_entity_1.Facility);
        const existingCount = await facilityRepository.count();
        if (existingCount > 0) {
            console.log('✓ Facilities already seeded, skipping...');
            return;
        }
        const facilities = [
            {
                name: 'Free WiFi',
                icon: 'wifi',
                description: 'High-speed wireless internet access',
            },
            {
                name: 'Computer Station',
                icon: 'desktop-outline',
                description: 'Public computers available for use',
            },
            {
                name: 'Charging Stations',
                icon: 'battery-charging-outline',
                description: 'Device charging points available',
            },
            {
                name: 'Wheelchair Accessible',
                icon: 'wheelchair-outline',
                description: 'Fully accessible for wheelchair users',
            },
            {
                name: 'Elevator',
                icon: 'arrow-up-outline',
                description: 'Elevator access to all floors',
            },
            {
                name: 'Accessible Parking',
                icon: 'car-outline',
                description: 'Designated accessible parking spaces',
            },
            {
                name: 'Braille Signage',
                icon: 'hand-left-outline',
                description: 'Braille information and signage',
            },
            {
                name: 'Free Parking',
                icon: 'car-sport-outline',
                description: 'Complimentary parking available',
            },
            {
                name: 'Paid Parking',
                icon: 'card-outline',
                description: 'Paid parking facilities on-site',
            },
            {
                name: 'Valet Parking',
                icon: 'key-outline',
                description: 'Valet parking service available',
            },
            {
                name: 'Bike Parking',
                icon: 'bicycle-outline',
                description: 'Bicycle parking and storage',
            },
            {
                name: 'Credit Cards Accepted',
                icon: 'card-outline',
                description: 'Major credit cards accepted',
            },
            {
                name: 'Cash Only',
                icon: 'cash-outline',
                description: 'Cash payments only',
            },
            {
                name: 'Contactless Payment',
                icon: 'phone-portrait-outline',
                description: 'NFC and mobile payment options',
            },
            {
                name: 'ATM',
                icon: 'cash-outline',
                description: 'ATM machine on premises',
            },
            {
                name: 'Restaurant',
                icon: 'restaurant-outline',
                description: 'On-site dining restaurant',
            },
            {
                name: 'Bar',
                icon: 'beer-outline',
                description: 'Bar or lounge area',
            },
            {
                name: 'Cafe',
                icon: 'cafe-outline',
                description: 'Coffee shop or cafe',
            },
            {
                name: 'Breakfast Included',
                icon: 'sunny-outline',
                description: 'Complimentary breakfast service',
            },
            {
                name: 'Room Service',
                icon: 'fast-food-outline',
                description: 'In-room dining available',
            },
            {
                name: 'Kitchen',
                icon: 'flame-outline',
                description: 'Kitchen facilities available',
            },
            {
                name: 'Air Conditioning',
                icon: 'snow-outline',
                description: 'Air conditioning in all areas',
            },
            {
                name: 'Heating',
                icon: 'flame-outline',
                description: 'Central heating available',
            },
            {
                name: 'TV',
                icon: 'tv-outline',
                description: 'Television in rooms',
            },
            {
                name: 'Safe',
                icon: 'lock-closed-outline',
                description: 'In-room safe for valuables',
            },
            {
                name: 'Mini Bar',
                icon: 'wine-outline',
                description: 'Mini bar with refreshments',
            },
            {
                name: 'Balcony',
                icon: 'home-outline',
                description: 'Private balcony or terrace',
            },
            {
                name: 'Swimming Pool',
                icon: 'water-outline',
                description: 'Swimming pool facilities',
            },
            {
                name: 'Gym/Fitness Center',
                icon: 'fitness-outline',
                description: 'Fitness and exercise facilities',
            },
            {
                name: 'Spa',
                icon: 'flower-outline',
                description: 'Spa and wellness center',
            },
            {
                name: 'Sauna',
                icon: 'thermometer-outline',
                description: 'Sauna facilities',
            },
            {
                name: 'Hot Tub/Jacuzzi',
                icon: 'water-outline',
                description: 'Hot tub or jacuzzi available',
            },
            {
                name: 'Garden',
                icon: 'leaf-outline',
                description: 'Garden or outdoor space',
            },
            {
                name: 'Playground',
                icon: 'happy-outline',
                description: "Children's play area",
            },
            {
                name: 'Game Room',
                icon: 'game-controller-outline',
                description: 'Recreation and game room',
            },
            {
                name: 'Library',
                icon: 'library-outline',
                description: 'Library or reading room',
            },
            {
                name: 'Meeting Rooms',
                icon: 'people-outline',
                description: 'Conference and meeting facilities',
            },
            {
                name: 'Business Center',
                icon: 'briefcase-outline',
                description: 'Business services and facilities',
            },
            {
                name: 'Projector/AV Equipment',
                icon: 'easel-outline',
                description: 'Presentation and AV equipment',
            },
            {
                name: 'Printing Services',
                icon: 'print-outline',
                description: 'Printing and copying services',
            },
            {
                name: '24-Hour Front Desk',
                icon: 'time-outline',
                description: '24-hour reception service',
            },
            {
                name: 'Concierge',
                icon: 'person-outline',
                description: 'Concierge service available',
            },
            {
                name: 'Luggage Storage',
                icon: 'bag-handle-outline',
                description: 'Secure luggage storage',
            },
            {
                name: 'Laundry Service',
                icon: 'shirt-outline',
                description: 'Laundry and dry cleaning',
            },
            {
                name: 'Housekeeping',
                icon: 'home-outline',
                description: 'Daily housekeeping service',
            },
            {
                name: 'Shuttle Service',
                icon: 'bus-outline',
                description: 'Airport or local shuttle',
            },
            {
                name: 'Car Rental',
                icon: 'car-outline',
                description: 'Car rental services',
            },
            {
                name: 'Tour Desk',
                icon: 'map-outline',
                description: 'Tour booking and information',
            },
            {
                name: 'Currency Exchange',
                icon: 'cash-outline',
                description: 'Currency exchange service',
            },
            {
                name: 'Family Rooms',
                icon: 'people-outline',
                description: 'Family-friendly accommodations',
            },
            {
                name: 'Kids Menu',
                icon: 'ice-cream-outline',
                description: "Children's menu available",
            },
            {
                name: 'Babysitting',
                icon: 'person-outline',
                description: 'Childcare services available',
            },
            {
                name: 'High Chairs',
                icon: 'restaurant-outline',
                description: 'High chairs for children',
            },
            {
                name: 'Pet Friendly',
                icon: 'paw-outline',
                description: 'Pets allowed with restrictions',
            },
            {
                name: 'Pet Care Services',
                icon: 'heart-outline',
                description: 'Pet sitting and care services',
            },
            {
                name: 'Security Guards',
                icon: 'shield-checkmark-outline',
                description: '24/7 security personnel',
            },
            {
                name: 'CCTV',
                icon: 'videocam-outline',
                description: 'Security camera monitoring',
            },
            {
                name: 'Fire Safety Equipment',
                icon: 'flame-outline',
                description: 'Fire extinguishers and safety',
            },
            {
                name: 'First Aid',
                icon: 'medkit-outline',
                description: 'First aid facilities available',
            },
            {
                name: 'Smoke Detectors',
                icon: 'alert-circle-outline',
                description: 'Smoke detection system',
            },
            {
                name: 'Outdoor Seating',
                icon: 'partly-sunny-outline',
                description: 'Outdoor dining area',
            },
            {
                name: 'Private Dining',
                icon: 'star-outline',
                description: 'Private dining rooms',
            },
            {
                name: 'Live Music',
                icon: 'musical-notes-outline',
                description: 'Live entertainment',
            },
            {
                name: 'Takeaway',
                icon: 'bag-outline',
                description: 'Takeout service available',
            },
            {
                name: 'Delivery',
                icon: 'bicycle-outline',
                description: 'Home delivery service',
            },
            {
                name: 'Reservations',
                icon: 'calendar-outline',
                description: 'Table reservations accepted',
            },
            {
                name: 'Beach Access',
                icon: 'beach-outline',
                description: 'Direct beach access',
            },
            {
                name: 'Waterfront',
                icon: 'water-outline',
                description: 'Waterfront location',
            },
            {
                name: 'Mountain View',
                icon: 'triangle-outline',
                description: 'Mountain views available',
            },
            {
                name: 'City View',
                icon: 'business-outline',
                description: 'City views available',
            },
            {
                name: 'Eco-Friendly',
                icon: 'leaf-outline',
                description: 'Environmentally sustainable',
            },
            {
                name: 'Smoking Area',
                icon: 'cloud-outline',
                description: 'Designated smoking area',
            },
            {
                name: 'Non-Smoking',
                icon: 'ban-outline',
                description: 'Non-smoking establishment',
            },
            {
                name: 'Alcohol Served',
                icon: 'wine-outline',
                description: 'Alcoholic beverages available',
            },
            {
                name: 'Halal Food',
                icon: 'restaurant-outline',
                description: 'Halal food options',
            },
            {
                name: 'Vegan Options',
                icon: 'nutrition-outline',
                description: 'Vegan menu items',
            },
            {
                name: 'Gluten-Free Options',
                icon: 'nutrition-outline',
                description: 'Gluten-free menu available',
            },
            {
                name: 'Cinema/Theater',
                icon: 'film-outline',
                description: 'Movie theater or cinema',
            },
            {
                name: 'Casino',
                icon: 'dice-outline',
                description: 'Casino or gaming facilities',
            },
            {
                name: 'Nightclub',
                icon: 'moon-outline',
                description: 'Nightclub or dance venue',
            },
            {
                name: 'Karaoke',
                icon: 'mic-outline',
                description: 'Karaoke facilities',
            },
            {
                name: 'Gift Shop',
                icon: 'gift-outline',
                description: 'On-site gift shop',
            },
            {
                name: 'Shopping Mall Access',
                icon: 'basket-outline',
                description: 'Connected to shopping mall',
            },
            {
                name: 'Yoga Classes',
                icon: 'body-outline',
                description: 'Yoga and meditation classes',
            },
            {
                name: 'Massage Services',
                icon: 'hand-right-outline',
                description: 'Massage and bodywork',
            },
            {
                name: 'Medical Services',
                icon: 'medical-outline',
                description: 'On-call medical assistance',
            },
        ];
        console.log('🌱 Seeding facilities...');
        const createdFacilities = await facilityRepository.save(facilities);
        console.log(`✓ Successfully seeded ${createdFacilities.length} facilities`);
    }
}
exports.default = FacilitySeeder;
//# sourceMappingURL=facility.seed.js.map