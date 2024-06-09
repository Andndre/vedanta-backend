<script lang="ts">
	import { Avatar } from '$lib/components/ui/avatar';
	import AvatarFallback from '$lib/components/ui/avatar/avatar-fallback.svelte';
	import AvatarImage from '$lib/components/ui/avatar/avatar-image.svelte';
	import { LogOutIcon, User } from 'lucide-svelte';
	import type { PageServerData } from './$types';
	import { getInitialName } from '$lib/utils';
	import { CheckIcon, CopyIcon } from 'lucide-svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { toast } from 'svelte-sonner';

	export let data: PageServerData;
</script>

<h1 class="text-3xl font-bold">Kelola Siswa</h1>

<div class="pt-8"></div>

<div class="rounded-sm bg-card p-6 shadow-md">
	<div class="flex justify-between">
		<div class="flex flex-col gap-3">
			<h2 class="text-xl">Daftar Peserta</h2>
			<p>Kelola daftar siswa pada kelas ini</p>
		</div>
		<Button
			type="button"
			on:click={(e) => {
				navigator.clipboard.writeText(data.kelas.classCode);
				toast('Kode kelas disalin ke Clipboard', { icon: CheckIcon });
			}}
			variant="secondary"
			class="flex gap-3"><CopyIcon size={15} /> Salin kode</Button
		>
	</div>
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
			<div class="flex gap-3">
				<Button href="/dashboard/guru/classes/{data.kelas.id}/members/{siswa.user.id}"
					><User size={15} class="mr-2" /> Detail</Button
				>
				<form action="?/remove" method="post">
					<input type="hidden" name="id" value={siswa.user.id} />
					<Button type="submit" variant="ghost" class="flex items-center gap-2"
						><LogOutIcon size={15} class="mr-2" /> Keluarkan</Button
					>
				</form>
			</div>
		</div>
	{/each}
</div>
