<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<h1 class="text-2xl">Edit Doa</h1>
<div class="pt-6"></div>
<form action="?/update" method="POST" enctype="multipart/form-data">
	<Input name="title" placeholder="Judul Doa" value={data.doa.title} required />
	<div class="pt-3"></div>
	<Textarea name="body" placeholder="Isi Doa" rows={10} required value={data.doa.body}></Textarea>
	<div class="pt-3"></div>
	<Input name="pelafalan" type="file" accept="audio/*" />
	<div class="pt-3"></div>
	{#if data.doa.pelafalanFile}
		<audio controls src={`https://cdn.hmjtiundiksha.com/${data.doa.pelafalanFile}`} />
	{/if}
	<div class="pt-3"></div>
	<Button type="submit">Simpan</Button>
</form>
