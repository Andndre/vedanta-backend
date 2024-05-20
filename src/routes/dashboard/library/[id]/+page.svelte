<script lang="ts">
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import type { PageServerData } from './$types';

	import QuizIcon from '$lib/images/icons/quiz.png';
	import type { IsianSingkat, PilihanGanda } from '$lib/types/quiz';
	import { PencilLine, PlusIcon } from 'lucide-svelte';

	export let data: PageServerData;

	const quizItemOption = [
		{
			icon: QuizIcon,
			title: 'Pilihan Ganda',
			href: `/dashboard/library/${data.quiz.id}/quiz/add?type=pilgan`
		},
		{
			icon: QuizIcon,
			title: 'Simak Audio',
			href: `/dashboard/library/${data.quiz.id}/quiz/add?type=simakaudio`
		},
		{
			icon: QuizIcon,
			title: 'Isian Singkat',
			href: `/dashboard/library/${data.quiz.id}/quiz/add?type=isian`
		},
		{
			icon: QuizIcon,
			title: 'Mencocokkan Gambar',
			href: `/dashboard/library/${data.quiz.id}/quiz/add?type=cocokgambar`
		}
	];

	function isPilgan(obj: any): obj is PilihanGanda {
		return typeof obj === 'object' && obj !== null && 'type' in obj && obj.type === 'pilgan';
	}

	function isIsian(obj: any): obj is IsianSingkat {
		return typeof obj === 'object' && obj !== null && 'type' in obj && obj.type === 'isian';
	}
</script>

<div class="flex flex-1 flex-col justify-center">
	<a href={`/dashboard/library/${data.quiz.id}/edit`} class="flex items-center gap-3">
		<h1 class="text-2xl">{data.quiz?.title}</h1>
		<PencilLine size={15} />
	</a>
	<div class="pt-8"></div>
	<div class="flex flex-col gap-3 rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
		<div class="flex items-center justify-between">
			<h2 class="text-xl font-semibold">{data.quiz?.entries.length} Pertanyaan</h2>
			<Dialog.Root>
				<Dialog.Trigger class={buttonVariants({ variant: 'default' })}
					><PlusIcon size={15} class="mr-3" /> Tambahkan Item</Dialog.Trigger
				>
				<Dialog.Content class="sm:max-w-[425px]">
					<Dialog.Header>
						<Dialog.Title>Tambahkan Item Quiz</Dialog.Title>
						<Dialog.Description>Tambahkan item quiz baru pada quiz ini</Dialog.Description>
					</Dialog.Header>
					<div class="grid gap-4 py-4">
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
					<Dialog.Footer>
						<p class="text-sm">Silakan pilih salah satu</p>
					</Dialog.Footer>
				</Dialog.Content>
			</Dialog.Root>
		</div>
	</div>
</div>
<div class="pt-3"></div>
{#each data.quiz.entries as item, i}
	{#if item.questionModel && typeof item.questionModel == 'object'}
		{#if isPilgan(item.questionModel)}
			<div class="flex flex-col gap-3 rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
				<p class="font-medium">{i + 1}. {item.questionModel.title}</p>
				<div class="grid grid-cols-12">
					<div class="col-span-6">
						<p>a. {item.questionModel.optionOne}</p>
					</div>
					<div class="col-span-6">
						<p>b. {item.questionModel.optionTwo}</p>
					</div>
					<div class="col-span-6">
						<p>c. {item.questionModel.optionThree}</p>
					</div>
					<div class="col-span-6">
						<p>d. {item.questionModel.optionFour}</p>
					</div>
				</div>
				<p>Jawaban: {item.questionModel.correct}</p>
			</div>
			<div class="pt-3"></div>
		{:else if isIsian(item.questionModel)}
			<div class="flex flex-col gap-3 rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
				<p class="font-medium">{i + 1}. {item.questionModel.title}</p>
				<p>Jawaban: {item.questionModel.correct}</p>
			</div>
			<div class="pt-3"></div>
		{:else}
			<div class="flex flex-col gap-3 rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
				{item.questionModel}
			</div>
		{/if}
	{/if}
{/each}
