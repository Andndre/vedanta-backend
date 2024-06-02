<script lang="ts">
	import Avatar from '$lib/components/ui/avatar/avatar.svelte';
	import AvatarFallback from '$lib/components/ui/avatar/avatar-fallback.svelte';
	import AvatarImage from '$lib/components/ui/avatar/avatar-image.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import type { PageServerData } from './$types';
	import { getInitialName } from '$lib/utils';

	export let data: PageServerData;
	let profilePictureUrl = data.user.profilePicture;

	function handleProfilePictureChange(event: Event) {
		const input = event.target as HTMLInputElement;
		if (input.files && input.files[0]) {
			const file = input.files[0];
			profilePictureUrl = URL.createObjectURL(file);
		}
	}
</script>

<div class="mx-auto max-w-7xl px-3">
	<div class="py-8"></div>
	<h1 class="text-3xl font-bold">Profile</h1>
	<div class="py-4"></div>
	<div class="flex max-w-4xl flex-wrap-reverse gap-3 rounded-md bg-white p-6 py-4 shadow-md">
		<form action="?/save" class="min-w-52 flex-[2] space-y-3" method="POST">
			<div class="space-y-2">
				<Label>Nama</Label>
				<Input placeholder="Name" required name="name" value={data.user.name} />
			</div>
			<div class="space-y-2">
				<Label>Email</Label>
				<Input placeholder="Email" disabled value={data.user.email} />
			</div>
			<Button type="submit">Simpan</Button>
		</form>
		<form
			class="flex-1 space-y-3"
			action="?/saveProfilePicture"
			method="POST"
			enctype="multipart/form-data"
		>
			<Label>Gambar Profil</Label>
			<Avatar class="mx-auto h-32 w-32 cursor-pointer">
				<AvatarImage
					class="h-32 w-32 object-cover"
					src={'https://cdn.hmjtiundiksha.com/' + profilePictureUrl}
					alt="user avatar"
				/>
				<AvatarFallback>{getInitialName(data.user.name)}</AvatarFallback>
			</Avatar>
			<div class="py-4"></div>
			<Input
				type="file"
				placeholder="Profile Picture"
				required
				name="profilePicture"
				accept="image/*"
				on:change={handleProfilePictureChange}
			/>
			<Button type="submit">Simpan</Button>
		</form>
	</div>
</div>
