<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { PlusIcon } from 'lucide-svelte';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<div class="flex justify-between">
	<h1 class="text-2xl">Semua Daftar Stage</h1>
	<Button href="/dashboard/admin/stage/new"><PlusIcon size={15} class="mr-2" /> Tambah</Button>
</div>

{#each data.stages as stage}
	<!-- card -->
	<div class="pt-8"></div>
	<div
		class="flex flex-row justify-between gap-3 rounded-lg border border-gray-200 bg-card p-8 shadow-sm"
	>
		<div class="flex flex-col">
			<h2 class="text-xl font-bold">{stage.title}</h2>
			<div class="pt-2"></div>
			<p>{stage.description}</p>
		</div>
		<Button variant="ghost" href={`/dashboard/admin/stage/${stage.id}`}>Info</Button>
	</div>
{/each}
