<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { CheckIcon, CopyIcon } from 'lucide-svelte';
	import type { PageServerData } from './$types';
	import Label from '$lib/components/ui/label/label.svelte';
	import { toast } from 'svelte-sonner';

	export let data: PageServerData;
</script>

<h1 class="text-2xl font-bold">Edit {data.kelas.name}</h1>

<div class="py-6"></div>

<div class="rounded-sm bg-card p-6 shadow-md">
	<form action="?/update" method="post">
		<Label for="name">Nama Kelas</Label>
		<Input id="name" placeholder="Nama Kelas" required name="name" value={data.kelas.name} />
		<div class="pt-3"></div>
		<p>
			Kode kelas: <span class="rounded-full bg-primary px-3 py-1 font-bold text-white"
				>{data.kelas.classCode}</span
			>
		</p>
		<div class="flex gap-3 pt-8">
			<Button
				type="button"
				on:click={(e) => {
					navigator.clipboard.writeText(data.kelas.classCode);
					toast('Kode disalin', { icon: CheckIcon });
				}}
				variant="secondary"
				class="flex gap-3"><CopyIcon size={15} /> Salin kode</Button
			>
			<Button type="submit">Simpan</Button>
		</div>
	</form>
</div>
