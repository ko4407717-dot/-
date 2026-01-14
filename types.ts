
export enum CategoryType {
  GAMES = 'GAMES',
  APPS = 'APPS',
  SERVICES = 'SERVICES',
  SOCIAL = 'SOCIAL',
  FREE = 'FREE'
}

export interface Product {
  id: string;
  name: string;
  image: string;
  category: CategoryType;
  packages: Package[];
  icon?: string;
}

export interface Package {
  id: string;
  label: string;
  price: string;
}

export interface PaymentMethod {
  id: string;
  name: string;
  details: string;
  icon: string;
  address?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  password?: string; // In a real app, never store plain text passwords!
  joinDate: string;
}
