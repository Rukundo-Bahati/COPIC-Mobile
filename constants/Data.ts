import { User, Photographer } from './types';

export const CURRENT_USER: User = {
  id: 'current',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://api.a0.dev/assets/image?text=professional%20headshot%20portrait&aspect=1:1&seed=789',
  isPhotographer: false,
  following: ['1', '2'],
  followers: ['1'],
};

export const DUMMY_PHOTOGRAPHERS: Photographer[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    avatar: 'https://api.a0.dev/assets/image?text=professional%20female%20photographer%20headshot%20portrait&aspect=1:1&seed=123',
    images: [
      'https://api.a0.dev/assets/image?text=stunning%20wedding%20photography%20dramatic%20lighting&aspect=4:5&seed=456',
      'https://api.a0.dev/assets/image?text=elegant%20wedding%20ceremony&aspect=4:5&seed=457',
    ],
    specialty: 'Wedding Photography',
    location: 'New York, NY',
    likes: 1234,
    comments: 89,
    price: '$200/hr',
    isVerified: true,
    rating: 4.8,
    reviews: 156,
    portfolio: [
      'https://api.a0.dev/assets/image?text=wedding%20portrait&aspect=4:5&seed=458',
      'https://api.a0.dev/assets/image?text=wedding%20ceremony&aspect=4:5&seed=459',
    ],
    about: 'Specializing in capturing life\'s most precious moments with an artistic touch.',
  },
  {
    id: '2',
    name: 'Marcus Chen',
    avatar: 'https://api.a0.dev/assets/image?text=asian%20male%20photographer%20headshot%20professional&aspect=1:1&seed=789',
    images: [
      'https://api.a0.dev/assets/image?text=urban%20street%20photography%20neon%20lights&aspect=4:5&seed=101',
      'https://api.a0.dev/assets/image?text=city%20life%20night&aspect=4:5&seed=102',
    ],
    specialty: 'Street Photography',
    location: 'Los Angeles, CA',
    likes: 2341,
    comments: 156,
    price: '$150/hr',
    isVerified: true,
    rating: 4.9,
    reviews: 203,
    portfolio: [
      'https://api.a0.dev/assets/image?text=street%20photography&aspect=4:5&seed=103',
      'https://api.a0.dev/assets/image?text=urban%20life&aspect=4:5&seed=104',
    ],
    about: 'Capturing the raw energy and authenticity of urban life through my lens.',
  },
];