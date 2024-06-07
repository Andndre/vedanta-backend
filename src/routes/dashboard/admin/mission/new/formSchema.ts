import { z } from 'zod';

export const formSchema = z.object({
	title: z.string().min(2).max(100),
	body: z.string()
});

export type FormSchema = typeof formSchema;
