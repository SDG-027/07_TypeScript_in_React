import type z from 'zod';
import type { CatFactSchema } from '../schemas/catFacts';

import type { ProductSchema, ProductArraySchema } from '../schemas/products';

export type CatFact = z.infer<typeof CatFactSchema>;

export type Product = z.infer<typeof ProductSchema>;
export type ProductArray = z.infer<typeof ProductArraySchema>;
