import * as z from 'zod';

export const CatFactSchema = z.looseObject({
  fact: z.string(),
  length: z.number(),
});
