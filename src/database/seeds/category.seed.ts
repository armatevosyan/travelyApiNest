import { DataSource } from 'typeorm';
import { Category } from 'modules/categories/category.entity';
import { Seeder } from 'typeorm-extension';
import { MainCategoryEnum } from 'modules/categories/category.enum';

export const categorySeeds: Partial<Category>[] = [
  // Parent Categories
  {
    name: 'Food & Drink',
    slug: MainCategoryEnum.FOOD_AND_DRINK,
    description: 'All food and beverage establishments',
    icon: '🍽️',
    color: '#FF6B6B',
    isActive: true,
    isPro: false,
    sortOrder: 1,
    parentId: null,
  },
  {
    name: 'Accommodation',
    slug: MainCategoryEnum.ACCOMMODATION,
    description: 'Places to stay and sleep',
    icon: '🏨',
    color: '#4169E1',
    isActive: true,
    isPro: false,
    sortOrder: 2,
    parentId: null,
  },
  {
    name: 'Entertainment',
    slug: MainCategoryEnum.ENTERTAINMENT,
    description: 'Entertainment and leisure activities',
    icon: '🎭',
    color: '#9370DB',
    isActive: true,
    isPro: false,
    sortOrder: 3,
    parentId: null,
  },
  {
    name: 'Shopping',
    slug: MainCategoryEnum.SHOPPING,
    description: 'Shopping and retail',
    icon: '🛍️',
    color: '#FF69B4',
    isActive: true,
    isPro: false,
    sortOrder: 4,
    parentId: null,
  },
  {
    name: 'Transport',
    slug: MainCategoryEnum.TRANSPORT,
    description: 'Transportation and travel services',
    icon: '🚌',
    color: '#32CD32',
    isActive: true,
    isPro: false,
    sortOrder: 5,
    parentId: null,
  },
  {
    name: 'Health & Wellness',
    slug: MainCategoryEnum.HEALTH_AND_WELLNESS,
    description: 'Health, medical, and wellness services',
    icon: '🏥',
    color: '#DC143C',
    isActive: true,
    isPro: false,
    sortOrder: 6,
    parentId: null,
  },
  {
    name: 'Nature & Outdoors',
    slug: MainCategoryEnum.NATURE_AND_OUTDOORS,
    description: 'Natural attractions and outdoor activities',
    icon: '🌳',
    color: '#228B22',
    isActive: true,
    isPro: false,
    sortOrder: 7,
    parentId: null,
  },
];

export const childCategorySeeds: Partial<Category>[] = [
  // Food & Drink Children
  {
    name: 'Restaurant',
    slug: 'restaurant',
    description: 'Full-service restaurants and dining establishments',
    icon: '🍽️',
    color: '#FF6B6B',
    isActive: true,
    isPro: false,
    sortOrder: 1,
    parentId: 1, // Will be updated to actual parent ID
  },
  {
    name: 'Coffee Shop',
    slug: 'coffee-shop',
    description: 'Coffee shops, cafes, and coffee houses',
    icon: '☕',
    color: '#8B4513',
    isActive: true,
    isPro: false,
    sortOrder: 2,
    parentId: 1,
  },
  {
    name: 'Bar & Pub',
    slug: 'bar-and-pub',
    description: 'Bars, pubs, and drinking establishments',
    icon: '🍺',
    color: '#FFD700',
    isActive: true,
    isPro: false,
    sortOrder: 3,
    parentId: 1,
  },
  {
    name: 'Fast Food',
    slug: 'fast-food',
    description: 'Quick service restaurants and fast food chains',
    icon: '🍔',
    color: '#FF4500',
    isActive: true,
    isPro: false,
    sortOrder: 4,
    parentId: 1,
  },
  {
    name: 'Fine Dining',
    slug: 'fine-dining',
    description: 'Upscale restaurants and fine dining establishments',
    icon: '🍷',
    color: '#8B0000',
    isActive: true,
    isPro: false,
    sortOrder: 5,
    parentId: 1,
  },
  {
    name: 'Street Food',
    slug: 'street-food',
    description: 'Street vendors and food trucks',
    icon: '🌮',
    color: '#FF6347',
    isActive: true,
    isPro: false,
    sortOrder: 6,
    parentId: 1,
  },

  // Accommodation Children
  {
    name: 'Hotel',
    slug: 'hotel',
    description: 'Hotels and hotel chains',
    icon: '🏨',
    color: '#4169E1',
    isActive: true,
    isPro: false,
    sortOrder: 1,
    parentId: 2,
  },
  {
    name: 'Hostel',
    slug: 'hostel',
    description: 'Budget accommodations and hostels',
    icon: '🏠',
    color: '#32CD32',
    isActive: true,
    isPro: false,
    sortOrder: 2,
    parentId: 2,
  },
  {
    name: 'Airbnb',
    slug: 'airbnb',
    description: 'Short-term rentals and vacation homes',
    icon: '🏡',
    color: '#FF1493',
    isActive: true,
    isPro: false,
    sortOrder: 3,
    parentId: 2,
  },
  {
    name: 'Resort',
    slug: 'resort',
    description: 'Luxury resorts and vacation destinations',
    icon: '🏖️',
    color: '#00CED1',
    isActive: true,
    isPro: false,
    sortOrder: 4,
    parentId: 2,
  },
  {
    name: 'Motel',
    slug: 'motel',
    description: 'Budget motels and roadside accommodations',
    icon: '🛣️',
    color: '#696969',
    isActive: true,
    isPro: false,
    sortOrder: 5,
    parentId: 2,
  },
  {
    name: 'Bed & Breakfast',
    slug: 'bed-and-breakfast',
    description: 'Cozy B&Bs and guesthouses',
    icon: '🛏️',
    color: '#DDA0DD',
    isActive: true,
    isPro: false,
    sortOrder: 6,
    parentId: 2,
  },

  // Entertainment Children
  {
    name: 'Cinema',
    slug: 'cinema',
    description: 'Movie theaters and cinemas',
    icon: '🎬',
    color: '#9370DB',
    isActive: true,
    isPro: false,
    sortOrder: 1,
    parentId: 3,
  },
  {
    name: 'Theater',
    slug: 'theater',
    description: 'Live theater and performing arts venues',
    icon: '🎭',
    color: '#8A2BE2',
    isActive: true,
    isPro: false,
    sortOrder: 2,
    parentId: 3,
  },
  {
    name: 'Museum',
    slug: 'museum',
    description: 'Museums and cultural institutions',
    icon: '🏛️',
    color: '#FFD700',
    isActive: true,
    isPro: false,
    sortOrder: 3,
    parentId: 3,
  },
  {
    name: 'Concert Hall',
    slug: 'concert-hall',
    description: 'Music venues and concert halls',
    icon: '🎵',
    color: '#FF69B4',
    isActive: true,
    isPro: false,
    sortOrder: 4,
    parentId: 3,
  },
  {
    name: 'Amusement Park',
    slug: 'amusement-park',
    description: 'Theme parks and amusement centers',
    icon: '🎢',
    color: '#FF4500',
    isActive: true,
    isPro: false,
    sortOrder: 5,
    parentId: 3,
  },
  {
    name: 'Nightclub',
    slug: 'nightclub',
    description: 'Nightclubs and dance venues',
    icon: '🕺',
    color: '#FF1493',
    isActive: true,
    isPro: false,
    sortOrder: 6,
    parentId: 3,
  },

  // Shopping Children
  {
    name: 'Shopping Mall',
    slug: 'shopping-mall',
    description: 'Large shopping centers and malls',
    icon: '🏬',
    color: '#FF69B4',
    isActive: true,
    isPro: false,
    sortOrder: 1,
    parentId: 4,
  },
  {
    name: 'Boutique',
    slug: 'boutique',
    description: 'Small specialty shops and boutiques',
    icon: '👗',
    color: '#FFB6C1',
    isActive: true,
    isPro: false,
    sortOrder: 2,
    parentId: 4,
  },
  {
    name: 'Market',
    slug: 'market',
    description: 'Local markets and bazaars',
    icon: '🛒',
    color: '#32CD32',
    isActive: true,
    isPro: false,
    sortOrder: 3,
    parentId: 4,
  },
  {
    name: 'Supermarket',
    slug: 'supermarket',
    description: 'Grocery stores and supermarkets',
    icon: '🛍️',
    color: '#00CED1',
    isActive: true,
    isPro: false,
    sortOrder: 4,
    parentId: 4,
  },
  {
    name: 'Electronics Store',
    slug: 'electronics-store',
    description: 'Electronics and technology retailers',
    icon: '📱',
    color: '#4169E1',
    isActive: true,
    isPro: false,
    sortOrder: 5,
    parentId: 4,
  },
  {
    name: 'Bookstore',
    slug: 'bookstore',
    description: 'Bookshops and literary stores',
    icon: '📚',
    color: '#8B4513',
    isActive: true,
    isPro: false,
    sortOrder: 6,
    parentId: 4,
  },

  // Transport Children
  {
    name: 'Airport',
    slug: 'airport',
    description: 'Airports and aviation terminals',
    icon: '✈️',
    color: '#32CD32',
    isActive: true,
    isPro: false,
    sortOrder: 1,
    parentId: 5,
  },
  {
    name: 'Train Station',
    slug: 'train-station',
    description: 'Railway stations and train terminals',
    icon: '🚂',
    color: '#FF6347',
    isActive: true,
    isPro: false,
    sortOrder: 2,
    parentId: 5,
  },
  {
    name: 'Bus Station',
    slug: 'bus-station',
    description: 'Bus terminals and stations',
    icon: '🚌',
    color: '#FFD700',
    isActive: true,
    isPro: false,
    sortOrder: 3,
    parentId: 5,
  },
  {
    name: 'Taxi Stand',
    slug: 'taxi-stand',
    description: 'Taxi services and ride-sharing',
    icon: '🚕',
    color: '#FFA500',
    isActive: true,
    isPro: false,
    sortOrder: 4,
    parentId: 5,
  },
  {
    name: 'Car Rental',
    slug: 'car-rental',
    description: 'Vehicle rental services',
    icon: '🚗',
    color: '#4169E1',
    isActive: true,
    isPro: false,
    sortOrder: 5,
    parentId: 5,
  },
  {
    name: 'Bike Rental',
    slug: 'bike-rental',
    description: 'Bicycle rental and bike-sharing',
    icon: '🚲',
    color: '#32CD32',
    isActive: true,
    isPro: false,
    sortOrder: 6,
    parentId: 5,
  },

  // Health & Wellness Children
  {
    name: 'Hospital',
    slug: 'hospital',
    description: 'Hospitals and medical centers',
    icon: '🏥',
    color: '#DC143C',
    isActive: true,
    isPro: false,
    sortOrder: 1,
    parentId: 6,
  },
  {
    name: 'Pharmacy',
    slug: 'pharmacy',
    description: 'Pharmacies and drug stores',
    icon: '💊',
    color: '#FF69B4',
    isActive: true,
    isPro: false,
    sortOrder: 2,
    parentId: 6,
  },
  {
    name: 'Clinic',
    slug: 'clinic',
    description: 'Medical clinics and health centers',
    icon: '🏥',
    color: '#FF6347',
    isActive: true,
    isPro: false,
    sortOrder: 3,
    parentId: 6,
  },
  {
    name: 'Spa',
    slug: 'spa',
    description: 'Spas and wellness centers',
    icon: '🧖',
    color: '#DDA0DD',
    isActive: true,
    isPro: false,
    sortOrder: 4,
    parentId: 6,
  },
  {
    name: 'Gym',
    slug: 'gym',
    description: 'Fitness centers and gyms',
    icon: '💪',
    color: '#FF4500',
    isActive: true,
    isPro: false,
    sortOrder: 5,
    parentId: 6,
  },
  {
    name: 'Dentist',
    slug: 'dentist',
    description: 'Dental clinics and dentists',
    icon: '🦷',
    color: '#FFFFFF',
    isActive: true,
    isPro: false,
    sortOrder: 6,
    parentId: 6,
  },

  // Nature & Outdoors Children
  {
    name: 'Park',
    slug: 'park',
    description: 'Public parks and green spaces',
    icon: '🌳',
    color: '#228B22',
    isActive: true,
    isPro: false,
    sortOrder: 1,
    parentId: 7,
  },
  {
    name: 'Beach',
    slug: 'beach',
    description: 'Beaches and coastal areas',
    icon: '🏖️',
    color: '#00CED1',
    isActive: true,
    isPro: false,
    sortOrder: 2,
    parentId: 7,
  },
  {
    name: 'Mountain',
    slug: 'mountain',
    description: 'Mountain trails and hiking areas',
    icon: '⛰️',
    color: '#8B4513',
    isActive: true,
    isPro: false,
    sortOrder: 3,
    parentId: 7,
  },
  {
    name: 'Lake',
    slug: 'lake',
    description: 'Lakes and water bodies',
    icon: '🏞️',
    color: '#4169E1',
    isActive: true,
    isPro: false,
    sortOrder: 4,
    parentId: 7,
  },
  {
    name: 'Zoo',
    slug: 'zoo',
    description: 'Zoos and wildlife parks',
    icon: '🦁',
    color: '#FFD700',
    isActive: true,
    isPro: false,
    sortOrder: 5,
    parentId: 7,
  },
  {
    name: 'Botanical Garden',
    slug: 'botanical-garden',
    description: 'Botanical gardens and plant collections',
    icon: '🌺',
    color: '#32CD32',
    isActive: true,
    isPro: false,
    sortOrder: 6,
    parentId: 7,
  },
];

export default class CategorySeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const categoryRepository = dataSource.getRepository(Category);

    // First, create parent categories
    const parentMap = new Map<string, number>();

    for (const categoryData of categorySeeds) {
      const existingCategory = await categoryRepository.findOne({
        where: { name: categoryData.name },
      });

      if (!existingCategory) {
        const category = categoryRepository.create(categoryData);
        const savedCategory = await categoryRepository.save(category);
        parentMap.set(categoryData.name!, savedCategory.id);
        console.log(`✅ Created parent category: ${categoryData.name}`);
      } else {
        parentMap.set(categoryData.name!, existingCategory.id);
        console.log(`⏭️  Parent category already exists: ${categoryData.name}`);
      }
    }

    // Then, create child categories with correct parent IDs
    for (const childData of childCategorySeeds) {
      const existingChild = await categoryRepository.findOne({
        where: { name: childData.name },
      });

      if (!existingChild) {
        // Map parent names to actual parent IDs
        let parentId: number | null = null;

        if (childData.parentId === 1) {
          parentId = parentMap.get('Food & Drink') || null;
        } else if (childData.parentId === 2) {
          parentId = parentMap.get('Accommodation') || null;
        } else if (childData.parentId === 3) {
          parentId = parentMap.get('Entertainment') || null;
        } else if (childData.parentId === 4) {
          parentId = parentMap.get('Shopping') || null;
        } else if (childData.parentId === 5) {
          parentId = parentMap.get('Transport') || null;
        } else if (childData.parentId === 6) {
          parentId = parentMap.get('Health & Wellness') || null;
        } else if (childData.parentId === 7) {
          parentId = parentMap.get('Nature & Outdoors') || null;
        }

        const childCategory = categoryRepository.create({
          ...childData,
          parentId,
        });

        await categoryRepository.save(childCategory);
        console.log(
          `✅ Created child category: ${childData.name} (parent: ${parentId})`,
        );
      } else {
        console.log(`⏭️  Child category already exists: ${childData.name}`);
      }
    }
  }
}
