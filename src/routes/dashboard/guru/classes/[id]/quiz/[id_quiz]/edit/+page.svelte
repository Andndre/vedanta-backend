<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import type { PageServerData } from './$types';
	import Label from '$lib/components/ui/label/label.svelte';
	import Switch from '$lib/components/ui/switch/switch.svelte';

	export let data: PageServerData;
</script>

<h1 class="text-2xl font-bold">Edit Quiz {data.quiz.title}</h1>

<div class="py-6"></div>

<div class="rounded-sm bg-card p-6 shadow-md">
	<form action="?/update" method="post">
		<Label for="name">Nama Kelas</Label>
		<Input id="name" placeholder="Nama Kelas" required name="title" value={data.quiz.title} />
		<div class="pt-3"></div>
		<div class="flex items-center space-x-2">
			<Switch id="isdraft" name="isDraft" />
			<Label for="isdraft">Draft</Label>
		</div>
		<div class="flex gap-3 pt-8">
			<Button type="submit">Simpan</Button>
		</div>
	</form>
</div>
