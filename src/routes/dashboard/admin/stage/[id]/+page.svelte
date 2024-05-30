<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
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
	<div>
		<Label>Judul</Label>
		<p>{data.stageInfo.title}</p>
	</div>
	<div>
		<Label>Deskripsi</Label>
		<p>{data.stageInfo.description}</p>
	</div>
	<div>
		<Label>Materi</Label>
		<p>{data.stageInfo.materi ? 'Ada' : 'Tidak Ada'}</p>
	</div>
</div>
