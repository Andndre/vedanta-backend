<script lang="ts">
	import Button from "$lib/components/ui/button/button.svelte";
	import NoData from "$lib/images/no-data.svg";
	type Quiz = {
			name: string
	}
	let quizes: Quiz[] = []
</script>

<div class="flex justify-between items-center">
	<div>
		<h1 class="text-3xl font-bold">Perpustakaan</h1>
		<p class="text-gray-600 mt-3">Semua quiz yang pernah anda buat</p>
	</div>
	<Button>Buat Baru</Button>
</div>

<div class="pt-12"></div>

{#each quizes as quiz}
	<p>{quiz.name}</p>
{:else}
	<div class="flex flex-col justify-center items-center h-[calc(100vh-21rem)]">
		<img src={NoData} alt="No Data" class="h-52" />
		<p class="mx-4 mt-5">Belum ada Quiz</p>
	</div>
{/each}
