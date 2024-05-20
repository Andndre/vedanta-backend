<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { Input } from '$lib/components/ui/input';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<h1 class="text-2xl">Edit</h1>
<div class="pt-8"></div>
<div class="flex flex-col gap-3 rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
	<form action="?/update" method="POST">
		<Input placeholder="Judul" required name="title" value={data.quiz?.title} />
		<div class="pt-3"></div>
		<Button type="submit">Simpan</Button>
	</form>
</div>
