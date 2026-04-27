import { useEffect, useState } from 'react';
import { ProductArraySchema, ProductSchema } from '../schemas/products';
import type { Product } from '../types';
import z from 'zod';

export default function ProductsList() {
  const [products, setProducts] = useState<null | Product[]>(null);
  const [error, setError] = useState<null | string[]>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('https://dummyjson.com/products');
        if (!res) throw new Error(`Fetch failed; Status Code: ${res.status}`);
        const data = await res.json();

        // const {
        //   success,
        //   data: zd,
        //   error,
        // } = ProductArraySchema.safeParse(data.products);

        // if (success) {
        //   setProducts(zd);
        // }

        const validProducts: Product[] = [];
        const productErrors = [];

        for (const product of data.products as Product[]) {
          const { success, data: zd, error } = ProductSchema.safeParse(product);
          if (success) validProducts.push(zd);
          else productErrors.push(z.prettifyError(error));
        }

        setProducts(validProducts);
        setError(productErrors);
      } catch (err) {
        console.log('Im catch-Block: ', err);
      }
    }

    fetchData();

    return () => console.log('Aufraumen nicht vergessen!');
  }, []);
  return (
    <ul>{products && products.map((p) => <li key={p.id}>{p.title}</li>)}</ul>
  );
}
