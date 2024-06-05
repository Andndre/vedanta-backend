<script lang="ts">
	import { browser } from '$app/environment';
	import { PUBLIC_APP_URL } from '$env/static/public';
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import type { PageServerData } from './$types';

	let listPencarian: { id: number; title: string; body: string }[] = [];

	export let data: PageServerData;

	let searchQuery = '';
	let doaId = 0;
	let complete = false;

	async function search() {
		if (!browser) return;
		const r = await fetch(
			`${PUBLIC_APP_URL}/dashboard/guru/classes/${data.kelas.id}/assign-tugas-doa/api/search-doa?q=${searchQuery}`
		);
		if (!r.ok) return;
		const { doas } = await r.json();
		listPencarian = doas;
		complete = false;
	}

	$: searchQuery, search();
</script>

<h1 class="text-2xl font-bold">Berikan Tugas Doa</h1>
<div class="pt-8"></div>

<form action="?/save" method="POST" class="space-y-3 rounded-md bg-card p-8 shadow-md">
	<Label>Cari Doa</Label>
	<div class="relative">
		<Input
			placeholder="Pencarian Doa"
			type="text"
			name="type"
			required
			bind:value={searchQuery}
			autocomplete="off"
		/>
		{#if listPencarian.length > 0 && !complete}
			<div
				class="absolute left-0 top-12 flex w-full flex-col items-start rounded-md bg-card p-4 shadow-md"
			>
				{#each listPencarian as cari}
					<button
						on:click={() => {
							searchQuery = cari.title;
							doaId = cari.id;
							complete = true;
							// wait for 1 second
							setTimeout(() => {
								complete = true;
							}, 200);
						}}
						class="flex w-full justify-start p-2 hover:bg-orange-300"
					>
						{cari.title}
					</button>
				{/each}
			</div>
		{/if}
	</div>

	<input type="hidden" name="doaId" bind:value={doaId} />
	<div class="space-y-2">
		<Label>Tenggat</Label>
		<Input type="date" name="dueDate" required />
	</div>
	<Button type="submit">Simpan</Button>
</form>
