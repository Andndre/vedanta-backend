<script lang="ts">
	import { Avatar } from '$lib/components/ui/avatar';
	import AvatarFallback from '$lib/components/ui/avatar/avatar-fallback.svelte';
	import AvatarImage from '$lib/components/ui/avatar/avatar-image.svelte';
	import { LogOutIcon, User } from 'lucide-svelte';
	import type { PageServerData } from './$types';
	import { getInitialName } from '$lib/utils';
	import Button from '$lib/components/ui/button/button.svelte';

	export let data: PageServerData;
</script>

<h1 class="text-3xl font-bold">Kelola Siswa</h1>

<div class="pt-8"></div>

<div class="rounded-sm bg-card p-6 shadow-md">
	<h2 class="text-xl">Daftar Peserta</h2>
	<p>Kelola daftar siswa pada kelas ini</p>
	<div class="pt-8"></div>

	{#each data.kelas.siswa as siswa}
		<div class="flex items-center justify-between gap-3 border-b border-gray-200 py-3">
			<div class="flex items-center gap-4">
				<Avatar class="h-12 w-12 cursor-pointer">
					<AvatarImage
						src="https://cdn.hmjtiundiksha.com/{siswa.user.profilePicture}"
						alt="user avatar"
						class="h-12 w-12 bg-orange-100 object-contain"
					/>
					<AvatarFallback>{getInitialName(siswa.user.name)}</AvatarFallback>
				</Avatar>
				<div>
					<h2 class="text-lg">{siswa.user.name}</h2>
				</div>
			</div>
			<form action="?/remove" method="post">
				<input type="hidden" name="id" value={siswa.user.id} />
				<Button type="submit" variant="ghost" class="flex items-center gap-2"
					><LogOutIcon size={15} /> Keluarkan</Button
				>
			</form>
		</div>
	{/each}
</div>
