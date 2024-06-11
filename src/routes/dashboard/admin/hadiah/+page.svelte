<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { CoinsIcon, PlusIcon } from 'lucide-svelte';
	import type { PageServerData } from './$types';
	import * as Dialog from '$lib/components/ui/dialog';
	import { goto } from '$app/navigation';

	export let data: PageServerData;

	let idSelected: number | null = null;
	let open = false;
</script>

<Dialog.Root bind:open>
	<!-- <Dialog.Trigger class={buttonVariants({ variant: 'outline' })}>Edit Profile</Dialog.Trigger> -->
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Hapus hadiah Ini?</Dialog.Title>
			<Dialog.Description>Perubahan yang dilakukan tidak dapat dikembalikan</Dialog.Description>
		</Dialog.Header>
		<Dialog.Footer>
			<Button
				on:click={() => {
					open = false;
					goto(`/dashboard/admin/hadiah/${idSelected}/delete`);
				}}>Konfirmasi</Button
			>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
<div class="flex justify-between">
	<h1 class="text-2xl">Semua Daftar Hadiah</h1>
	<div class="flex gap-3">
		<div class="relative">
			<Button href="/dashboard/admin/hadiah/permintaan-tukar" variant="outline">
				<CoinsIcon size={15} class="mr-2" /> Permintaan Tukar</Button
			>
			<span
				class="absolute right-0 top-0 inline-flex h-4 w-4 animate-ping rounded-full bg-red-400 opacity-75"
			></span>
		</div>
		<Button href="/dashboard/admin/hadiah/new"><PlusIcon size={15} class="mr-2" /> Tambah</Button>
	</div>
</div>
{#each data.gifts as gift}
	<div class="pt-8"></div>
	<div
		class="flex flex-row justify-between gap-3 rounded-lg border border-gray-200 bg-card p-8 shadow-sm"
	>
		<div class="flex flex-col">
			<h2 class="text-xl font-bold">{gift.name}</h2>
			<p>{gift.prize}</p>
		</div>
		<div class="flex gap-3">
			<Button variant="ghost" href={`/dashboard/admin/hadiah/${gift.id}/edit`}>Edit</Button>
			<Button
				on:click={() => {
					open = true;
					idSelected = gift.id;
				}}
				variant="ghost">Hapus</Button
			>
		</div>
	</div>
{/each}
