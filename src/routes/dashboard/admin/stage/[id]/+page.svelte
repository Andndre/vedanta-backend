<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import { EditIcon, MessageCircleWarningIcon } from 'lucide-svelte';
	import YoutubePlayer from '$lib/components/custom/YotubePlayer.svelte';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<h1 class="text-2xl font-bold">Detail Stage</h1>
<div class="pt-8"></div>
<div class="flex flex-col gap-5">
	<div class="space-y-2">
		<Label>Cover:</Label>
		<img
			class="w-56"
			src={`https://cdn.hmjtiundiksha.com/${data.stageInfo.image_path}`}
			alt="cover"
		/>
		<div class="flex gap-3">
			<Input type="file" class="w-56" />
			<Button variant={'ghost'}>Perbarui Cover</Button>
		</div>
	</div>
	<form action="?/update" method="POST" class="space-y-3">
		<div>
			<Label>Judul</Label>
			<!-- <p>{data.stageInfo.title}</p> -->
			<Input name="title" value={data.stageInfo.title} />
		</div>
		<div>
			<Label>Deskripsi</Label>
			<Input name="description" value={data.stageInfo.description} />
		</div>

		<Button type="submit">Simpan</Button>
	</form>
	<div>
		<Label>Quiz</Label>
		<div class="flex items-center gap-2">
			<p>{data.stageInfo.Quiz.length > 0 ? `${data.stageInfo.Quiz.length} quiz` : 'Tidak Ada'}</p>
			<Button variant="secondary" href={`/dashboard/admin/stage/${data.stageInfo.id}/quiz`}
				><EditIcon size={15} /></Button
			>
			{#if !data.stageInfo.Quiz.length}
				<MessageCircleWarningIcon color="red" />
				<span class="text-sm">Quiz belum diisi</span>
			{/if}
		</div>
	</div>
	<div>
		<Label>Materi</Label>
		<div class="flex items-center gap-2">
			<p>{data.stageInfo.materi ? 'Ada' : 'Tidak Ada'}</p>
			<Button variant="secondary" href={`/dashboard/admin/stage/${data.stageInfo.id}/materi`}
				><EditIcon size={15} /></Button
			>
			{#if !data.stageInfo.materi}
				<MessageCircleWarningIcon color="red" />
				<span class="text-sm">Materi belum diisi</span>
			{/if}
		</div>
		{#if data.stageInfo.materi?.videoLink}
			<YoutubePlayer videoId={data.stageInfo.materi?.videoLink} />
		{/if}
	</div>
</div>
