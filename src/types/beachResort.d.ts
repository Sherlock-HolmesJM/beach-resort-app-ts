export const something = "";

declare global {
  interface TBeachResortRoom {
    id: number;
    name: string;
    slug: string;
    type: string;
    price: number;
    size: number;
    capacity: number;
    pets: boolean;
    breakfast: boolean;
    featured: boolean;
    description: string;
    extras: string[];
    images: string[];
  }

  interface TBeachResortResponse {
    id: number;
    attributes: {
      name: string;
      slug: string;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
      price: number;
      type: string;
      size: number;
      capacity: number;
      breakfast: boolean;
      featured: boolean;
      description: string;
      extras: string[];
      images: string[];
      pets: boolean;
    };
  }

  interface TRoomFilter {
    type: string;
    breakfast: boolean;
    pets: boolean;
    capacity: number;
    price: number;
    size: number;
    maxPrice: number;
    minPrice: number;
    maxSize: number;
    minSize: number;
  }

  type TRoomFilterKey = keyof TRoomFilter;

  interface TBeachResortQuery {
    filters?: {
      [K in keyof TBeachResortRoom]?: any;
    };
    fields?: string[];
  }
}
