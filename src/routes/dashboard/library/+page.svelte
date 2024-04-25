<script lang="ts">
	import { Avatar, AvatarImage, AvatarFallback } from '$lib/components/ui/avatar';
	import { getInitialName } from '$lib/utils';
	import Button from '$lib/components/ui/button/button.svelte';
	import NoData from '$lib/images/no-data.svg';
	import Logo from '$lib/images/logo.png';
	import type { PageServerData } from './$types';
	import type { LayoutServerData } from '../$types';

	export let data: PageServerData;
	export let layoutData: LayoutServerData;

	// let quizes: Prisma.QuizSelect[] = [
	// 	{
	// 		name: 'QUIZ 2 | Kelas X SMP NEGERI HINDU 3 BELAHBATUH',
	// 		author: 'Admin',
	// 		time: '3 hari lalu',
	// 		id: 1,
	// 		type: 'QUIZ',
	// 		profileAuthor: 'https://avatars.githubusercontent.com/u/81848639?v=4'
	// 	},
	// 	{
	// 		name: 'QUIZ 1 | Kelas X SMP NEGERI HINDU 3 BELAHBATUH',
	// 		author: 'Admin',
	// 		time: '19 hari lalu',
	// 		id: 2,
	// 		type: 'QUIZ',
	// 		profileAuthor: 'https://avatars.githubusercontent.com/u/81848639?v=4'
	// 	}
	// ];
</script>

<div class="flex items-center justify-between">
	<div>
		<h1 class="text-3xl font-bold">Perpustakaan</h1>
		<p class="mt-3 text-gray-600">Semua quiz yang pernah anda buat</p>
	</div>
	<Button>Buat Baru</Button>
</div>

<div class="pt-12"></div>
<div class="grid grid-cols-12 gap-4">
	{#each data.quizzes as quiz}
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
					<span>{quiz.type}</span>
					<h2 class="text-xl font-medium">{quiz.title}</h2>
					<div class="mt-3 flex items-center gap-3">
						<Avatar class="h-6 w-6">
							<AvatarImage
								src={layoutData.user.name}
								alt="user avatar"
								class="h-full w-full object-cover"
							/>
						</Avatar>
						<span class="text-gray-600">{layoutData.user.name}</span>
						<span class="text-gray-600">{quiz.createdAt}</span>
					</div>
				</div>
			</div>
			<Button variant="secondary">Sebarkan</Button>
		</div>
	{:else}
		<div class="flex flex-col justify-center items-center h-[calc(100vh-21rem)]">
			<img src={NoData} alt="No Data" class="h-52" />
			<p class="mx-4 mt-5">Belum ada Quiz</p>
		</div>
	{/each}
</div>
