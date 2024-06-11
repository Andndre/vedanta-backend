<script lang="ts">
	import AvatarFallback from '$lib/components/ui/avatar/avatar-fallback.svelte';
	import AvatarImage from '$lib/components/ui/avatar/avatar-image.svelte';
	import Avatar from '$lib/components/ui/avatar/avatar.svelte';
	import type { PageServerData } from './$types';
	import { getInitialName } from '$lib/utils';
	import Button from '$lib/components/ui/button/button.svelte';
	import { CheckIcon, MailIcon } from 'lucide-svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import { goto } from '$app/navigation';

	export let data: PageServerData;
	let idSelected: number | null = null;

	let filter: 'semua' | 'belum-diterima' | 'sudah-diterima' = 'semua';

	let open = false;
</script>

<Dialog.Root bind:open>
	<!-- <Dialog.Trigger class={buttonVariants({ variant: 'outline' })}>Edit Profile</Dialog.Trigger> -->
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Verifikasi Hadiah Sudah Diterima?</Dialog.Title>
			<Dialog.Description>Perubahan yang dilakukan tidak dapat dikembalikan</Dialog.Description>
		</Dialog.Header>
		<Dialog.Footer>
			<Button
				on:click={() => {
					open = false;
					goto(`/dashboard/admin/hadiah/${idSelected}/confirm`);
				}}>Konfirmasi</Button
			>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>

<h1 class="text-2xl font-bold">Permintaan Penukaran</h1>

<div class="py-4"></div>

<div class="rounded-sm bg-card p-6 shadow-md">
	<!-- filter -->
	<div class="flex gap-3">
		<Button variant={filter === 'semua' ? 'default' : 'outline'} on:click={() => (filter = 'semua')}
			>Semua</Button
		>
		<Button
			variant={filter === 'belum-diterima' ? 'default' : 'outline'}
			on:click={() => (filter = 'belum-diterima')}>Belum Diterima</Button
		>
		<Button
			variant={filter === 'sudah-diterima' ? 'default' : 'outline'}
			on:click={() => (filter = 'sudah-diterima')}>Sudah Diterima</Button
		>
	</div>
	<div class="pt-3"></div>
	<ul class="space-y-2">
		{#each data.permintaan as p}
			{#if (filter === 'sudah-diterima' && p.status == 'SUCCESS') || (filter === 'belum-diterima' && p.status == 'PENDING') || filter === 'semua'}
				<li class="border-b p-4">
					<div class="flex justify-between">
						<div class="flex items-center gap-3">
							<Avatar>
								<AvatarImage
									src={p.user.profilePicture
										? 'https://cdn.hmjtiundiksha.com/' + p.user.profilePicture
										: null}
									alt="user avatar"
									class="h-16 w-16 bg-orange-100 object-contain"
								/>
								<AvatarFallback>{getInitialName(p.user.name)}</AvatarFallback>
							</Avatar>
							<span
								><span class="text-green font-bold">{p.user.name}</span>
								ingin menukarkan <span class="font-bold">{p.gift.name}</span></span
							>
						</div>
						<div class="flex gap-3">
							{#if p.status == 'PENDING'}
								<Button
									on:click={() => {
										idSelected = p.id;
										open = true;
									}}
									variant="outline"><CheckIcon size={15} class="mr-2" /> Diterima</Button
								>
							{:else if p.status == 'SUCCESS'}
								<Button
									on:click={() => {
										goto(`/dashboard/admin/hadiah/${p.id}/delete-confirm`);
									}}
									variant="outline"
									><CheckIcon size={15} class="mr-2" /> Izinkan Menukar Kembali</Button
								>
							{/if}
							<Button
								href={`mailto:${p.user.email}?subject=Permintaan Penukaran&body=Permintaan penukaran ${p.gift.name} sedang diproses.`}
								variant="outline"><MailIcon size={15} class="mr-2" /> Kirim Email</Button
							>
						</div>
					</div>
				</li>
			{/if}
		{/each}
	</ul>
</div>
