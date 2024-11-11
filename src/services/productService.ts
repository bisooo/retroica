import { Product } from '@/types/product';
import { cameras } from '@/data/dummyData';

export async function getProducts(): Promise<Product[]> {
  // In a real application, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => resolve(cameras), 100);
  });
}

export async function getProductById(id: number): Promise<Product | undefined> {
  // In a real application, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => resolve(cameras.find(camera => camera.id === id)), 100);
  });
}

export function filterProducts(
  products: Product[],
  category: string,
  brands: string[],
  priceLimit: number
): Product[] {
  return products.filter(
    (product) =>
      (category === "all" || product.category === category) &&
      (brands.length === 0 || brands.some(brand => 
        brand.toLowerCase() === product.brand.toLowerCase()
      )) &&
      product.price <= priceLimit
  );
}