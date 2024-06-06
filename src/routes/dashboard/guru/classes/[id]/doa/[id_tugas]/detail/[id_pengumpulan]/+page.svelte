<script lang="ts">
	import { Button } from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import Label from '$lib/components/ui/label/label.svelte';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<h1 class="text-2xl font-bold">Detail Pengumpulan</h1>

<div class="py-6"></div>

<h2 class="text-xl font-bold">Belum dinilai</h2>
<div class="pt-3"></div>
<form action="?/grade" method="POST">
	<Label>Beri nilai</Label>
	<div class="pt-2"></div>
	<div class="flex gap-2">
		<Input type="number" name="grade" value={data.detail.grade} />
		<Button type="submit">Simpan</Button>
	</div>
</form>
<div class="pt-3"></div>

<Label>Nama</Label>
<p>{data.detail.user.name}</p>
<div class="pt-3"></div>
<Label>Audio</Label>
<div class="pt-3"></div>
<audio controls src={`https://cdn.hmjtiundiksha.com/${data.detail.fileRecorded}`}></audio>
<div class="pt-3"></div>
<Label>Dokumentasi</Label>
<div class="pt-3"></div>
<img
	src="https://cdn.hmjtiundiksha.com/{data.detail.documentationImage}"
	alt=""
	class="w-full max-w-2xl"
/>
