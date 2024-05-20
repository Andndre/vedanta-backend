<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import QuizIcon from '$lib/images/icons/quiz.png';
	import DoaIcon from '$lib/images/icons/doa.png';
	import Frame from './Frame.svelte';
	import { Input } from '$lib/components/ui/input';
	import { PilihanGanda, Quiz } from '$lib/types/quiz';

	enum Frames {
		SET_NAME,
		HOME,
		PILIHAN_GANDA,
		ISIAN_SINGKAT,
		SIMAK_AUDIO,
		MENCOCOKKAN_GAMBAR,
		TUGASAKAN_DOA,
	}
	let currentStage: Frames = Frames.SET_NAME;
	let namaTugas = ''

	let quizzes: Quiz[] = [
		new PilihanGanda('testing', 'a', ['helo', 'hello'])
	]

	const quizItemOption = [
		{
			icon: QuizIcon,
			title: 'Pilihan Ganda',
			onclick: () => {
				currentStage = Frames.PILIHAN_GANDA
			}
		},
		{
			icon: QuizIcon,
			title: 'Simak Audio',
			onclick: () => {
				currentStage = Frames.SIMAK_AUDIO
			}
		},
		{
			icon: QuizIcon,
			title: 'Isian Singkat',
			onclick: () => {
				currentStage = Frames.ISIAN_SINGKAT
			}
		},
		{
			icon: QuizIcon,
			title: 'Mencocokkan Gambar',
			onclick: () => {
				currentStage = Frames.MENCOCOKKAN_GAMBAR
			}
		}
	];

	const doaItemOption = [
		{
			icon: DoaIcon,
			title: 'Tugakan Doa',
			onclick: () => {
				currentStage = Frames.TUGASAKAN_DOA
			}
		}
	];

</script>

{#if currentStage == Frames.SET_NAME}
<Frame title="Tambahkan Item Perpustakaan">
	<div>
		<h2>Berikan Judul</h2>
		<div class="pt-3"></div>
		<form action="?/create" method="POST">
			<Input placeholder="Judul" required name="title"/>
			<div class="pt-3"></div>
			<Button type="submit">Selanjutnya</Button>
		</form>
	</div>
</Frame>
{:else if  currentStage == Frames.HOME}
<Frame title="Pilih Tipe Item">
	<div>
		<h2>Fitur Quiz</h2>
		<div class="pt-3"></div>
		<div class="flex flex-wrap gap-3">
			{#each quizItemOption as item}
				<Button
					on:click={item.onclick}
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
					on:click={item.onclick}
					variant="ghost"
					class="flex w-full justify-start gap-2 p-1 px-[5px] pr-3 lg:w-[45%]"
				>
					<img src={item.icon} alt="" class="w-[32px]" />
					<span>{item.title}</span>
				</Button>
			{/each}
		</div>
	</div>
</Frame>
{/if}
