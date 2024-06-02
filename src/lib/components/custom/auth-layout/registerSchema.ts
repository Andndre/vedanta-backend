import { z } from 'zod';

export const formSchema = z.object({
	name: z.string({ required_error: '❌ Harap masukkan nama' }),
	email: z.string().email({ message: '❌ Harap masukkan email yang valid' }),
	password: z
		.string()
		.min(6, { message: '❌ Harap masukkan password minimal 6 karakter' })
		.max(50, { message: '❌ Password maksimal 50 karakter' }),
	passwordConfirm: z
		.string()
		.min(6, { message: '❌ Harap masukkan password minimal 6 karakter' })
		.max(50, { message: '❌ Password maksimal 50 karakter' })
});

export type FormSchema = typeof formSchema;
