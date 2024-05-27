<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<div class="flex justify-between">
	<h1 class="text-2xl">Berikan Quiz</h1>
</div>

<div class="pt-8"></div>

<div class="rounded-sm bg-card p-6 shadow-md">
	<div>
		<h2 class="text-xl">Berikan Judul</h2>
	</div>
	<div class="pt-4"></div>
	<form class="flex gap-3" action="?/create" method="post">
		<Input placeholder="Judul" required name="title" value={data.quiz.title} />
		<Button type="submit">Beri Tugas</Button>
	</form>
</div>
