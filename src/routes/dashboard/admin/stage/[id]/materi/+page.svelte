<script lang="ts">
	import YouTube from '$lib/components/custom/YotubePlayer.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
	let videoId: string = data.stage.materi?.videoLink || '';
</script>

<h1 class="text-2xl font-bold">Materi</h1>

<div class="pt-8"></div>

<form action="?/update" method="POST" class="flex flex-col gap-3">
	<Label>Judul</Label>
	<Input name="title" value={data.stage.materi?.title} />
	<Label>Deskripsi</Label>
	<Input name="description" value={data.stage.materi?.description} />
	<Label>Video ID (hanya ID)</Label>
	<Input name="videoLink" bind:value={videoId} />

	<Button type="submit">Perbarui</Button>
</form>

<div class="pt-8"></div>
{#if videoId}
	<YouTube {videoId} />
{/if}
