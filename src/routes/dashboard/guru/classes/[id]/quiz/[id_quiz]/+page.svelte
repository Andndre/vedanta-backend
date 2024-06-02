<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import Switch from '$lib/components/ui/switch/switch.svelte';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<h1 class="text-2xl font-bold">Sunting Tugas</h1>

<div class="py-4"></div>

<form action="?/save" method="POST" class="space-y-3 rounded-md bg-white p-8 shadow-md">
	<div class="space-y-2">
		<Label>Judul</Label>
		<Input placeholder="Judul" required name="title" value={data.quiz.title} />
	</div>
	<div class="space-y-2">
		<Label>Tenggat</Label>
		<Input type="date" placeholder="Tenggat" required name="dueDate" value={data.quiz.dueDate} />
	</div>
	<div class="flex items-center space-x-2">
		<Switch id="airplane-mode" name="isDraft" checked={data.quiz.isDraft} />
		<Label for="airplane-mode">Terlihat oleh siswa</Label>
	</div>
	<div class="flex gap-3">
		<Button variant="secondary" href={`/dashboard/guru/library/${data.quiz.id}`}>Edit Soal</Button>
		<Button type="submit">Simpan</Button>
	</div>
</form>
