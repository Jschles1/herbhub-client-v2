export interface PageProps {
  params?: {
    productId?: string;
  };
  searchParams?: {
    search?: string;
  };
}

export interface Product {
  id?: string;
  dispensaryName: string;
  dispensaryLocation: string;
  strain: string;
  strainType: string;
  categoryType: string;
  description: string;
  weight: string | string[];
  thc?: number;
  cbd?: number;
  lowestPrice: number;
  prices: ProductPrice[];
  quantity?: number;
  image?: string;
  brand: string;
  reviewStats?: {
    totalRatings: number;
    averageRating: number;
  };
  url?: string;
}

export interface ProductPrice {
  weight: number | string;
  unit: string;
  normal_price: number;
  promo_price?: number;
}
