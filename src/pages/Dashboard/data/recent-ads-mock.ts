
interface RecentAd {
  id: string;
  title: string;
  price: number;
  category: string;
  status: 'active' | 'pending' | 'sold';
  image: string;
  createdAt: string;
  views: number;
}

export const recentAdsMock: RecentAd[] = [
  {
    id: 'ad1',
    title: 'Smartphone Samsung Galaxy S22',
    price: 3499.99,
    category: 'Eletrônicos',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    createdAt: '2025-05-10',
    views: 45
  },
  {
    id: 'ad2',
    title: 'Notebook Dell Inspiron 15',
    price: 4299.99,
    category: 'Informática',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    createdAt: '2025-05-08',
    views: 32
  },
  {
    id: 'ad3',
    title: 'Sofá 3 Lugares Reclinável',
    price: 2199.90,
    category: 'Móveis',
    status: 'pending',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    createdAt: '2025-05-06',
    views: 18
  },
  {
    id: 'ad4',
    title: 'Bicicleta Mountain Bike',
    price: 1899.00,
    category: 'Esportes',
    status: 'sold',
    image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    createdAt: '2025-05-01',
    views: 56
  }
];
