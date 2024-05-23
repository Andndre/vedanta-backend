<script lang="ts">
	import { Avatar, AvatarImage, AvatarFallback } from '$lib/components/ui/avatar';
	import { getInitialName, ssrPromiseLoop } from '$lib/utils';
	import Button from '$lib/components/ui/button/button.svelte';
	import NoData from '$lib/images/no-data.svg';
	import Logo from '$lib/images/logo.png';
	import type { PageServerData } from './$types';
	import { Edit2Icon } from 'lucide-svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Skeleton } from '$lib/components/ui/skeleton';
	import { PUBLIC_APP_URL } from '$env/static/public';
	import { browser } from '$app/environment';

	let dialogOpen = false;
	let daftarKelas: { classCode: string; id: number; name: string }[] = [];
	let searched = false;
	let selected = -1;

	export let data: PageServerData;

	async function kelasDibuat() {
		if (searched) return daftarKelas;
		const r = await fetch(`${PUBLIC_APP_URL}/dashboard/guru/classes/api`);
		if (!r.ok) return [];
		const data = await r.json();
		daftarKelas = data.classes;
		return daftarKelas;
	}
</script>

<Dialog.Root bind:open={dialogOpen}>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Pilih Kelas</Dialog.Title>
			<Dialog.Description>Pilih Kelas yang Akan Diberikan Tugas</Dialog.Description>
		</Dialog.Header>
		{#await ssrPromiseLoop(() => kelasDibuat(), browser)}
			<div class="flex gap-3">
				<Skeleton class="h-10 w-10 rounded-full" />
				<Skeleton class="h-10 w-full rounded-sm" />
			</div>
		{:then listKelas}
			<div class="flex flex-col gap-2 rounded-sm">
				{#each listKelas as kelas}
					<button
						on:click={() => {
							dialogOpen = false;
						}}
						class="flex items-center gap-2 rounded-sm border border-gray-300 p-2 shadow-sm"
					>
						<p>{kelas.name}</p>
					</button>
				{/each}
			</div>
		{/await}
	</Dialog.Content>
</Dialog.Root>
<div class="flex items-center justify-between">
	<div>
		<h1 class="text-3xl font-bold">Perpustakaan</h1>
		<p class="mt-3 text-gray-600">Semua quiz yang pernah anda buat</p>
	</div>
	<Button href="/dashboard/guru/library/new">Buat Baru</Button>
</div>

<div class="pt-12"></div>

<div class="grid grid-cols-12 gap-4">
	{#each data.userFind.quizzesCreated as quiz, i}
		<div class="col-span-12 flex items-end justify-between gap-6 rounded-sm bg-card p-6 shadow-md">
			<div class="flex items-center gap-6">
				<Avatar class="h-16 w-16 cursor-pointer">
					<AvatarImage
						src={Logo}
						alt="user avatar"
						class="h-16 w-16 bg-orange-100 object-contain"
					/>
					<AvatarFallback>{getInitialName(quiz.title)}</AvatarFallback>
				</Avatar>
				<div>
					<h2 class="text-xl font-medium">{quiz.title}</h2>
					<div class="mt-3 flex items-center gap-3">
						<span class="text-gray-600">{quiz.createdAt}</span>
					</div>
				</div>
			</div>
			<div class="flex justify-center gap-3">
				<Button variant="secondary" href={`/dashboard/guru/library/${quiz.id}`}
					><Edit2Icon size={15} /></Button
				>
				<Button
					variant="secondary"
					on:click={() => {
						dialogOpen = true;
						selected = i;
					}}>Sebarkan</Button
				>
			</div>
		</div>
	{:else}
		<div class="flex flex-col justify-center items-center h-[calc(100vh-21rem)]">
			<img src={NoData} alt="No Data" class="h-52" />
			<p class="mx-4 mt-5">Belum ada Quiz</p>
		</div>
	{/each}
</div>
