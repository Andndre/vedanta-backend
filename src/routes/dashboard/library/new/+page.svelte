<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import QuizIcon from '$lib/images/icons/quiz.png';
	import DoaIcon from '$lib/images/icons/doa.png';

	const quizItemOption = [
		{
			icon: QuizIcon,
			title: 'Pilihan Ganda',
			href: '/dashboard/library/new/quiz'
		},
		{
			icon: QuizIcon,
			title: 'Simak Audio',
			href: '/dashboard/library/new/doa'
		},
		{
			icon: QuizIcon,
			title: 'Isian Singkat',
			href: '/dashboard/library/new/doa'
		},
		{
			icon: QuizIcon,
			title: 'Mencocokkan Gambar',
			href: '/dashboard/library/new/doa'
		}
	];

	const doaItemOption = [
		{
			icon: DoaIcon,
			title: 'Tugakan Doa',
			href: '/dashboard/library/new/quiz'
		}
	];
</script>

<div class="flex flex-1 flex-col justify-center">
	<h1 class="text-2xl">Buat Quiz Baru</h1>
	<div class="pt-8"></div>
	<div class="flex flex-col gap-3 rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
		<div>
			<h2>Fitur Quiz</h2>
			<div class="pt-3"></div>
			<div class="flex flex-wrap gap-3">
				{#each quizItemOption as item}
					<Button
						href={item.href}
						variant="ghost"
						class="flex w-full justify-start gap-2 p-1 px-[5px] pr-3 lg:w-[45%]"
					>
						<img src={item.icon} alt="" class="w-[32px]" />
						<span>{item.title}</span>
					</Button>
				{/each}
			</div>
		</div>
		<div class="pt-4"></div>
		<div>
			<h2>Fitur Doa</h2>
			<div class="pt-3"></div>
			<div class="flex flex-wrap gap-3">
				{#each doaItemOption as item}
					<Button
						href={item.href}
						variant="ghost"
						class="flex w-full justify-start gap-2 p-1 px-[5px] pr-3 lg:w-[45%]"
					>
						<img src={item.icon} alt="" class="w-[32px]" />
						<span>{item.title}</span>
					</Button>
				{/each}
			</div>
		</div>
	</div>
</div>
