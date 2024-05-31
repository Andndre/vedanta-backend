<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { Input } from '$lib/components/ui/input';
	let title: string;
	let correct: string = '';
</script>

<form action="?/save" method="POST">
	<div class="flex justify-end">
		<input type="hidden" value="isian" name="type" />
		<input type="hidden" bind:value={title} name="title" required />
		<input type="hidden" bind:value={correct} name="correct" required />
		<Button type="submit">Simpan</Button>
	</div>

	<div class="pt-3"></div>

	<div class="rounded-md bg-purple-900 p-4">
		<div class="flex h-44 w-full flex-col items-center justify-center rounded-sm bg-purple-950">
			<p
				class="w-full text-center text-3xl text-purple-100 outline-none"
				contenteditable="true"
				bind:textContent={title}
			>
				Ketikkan Pertanyaan Disini
			</p>
		</div>
		<div class="pt-2"></div>
		<Input
			class="mx-auto w-full max-w-72 border-none bg-purple-950 text-purple-100 outline-none"
			bind:value={correct}
			placeholder="Jawaban yang benar"
		/>

		<div class="pt-2"></div>

		<div
			class="relative flex h-44 w-full items-center justify-center gap-2 rounded-sm bg-purple-800"
		>
			<div class="absolute left-2 top-2 text-purple-500">Pratinjau siswa</div>
			{#each correct.split('') as char}
				<div class="aspect-square w-[32px] bg-purple-950 text-center text-purple-100">{char}</div>
			{/each}
		</div>
	</div>
</form>
