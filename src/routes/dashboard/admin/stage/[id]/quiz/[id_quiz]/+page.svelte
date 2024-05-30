<script lang="ts">
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import type { PageServerData } from './$types';

	import QuizIcon from '$lib/images/icons/quiz.png';
	import { QuizType, type IsianSingkat, type PilihanGanda } from '$lib/types/quiz';
	import { PencilLine, PlusIcon } from 'lucide-svelte';
	import { goto } from '$app/navigation';

	export let data: PageServerData;

	const quizItemOption = [
		{
			icon: QuizIcon,
			title: 'Pilihan Ganda',
			href: `/dashboard/admin/stage/${data.idStage}/quiz/${data.quiz.id}/add?type=pilgan`
		},
		{
			icon: QuizIcon,
			title: 'Simak Audio',
			href: `/dashboard/admin/stage/${data.idStage}/quiz/${data.quiz.id}/add?type=simakaudio`
		},
		{
			icon: QuizIcon,
			title: 'Isian Singkat',
			href: `/dashboard/admin/stage/${data.idStage}/quiz/${data.quiz.id}/add?type=isian`
		},
		{
			icon: QuizIcon,
			title: 'Mencocokkan Gambar',
			href: `/dashboard/admin/stage/${data.idStage}/quiz/${data.quiz.id}/add?type=cocokgambar`
		}
	];

	let open = false;
	let idSelected: number | null = null;

	function isPilgan(obj: any): obj is PilihanGanda {
		return typeof obj === 'object' && obj !== null && 'type' in obj && obj.type === 'pilgan';
	}

	function isIsian(obj: any): obj is IsianSingkat {
		return typeof obj === 'object' && obj !== null && 'type' in obj && obj.type === 'isian';
	}

	function isSimakAudio(obj: any): obj is IsianSingkat {
		return typeof obj === 'object' && obj !== null && 'type' in obj && obj.type === 'simakaudio';
	}

	function isCocokGambar(obj: any): obj is IsianSingkat {
		return typeof obj === 'object' && obj !== null && 'type' in obj && obj.type === 'cocokgambar';
	}
</script>

<Dialog.Root bind:open>
	<!-- <Dialog.Trigger class={buttonVariants({ variant: 'outline' })}>Edit Profile</Dialog.Trigger> -->
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Hapus Soal Ini?</Dialog.Title>
			<Dialog.Description>Perubahan yang dilakukan tidak dapat dikembalikan</Dialog.Description>
		</Dialog.Header>
		<Dialog.Footer>
			<Button
				on:click={() => {
					open = false;
					goto(`/dashboard/admin/stage/${data.idStage}/quiz/${data.quiz.id}/${idSelected}/delete`);
				}}>Konfirmasi</Button
			>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>

<div class="flex flex-1 flex-col justify-center">
	<a
		href={`/dashboard/admin/stage/${data.idStage}/quiz/${data.quiz.id}/edit`}
		class="flex items-center gap-3"
	>
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
			<div
				class="flex justify-between gap-3 rounded-lg border border-gray-200 bg-white p-8 shadow-sm"
			>
				<div>
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
				<Button variant="ghost" on:click={() => ((open = true), (idSelected = item.id))}
					>Hapus</Button
				>
			</div>
			<div class="pt-3"></div>
		{:else if isIsian(item.questionModel)}
			<div
				class="flex justify-between gap-3 rounded-lg border border-gray-200 bg-white p-8 shadow-sm"
			>
				<div class="space-y-3">
					<p class="font-medium">{i + 1}. {item.questionModel.title}</p>
					<p>Jawaban: {item.questionModel.correct}</p>
				</div>
				<Button variant="ghost" on:click={() => ((open = true), (idSelected = item.id))}
					>Hapus</Button
				>
			</div>
			<div class="pt-3"></div>
		{:else if isSimakAudio(item.questionModel)}
			<div
				class="flex justify-between gap-3 rounded-lg border border-gray-200 bg-white p-8 shadow-sm"
			>
				<div>
					<p class="font-medium">{i + 1}. (audio)</p>
					<p class="italic">Simak Audio</p>
				</div>
				<Button variant="ghost" on:click={() => ((open = true), (idSelected = item.id))}
					>Hapus</Button
				>
			</div>
			<div class="pt-3"></div>
		{:else if isCocokGambar(item.questionModel)}
			<div
				class="flex justify-between gap-3 rounded-lg border border-gray-200 bg-white p-8 shadow-sm"
			>
				<div>
					<p class="font-medium">{i + 1}. {item.questionModel.title}</p>
					<p class="italic">Cocok Gambar</p>
				</div>
				<Button variant="ghost" on:click={() => ((open = true), (idSelected = item.id))}
					>Hapus</Button
				>
			</div>
			<div class="pt-3"></div>
		{:else}
			<div class="flex flex-col gap-3 rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
				{item.questionModel}
			</div>
		{/if}
	{/if}
{/each}
