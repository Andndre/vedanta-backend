<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import Label from '$lib/components/ui/label/label.svelte';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<h1 class="text-2xl">Edit Hadiah</h1>
<div class="pt-6"></div>
<form action="?/update" method="POST" enctype="multipart/form-data">
	<Label>Nama</Label>
	<Input name="name" placeholder="Nama Hadiah" value={data.hadiah.name} required />
	<div class="pt-3"></div>
	<Label>Harga (point)</Label>
	<Input name="prize" type="number" placeholder="Harga Point" value={data.hadiah.prize} required />
	<div class="pt-3"></div>
	<Label>Gambar</Label>
	<Input name="thumbnail" type="file" accept="image/*" />
	<div class="pt-3"></div>
	{#if data.hadiah.thumbnail}
		<img src={`https://cdn.hmjtiundiksha.com/${data.hadiah.thumbnail}`} alt="Gambar Hadiah" />
	{/if}
	<div class="pt-3"></div>
	<Button type="submit">Simpan</Button>
</form>
