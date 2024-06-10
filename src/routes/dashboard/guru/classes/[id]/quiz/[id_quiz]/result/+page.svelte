<script lang="ts">
	import AvatarFallback from '$lib/components/ui/avatar/avatar-fallback.svelte';
	import AvatarImage from '$lib/components/ui/avatar/avatar-image.svelte';
	import Avatar from '$lib/components/ui/avatar/avatar.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { cn } from '$lib/utils';
	import type { PageServerData } from './$types';
	import * as XLSX from 'xlsx';

	export let data: PageServerData;

	function generateXLSX() {
		const headers = ['Nama', 'Nilai'];
		const rows = data.quiz.userQuizResult.map((item) => ({
			Nama: item.user.name,
			Nilai: item.grade !== undefined ? item.grade.toString() : 'Belum dinilai'
		}));

		const worksheet = XLSX.utils.json_to_sheet(rows, { header: headers });
		const workbook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(workbook, worksheet, 'Hasil Siswa');

		const filename = `${data.quiz.title.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '')}.xlsx`;

		XLSX.writeFile(workbook, filename);
	}
</script>

<h1 class="bold text-2xl">Hasil Tugas Siswa</h1>

<div class="py-4"></div>

<div class="flex justify-end">
	<Button on:click={generateXLSX}
		>Generate XLSX</Button
	>
</div>

<div class="py-4"></div>

{#each data.quiz.userQuizResult as results}
	<div class="col-span-12 flex items-center justify-between gap-6 rounded-sm bg-card p-6 shadow-md">
		<div class="flex items-center gap-6">
			<Avatar class="h-16 w-16 cursor-pointer">
				<AvatarImage
					src={results.user.profilePicture
						? 'https://cdn.hmjtiundiksha.com/' + results.user.profilePicture
						: 'https://ui-avatars.com/api/?name=' + results.user.name}
					alt="user avatar"
					class="h-16 w-16 bg-orange-100 object-contain"
				/>
				<AvatarFallback>{results.user.name}</AvatarFallback>
			</Avatar>
			<div>
				<h2 class="text-xl font-medium">{results.user.name}</h2>
				<div class="pt-3"></div>
				<span
					class={cn(
						'rounded-full px-3 py-1',
						results.correctCount == 0
							? 'bg-red-100'
							: results.correctCount == results.quiz.entries.length
								? 'bg-green-100'
								: 'bg-yellow-100'
					)}
				>
					{results.correctCount}/{results.quiz.entries.length}
				</span>
			</div>
		</div>
	</div>
{/each}
