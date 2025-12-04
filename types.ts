export interface Business {
  id: string;
  name: string;
  category: string;
  discount: string;
  description: string;
  phone: string;
  address: string;
  imageUrl: string;
  isApproved: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  raised: number;
  goal: number;
}

export interface DonationStat {
  name: string;
  value: number;
  color: string;
}

export enum UserRole {
  GUEST = 'GUEST',
  MEMBER = 'MEMBER',
  ADMIN = 'ADMIN'
}