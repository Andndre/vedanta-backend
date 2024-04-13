<script lang="ts">
	import { Avatar, AvatarImage, AvatarFallback } from '$lib/components/ui/avatar';
	import Button from "$lib/components/ui/button/button.svelte";
	import NoData from "$lib/images/no-data.svg";
	import Logo from "$lib/images/logo.png";
	type Quiz = {
			name: string,
			author: string,
			time: string,
			id: string,
			type: 'QUIZ' | 'DOA',
			profileAuthor?: string
	}
	let quizes: Quiz[] = [
	{
		name: "QUIZ 2 | Kelas X SMP NEGERI HINDU 3 BELAHBATUH",
		author: "Admin",
		time: "3 hari lalu",
		id: "1",
		type: "QUIZ",
		profileAuthor: "https://avatars.githubusercontent.com/u/81848639?v=4"
	},
	{
		name: "QUIZ 1 | Kelas X SMP NEGERI HINDU 3 BELAHBATUH",
		author: "Admin",
		time: "19 hari lalu",
		id: "1",
		type: "QUIZ",
		profileAuthor: "https://avatars.githubusercontent.com/u/81848639?v=4"
	},]
</script>

<div class="flex justify-between items-center">
	<div>
		<h1 class="text-3xl font-bold">Perpustakaan</h1>
		<p class="text-gray-600 mt-3">Semua quiz yang pernah anda buat</p>
	</div>
	<Button>Buat Baru</Button>
</div>

<div class="pt-12"></div>
<div class="grid grid-cols-12 gap-4">
	{#each quizes as quiz}
		<div class="flex justify-between items-end p-6 rounded-sm bg-card shadow-md gap-6 col-span-12">
			<div class="flex gap-6 items-center">
				<Avatar class="cursor-pointer w-16 h-16" >
					<AvatarImage
						src="{Logo}"
						alt="user avatar"
						class="w-16 h-16 object-contain bg-orange-100"
					/>
					<AvatarFallback>Q</AvatarFallback>
				</Avatar>
				<div>
					<span>{quiz.type}</span>
					<h2 class="text-xl font-medium">{quiz.name}</h2>
					<div class="flex items-center gap-3 mt-3">
						<Avatar class="w-6 h-6">
							<AvatarImage src="{quiz.profileAuthor}" alt="user avatar" class="w-full h-full object-cover" />
						</Avatar>
						<span class="text-gray-600">{quiz.author}</span>
						<span class="text-gray-600">{quiz.time}</span>
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
