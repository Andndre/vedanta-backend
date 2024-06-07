<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import type { PageServerData } from './$types';
	import * as RadioGroup from '$lib/components/ui/radio-group';

	export let data: PageServerData;
</script>

<h1 class="text-2xl">Tambahkan Misi</h1>
<div class="pt-6"></div>

<!-- radio group with loop -->

<form action="?/create" method="POST">
	<Label>Pilih Jenis Misi</Label>
	<div class="pt-3"></div>
	<RadioGroup.Root>
		{#each data.missionTypes as type}
			<div class="flex items-center space-x-3">
				<RadioGroup.Item value={`${type.id}`}>{type.name}</RadioGroup.Item>
				<Label>{type.name}</Label>
			</div>
		{/each}
		<RadioGroup.Input name="missionTypeId" required />
	</RadioGroup.Root>
	<div class="pt-4"></div>
	<Label>Progress Misi</Label>
	<Input name="maxProgress" placeholder="Progress Misi" required type="number" />
	<div class="pt-3"></div>
	<Label>Hadiah Bintang</Label>
	<Input name="rewardStars" placeholder="Hadiah Bintang" required type="number" />
	<div class="pt-3"></div>
	<Button type="submit">Simpan</Button>
</form>
