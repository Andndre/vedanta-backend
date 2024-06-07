<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<h1 class="text-2xl">Edit Doa</h1>
<div class="pt-6"></div>
<form action="?/update" method="POST" enctype="multipart/form-data">
	<Label>Max Progress</Label>
	<Input name="maxProgress" placeholder="Max Progress" value={data.mission.maxProgress} required />
	<div class="pt-3"></div>
	<Label>Hadiah Point</Label>
	<Input name="rewardStars" placeholder="Hadiah Point" required value={data.mission.rewardStars} />
	<div class="pt-3"></div>
	<Button type="submit">Simpan</Button>
</form>
