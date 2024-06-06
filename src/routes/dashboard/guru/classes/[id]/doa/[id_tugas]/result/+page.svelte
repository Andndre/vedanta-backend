<script lang="ts">
	import { Avatar, AvatarFallback, AvatarImage } from '$lib/components/ui/avatar';
	import { waktuYangLalu } from '$lib/utils';
	import type { PageServerData } from './$types';
	import { getInitialName } from '$lib/utils';
	import { Button } from '$lib/components/ui/button';
	import { Edit2Icon, EyeIcon } from 'lucide-svelte';

	export let data: PageServerData;
</script>

<h1 class="text-2xl font-bold">Hasil Siswa</h1>

<div class="py-6"></div>

{#each data.tugas.usersHomework as item}
	<div class="col-span-12 flex items-end justify-between gap-6 rounded-sm bg-card p-6 shadow-md">
		<div class="flex items-center gap-6">
			<Avatar class="h-16 w-16 cursor-pointer">
				<AvatarImage
					src={`https://cdn.hmjtiundiksha.com/${item.user.profilePicture}`}
					alt="user avatar"
					class="h-16 w-16 bg-orange-100 object-contain"
				/>
				<AvatarFallback>{getInitialName(item.user.name)}</AvatarFallback>
			</Avatar>
			<div>
				<h2 class="text-xl font-medium">{item.user.name}</h2>
				<div class="mt-3 flex flex-col gap-3">
					<span class="text-gray-600">Dibuat {waktuYangLalu(item.createdAt)}</span>
				</div>
			</div>
		</div>
		<div class="flex justify-center gap-3">
			<Button
				variant="secondary"
				href={`/dashboard/guru/classes/${data.kelasId}/doa/${data.tugasId}/detail/${item.id}`}
				><EyeIcon size={15} /></Button
			>
		</div>
	</div>
{/each}
