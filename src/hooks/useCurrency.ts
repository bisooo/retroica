import { useState, useCallback } from 'react';
import { Currency } from '@/types/navbar';

const currencies: Currency[] = [
  { code: 'USD', symbol: '$' },
  { code: 'EUR', symbol: '€' },
  { code: 'CZK', symbol: 'Kč' },
];

export function useCurrency() {
  const [currency, setCurrency] = useState<Currency>(currencies[0]);

  const changeCurrency = useCallback((code: string) => {
    const newCurrency = currencies.find(c => c.code === code);
    if (newCurrency) {
      setCurrency(newCurrency);
    }
  }, []);

  return { currency, changeCurrency, currencies };
}