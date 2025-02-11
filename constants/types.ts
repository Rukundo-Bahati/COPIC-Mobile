export interface User {
    id: string;
    name: string;
    email: string;
    avatar: string;
    bio?: string;
    isPhotographer: boolean;
    following: string[];
    followers: string[];
  }
  
  export interface Photographer {
    id: string;
    name: string;
    avatar: string;
    images: string[];
    specialty: string;
    location: string;
    likes: number;
    comments: number;
    price: string;
    isVerified: boolean;
    rating: number;
    reviews: number;
    portfolio: string[];
    about: string;
  }