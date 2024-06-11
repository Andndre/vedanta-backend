<script lang="ts">
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';
	import type { PageServerData } from './$types';
	import { DiscIcon, HeartIcon, HeartOffIcon } from 'lucide-svelte';

	export let data: PageServerData;

	let portfolio: HTMLCanvasElement;
	const chartData = {
		labels: [
			'Quiz Diselesaikan',
			'Pertanyaan Ganesh Bot',
			'Bertanya pada Diskusi',
			'Menjawab pada Diskusi',
			'Membaca Sloka',
			'Membaca Doa'
		],
		datasets: [
			{
				label: 'Data Siswa',
				data: [
					data.user.quizCompleted,
					data.user.ganeshBotMessages,
					data.user.discussionsAsked,
					data.user.discussionsAnswered,
					data.user.slokaReaded,
					data.user.doaReaded
				],
				backgroundColor: ['#7000e1', '#fc8800', '#00b0e8'],
				borderWidth: 0
			}
		]
	};

	onMount(() => {
		const ctx = portfolio.getContext('2d') as CanvasRenderingContext2D;
		// Initialize chart using default config set
		new Chart(ctx, {
			type: 'radar',
			data: chartData,
			options: {
				responsive: true,
				plugins: {
					legend: {
						position: 'bottom',
						display: true,
						labels: {
							usePointStyle: true,
							padding: 20,
							font: {
								size: 14
							}
						}
					},
					title: {
						display: true,
						text: 'Informasi siswa'
					}
				}
			}
		});
	});
</script>

<h1 class="text-3xl font-bold">Informasi {data.user.name}</h1>

<div class="pt-8"></div>
<div class="rounded-sm bg-card p-6 shadow-md">
	<div class="aspect-square w-full max-w-3xl">
		<canvas bind:this={portfolio} class="h-full w-full" />
	</div>

	<div class="pt-8"></div>
	<h2 class="text-xl font-bold">Pertanyaan Teratas</h2>
	<div class="pt-2"></div>
	<ul class="space-y-2">
		{#each data.user.discussionsCreated as discussion}
			<li class="border-b border-gray-200 pb-3">
				<div class="flex justify-between gap-3">
					<span>
						{discussion.title}
					</span>
					<span class="flex items-center gap-2">
						<HeartIcon size={15} />
						{discussion.likesCount}
					</span>
				</div>
			</li>
		{:else}
			<div class="text-center">Tidak ada pertanyaan</div>
		{/each}
	</ul>
	<div class="pt-8"></div>
	<h2 class="text-xl font-bold">Jawaban Teratas</h2>
	<div class="pt-2"></div>
	<ul class="space-y-2">
		{#each data.user.DiscussionReply as reply}
			<li class="border-b border-gray-200 pb-3">
				<div class="flex justify-between gap-3">
					<span>
						Jawaban: {reply.reply}
					</span>
					<span class="flex items-center gap-2">
						<HeartIcon size={15} />
						{reply.likesCount}
					</span>
				</div>
				<div class="pt-1"></div>
				<p>Pertanyaan: {reply.discussion.title}</p>
			</li>
		{:else}
			<div class="text-center">Tidak ada jawaban</div>
		{/each}
	</ul>
</div>
