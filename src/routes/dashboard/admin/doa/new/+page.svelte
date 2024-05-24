<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
</script>

<h1 class="text-2xl">Tambahkan Doa</h1>
<div class="pt-6"></div>
<form action="?/create" method="POST" enctype="multipart/form-data">
	<Input name="title" placeholder="Judul Doa" required />
	<div class="pt-3"></div>
	<Textarea name="body" placeholder="Isi Doa" rows={10} required></Textarea>
	<div class="pt-3"></div>
	<Input name="pelafalan" type="file" accept="audio/*" required />
	<div class="pt-3"></div>
	<Button type="submit">Simpan</Button>
</form>
