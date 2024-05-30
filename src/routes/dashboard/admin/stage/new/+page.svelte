<script>
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
</script>

<h1 class="text-2xl">Buat Stage Baru</h1>
<div class="pt-8"></div>
<form method="POST" action="?/create" enctype="multipart/form-data" class="flex flex-col gap-3">
	<Label>Judul</Label>
	<Input type="text" name="title" required />
	<Label>Deskripsi</Label>
	<Input type="text" name="description" required />
	<Label>Image</Label>
	<Input type="file" name="image" accept="image/*" required />
	<Button type="submit">Simpan</Button>
</form>
