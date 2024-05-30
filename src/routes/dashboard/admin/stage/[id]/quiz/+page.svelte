<script lang="ts">
	import { Avatar, AvatarImage, AvatarFallback } from '$lib/components/ui/avatar';
	import { getInitialName, ssrPromiseLoop, waktuYangLalu } from '$lib/utils';
	import Button from '$lib/components/ui/button/button.svelte';
	import NoData from '$lib/images/no-data.svg';
	import Logo from '$lib/images/logo.png';
	import type { PageServerData } from './$types';
	import { Edit2Icon } from 'lucide-svelte';

	export let data: PageServerData;
</script>

<div class="flex items-center justify-between">
	<div>
		<h1 class="text-2xl font-bold">Quiz</h1>
		<p class="mt-3 text-gray-600">Semua quiz pada {data.stage.title}</p>
	</div>
	<Button href="/dashboard/admin/stage/{data.stage.id}/quiz/new">Buat Baru</Button>
</div>

<div class="pt-12"></div>

<div class="grid grid-cols-12 gap-4">
	{#each data.stage.Quiz as quiz, i}
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
				</div>
			</div>
			<div class="flex justify-center gap-3">
				<Button variant="secondary" href={`/dashboard/admin/stage/${data.stage.id}/quiz/${quiz.id}`}
					><Edit2Icon size={15} /></Button
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
