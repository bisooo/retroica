export interface Product {
    id: number;
    name: string;
    category: string;
    brand: string;
    price: number;
    image: string;
}

export interface ProductListProps {
    products: Product[];
}

export interface ProductCardProps {
    product: Product;
    currencySymbol: string;
    isLoaded: boolean;
    textureSrc: string;
    buttonTextureSrc: string;
}