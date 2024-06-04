<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import Label from '$lib/components/ui/label/label.svelte';
	import { Textarea } from '$lib/components/ui/textarea';
</script>

<h1 class="text-2xl">Tambahkan Hadiah</h1>
<div class="pt-6"></div>
<form action="?/create" method="POST" enctype="multipart/form-data">
	<Label>Nama</Label>
	<Input name="name" placeholder="Nama Hadiah" required />
	<div class="pt-3"></div>
	<Label>Harga (point)</Label>
	<Input name="prize" type="number" placeholder="Harga Point" required />
	<div class="pt-3"></div>
	<Label>Gambar</Label>
	<Input name="thumbnail" type="file" accept="image/*" required />
	<div class="pt-3"></div>
	<Button type="submit">Simpan</Button>
</form>
