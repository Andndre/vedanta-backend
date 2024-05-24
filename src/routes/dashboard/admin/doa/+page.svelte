<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { PlusIcon } from 'lucide-svelte';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<div class="flex justify-between">
	<h1 class="text-2xl">Semua Daftar Doa</h1>
	<Button href="/dashboard/admin/doa/new"><PlusIcon size={15} class="mr-2" /> Tambah</Button>
</div>
{#each data.doas as doa}
	<div class="pt-8"></div>
	<div
		class="flex flex-row justify-between gap-3 rounded-lg border border-gray-200 bg-white p-8 shadow-sm"
	>
		<div class="flex flex-col">
			<h2 class="text-xl font-bold">{doa.title}</h2>
			<p>{doa.body}</p>
		</div>
		<Button variant="ghost" href={`/dashboard/admin/doa/${doa.id}/edit`}>Edit</Button>
	</div>
{/each}
