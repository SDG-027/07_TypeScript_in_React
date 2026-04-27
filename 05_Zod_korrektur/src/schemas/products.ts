import z from 'zod';

export const ProductSchema = z.looseObject({
  id: z.number(),
  title: z.string(),
  price: z.number(),
  thumbnail: z.url(),
});

export const ProductArraySchema = z.array(ProductSchema);
