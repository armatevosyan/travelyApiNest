import { DataSource } from 'typeorm';
import { Category } from 'modules/categories/category.entity';
import { Seeder } from 'typeorm-extension';

export const categorySeeds: Partial<Category>[] = [
  {
    name: 'Food & Drink',
    description: 'All food and beverage establishments',
    icon: 'utensils',
    color: '#FF6B6B',
    isActive: true,
    isPro: false,
    sortOrder: 1,
    parentId: null,
  },
  {
    name: 'Accommodation',
    description: 'Places to stay and sleep',
    icon: 'hotel',
    color: '#4169E1',
    isActive: true,
    isPro: false,
    sortOrder: 2,
    parentId: null,
  },
  {
    name: 'Entertainment',
    description: 'Entertainment and leisure activities',
    icon: 'film',
    color: '#9370DB',
    isActive: true,
    isPro: false,
    sortOrder: 3,
    parentId: null,
  },
  {
    name: 'Shopping',
    description: 'Shopping and retail',
    icon: 'shopping-bag',
    color: '#FF69B4',
    isActive: true,
    isPro: false,
    sortOrder: 4,
    parentId: null,
  },
  {
    name: 'Transport',
    description: 'Transportation and travel services',
    icon: 'train-outline',
    color: '#32CD32',
    isActive: true,
    isPro: false,
    sortOrder: 5,
    parentId: null,
  },
  {
    name: 'Health & Wellness',
    description: 'Health, medical, and wellness services',
    icon: 'spa',
    color: '#DC143C',
    isActive: true,
    isPro: false,
    sortOrder: 6,
    parentId: null,
  },
  {
    name: 'Nature & Outdoors',
    description: 'Natural attractions and outdoor activities',
    icon: 'sunny-outline',
    color: '#228B22',
    isActive: true,
    isPro: false,
    sortOrder: 7,
    parentId: null,
  },
];

export const childCategorySeeds: Partial<Category>[] = [
  {
    name: 'Restaurant',
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
