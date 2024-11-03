interface ProductInfoProps {
  description: string;
  price: number;
}

export function ProductInfo({ description, price }: ProductInfoProps) {
  return (
    <div className="flex justify-between items-start">
      <p className="text-l max-w-[70%]">{description}</p>
      <div className="text-2xl text-[#00FF00]">${price.toFixed(2)}</div>
    </div>
  );
}
