<script lang="ts">
	import GuruSideBar from '$lib/components/custom/guru-layout/Sidebar.svelte';
	import Footer from '$lib/components/custom/Footer.svelte';
	import AdminHeader from '$lib/components/custom/admin-layout/Header.svelte';

	import { ModeWatcher } from 'mode-watcher';
</script>

<ModeWatcher />

<div class="relative flex min-h-screen w-full">
	<GuruSideBar />
	<div class="flex flex-1 flex-col">
		<!-- Header component -->
		<AdminHeader />

		<div class="flex-1 px-4 py-8 sm:px-8 md:px-16 lg:px-36">
			<!-- Slot for page content -->
			<slot />
		</div>

		<!-- Footer component -->
		<Footer />
	</div>
</div>
