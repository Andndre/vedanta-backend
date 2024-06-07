<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import type { PageServerData } from './$types';

	export let data: PageServerData;

	let progress = data.mission.maxProgress;
</script>

<h1 class="text-2xl">Edit Mission</h1>
<div class="pt-6"></div>
<form action="?/update" method="POST" enctype="multipart/form-data">
	<Label>Max Progress</Label>
	<Input bind:value={progress} name="maxProgress" placeholder="Max Progress" required />
	<div class="pt-3"></div>
	<Label>Hadiah Point</Label>
	<Input name="rewardStars" placeholder="Hadiah Point" required value={data.mission.rewardStars} />
	<div class="pt-3"></div>
	<Button type="submit">Simpan</Button>
</form>

<div class="pt-6">
	<h2 class="text-xl">Preview:</h2>
	<div class="pt-2">
		<p>{data.mission.missionType.name.replaceAll('{x}', `${progress}`)}</p>
	</div>
</div>
