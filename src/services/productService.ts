import { Product } from '@/types/product';

const cameras : Product[] = [
    {
      id: 1,
      name: "FILM CAMERA",
      category: "film",
      brand: "Kodak",
      price: 299,
      image: "/nishika-n8000.jpg?height=200&width=200",
    },
    {
      id: 2,
      name: "Y2K CAMERA",
      category: "y2k",
      brand: "Fujifilm",
      price: 199,
      image: "/nishika-n8000.jpg?height=200&width=200",
    },
    {
      id: 3,
      name: "POCKET CAMERA",
      category: "pointshoot",
      brand: "Canon",
      price: 149,
      image: "/nishika-n8000.jpg?height=200&width=200",
    },
    {
      id: 4,
      name: "FILM CAMERA",
      category: "film",
      brand: "Nikon",
      price: 349,
      image: "/nishika-n8000.jpg?height=200&width=200",
    },
    {
      id: 5,
      name: "Y2K CAMERA",
      category: "y2k",
      brand: "Olympus",
      price: 249,
      image: "/nishika-n8000.jpg?height=200&width=200",
    },
    {
      id: 6,
      name: "POCKET CAMERA",
      category: "pointshoot",
      brand: "Kodak",
      price: 179,
      image: "/nishika-n8000.jpg?height=200&width=200",
    },
    {
      id: 7,
      name: "SLR CAMERA",
      category: "slr",
      brand: "Canon",
      price: 599,
      image: "/nishika-n8000.jpg?height=200&width=200",
    },
];

export async function getProducts(): Promise<Product[]> {
    // In a real application, this would be an API call
    return new Promise((resolve) => {
      setTimeout(() => resolve(cameras), 100);
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