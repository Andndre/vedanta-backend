<script lang="ts">
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';
	import type { PageServerData } from './$types';

	export let data: PageServerData;

	let portfolio: HTMLCanvasElement;
	const chartData = {
		labels: [
			'Quiz Diselesaikan',
			'Pertanyaan Ganesh Bot',
			'Bertanya pada Diskusi',
			'Menjawab pada Diskusi'
		],
		datasets: [
			{
				label: 'Data Siswa',
				data: [
					data.user.quizCompleted,
					data.user.ganeshBotMessages,
					data.user.discussionsAsked,
					data.user.discussionsAnswered
				],
				backgroundColor: ['#7000e1', '#fc8800', '#00b0e8'],
				// hoverOffset: 4,
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
</div>
