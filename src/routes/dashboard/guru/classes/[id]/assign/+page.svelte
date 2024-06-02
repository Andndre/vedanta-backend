<script lang="ts">
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<h1 class="text-2xl font-semibold">Pilih Jenis Tugas</h1>

<div class="flex gap-3 pt-8">
	<a href="/dashboard/guru/library/">
		<div class="rounded-sm border border-gray-300 p-4 shadow-sm hover:bg-primary hover:text-white">
			Berikan Tugas Quiz
		</div>
	</a>
	<a href="/dashboard/guru/classes/{data.id}/assign-tugas-doa">
		<div class="rounded-sm border border-gray-300 p-4 shadow-sm hover:bg-primary hover:text-white">
			Berikan Tugas Doa
		</div>
	</a>
</div>
