<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Edit2Icon, UserIcon } from 'lucide-svelte';
	import type { PageServerData } from './$types';
	import { Avatar, AvatarFallback, AvatarImage } from '$lib/components/ui/avatar';
	import { getInitialName } from '$lib/utils';
	import Logo from '$lib/images/logo.png';

	export let data: PageServerData;
</script>

<div class="col-span-12 flex items-center justify-between gap-6 rounded-sm bg-card p-6 shadow-md">
	<div>
		<h1 class="text-2xl font-bold">{data.kelas.name}</h1>
		<p>{data.kelas.siswa.length} Siswa</p>
	</div>
	<div class="flex gap-3">
		<Button>Beri Tugas</Button>
		<Button variant="ghost"><UserIcon size={15} /> Kelola Peserta</Button>
	</div>
</div>

<div class="pt-3"></div>
<h2>Daftar Tugas</h2>

{#each data.kelas.quizzes as quiz}
	<div class="col-span-12 flex items-end justify-between gap-6 rounded-sm bg-card p-6 shadow-md">
		<div class="flex items-center gap-6">
			<Avatar class="h-16 w-16 cursor-pointer">
				<AvatarImage src={Logo} alt="user avatar" class="h-16 w-16 bg-orange-100 object-contain" />
				<AvatarFallback>{getInitialName(quiz.title)}</AvatarFallback>
			</Avatar>
			<div>
				<h2 class="text-xl font-medium">{quiz.title}</h2>
			</div>
		</div>
		<div class="flex justify-center gap-3">
			<Button variant="secondary" href={`/dashboard/guru/library/${quiz.id}`}
				><Edit2Icon size={15} /></Button
			>
		</div>
	</div>
{/each}
