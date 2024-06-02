<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	let title: string;
	let correct: string = '';
</script>

<h1 class="text-2xl font-bold">Inputkan Pertanyaan Isian Singkat</h1>
<div class="py-3"></div>

<form action="?/save" method="POST" class="space-y-3 rounded-md p-8 shadow-md">
	<Input type="hidden" name="type" value="isian" />
	<div class="space-y-2">
		<Label>Pertanyaan</Label>
		<Input name="title" placeholder="Ketikkan Pertanyaan..." required />
	</div>
	<div class="space-y-2">
		<Label>Jawaban Singkat <span class="italic">(satu kata)</span></Label>
		<Input name="correct" placeholder="Ketikkan Jawaban..." required />
	</div>
	<Button type="submit">Simpan</Button>
</form>
