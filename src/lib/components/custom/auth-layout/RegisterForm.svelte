<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { LockIcon, UserIcon } from 'lucide-svelte';
	import { formSchema, type FormSchema } from './registerSchema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import FormFieldIcons from '../form/form-field-icons.svelte';

	export let data: SuperValidated<Infer<FormSchema>>;

	const form = superForm(data, {
		validators: zodClient(formSchema)
	});

	const { form: formData, enhance } = form;
</script>

<form method="POST" class="space-y-6" action="?/register">
	<FormFieldIcons
		{form}
		name="name"
		placeholder="Nama"
		icon={UserIcon}
		bind:value={$formData.name}
		autocomplete="name"
		type="text"
	/>
	<FormFieldIcons
		{form}
		name="email"
		placeholder="Email"
		icon={UserIcon}
		bind:value={$formData.email}
		autocomplete="email"
		type="email"
	/>
	<FormFieldIcons
		{form}
		name="password"
		placeholder="Password"
		icon={LockIcon}
		type="password"
		bind:value={$formData.password}
		autocomplete="current-password"
	/><FormFieldIcons
		{form}
		name="passwordConfirm"
		placeholder="Password"
		icon={LockIcon}
		type="password"
		bind:value={$formData.passwordConfirm}
		autocomplete="current-password"
	/>
	<Form.Button class="w-full">Sign In</Form.Button>
</form>

<p class="mt-10 text-center text-sm text-gray-500">
	Sudah punya akun?
	<a href="/login" class="font-semibold leading-6 text-primary">masuk</a>
</p>
