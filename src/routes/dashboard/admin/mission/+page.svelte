<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { PlusIcon } from 'lucide-svelte';
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
			<Dialog.Title>Hapus Misi Ini?</Dialog.Title>
			<Dialog.Description>
				Pengguna akan tetap memiliki hasil poin dengan misi ini
			</Dialog.Description>
		</Dialog.Header>
		<Dialog.Footer>
			<Button
				on:click={() => {
					open = false;
					goto(`/dashboard/admin/mission/${idSelected}/delete`);
				}}>Konfirmasi</Button
			>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
<div class="flex justify-between">
	<h1 class="text-2xl">Semua Daftar Misi</h1>
	<Button href="/dashboard/admin/mission/new"><PlusIcon size={15} class="mr-2" /> Tambah</Button>
</div>
{#each data.missions as mission}
	<div class="pt-8"></div>
	<div
		class="flex flex-row justify-between gap-3 rounded-lg border border-gray-200 bg-card p-8 shadow-sm"
	>
		<div class="flex flex-col">
			<h2 class="text-xl font-bold">
				{mission.missionType.name.replaceAll('{x}', `${mission.maxProgress}`)}
			</h2>
			<p>Max Progress: {mission.maxProgress}, Hadiah Point: {mission.rewardStars}</p>
		</div>
		<div class="flex gap-3">
			<Button variant="ghost" href={`/dashboard/admin/mission/${mission.id}/edit`}>Edit</Button>
			<Button
				on:click={() => {
					open = true;
					idSelected = mission.id;
				}}
				variant="ghost">Hapus</Button
			>
		</div>
	</div>
{/each}
