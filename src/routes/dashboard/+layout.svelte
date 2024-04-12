<script lang="ts">
	import AdminSidebar from '$lib/components/custom/admin-layout/Sidebar.svelte';
	import Footer from '$lib/components/custom/Footer.svelte';
	import AdminHeader from '$lib/components/custom/admin-layout/Header.svelte';

	import { ModeWatcher } from "mode-watcher";
</script>

<ModeWatcher />

<div class="flex min-h-screen w-full">
	<AdminSidebar />
	<div class="flex flex-1 flex-col">
		<!-- Header component -->
		<AdminHeader />

		<div class="flex-1 px-4 py-8 md:px-8">
			<!-- Slot for page content -->
			<slot />
		</div>

		<!-- Footer component -->
		<Footer />
	</div>
</div>
