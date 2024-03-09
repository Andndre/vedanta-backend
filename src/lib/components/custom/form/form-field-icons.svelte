<script lang="ts" context="module">
	import type { FormPath, SuperForm } from 'sveltekit-superforms';
	type T = Record<string, unknown>;
	type U = unknown;
</script>

<script lang="ts" generics="T extends Record<string, unknown>, U extends FormPath<T>">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { EyeIcon, EyeOffIcon, type Icon } from 'lucide-svelte';
	import type { ComponentType } from 'svelte';

	export let form: SuperForm<T>;
	export let name: U;
	export let placeholder: string;
	export let icon: ComponentType<Icon>;
	export let type: 'text' | 'password' = 'text';
	export let value: string | null = null;

	let isPassword = type === 'password';
	let showPassword = type !== 'password';
</script>

<Form.Field {form} {name}>
	<Form.Control let:attrs>
		<div class="relative">
			<Input {...attrs} {value} {placeholder} type={showPassword ? 'text' : 'password'} class="pl-10" />
			<svelte:component this={icon} size={16} class="absolute left-3 top-1/2 -translate-y-1/2" />
			{#if isPassword}
				<button type="button" class="absolute right-3 top-1/2 -translate-y-1/2" on:click={() => (showPassword = !showPassword)}>
					{#if showPassword}
						<EyeOffIcon size={16}/>
					{:else}
						 <EyeIcon size={16}/>
					{/if}
				</button>
			{/if}
		</div>
	</Form.Control>
	<Form.FieldErrors />
</Form.Field>
