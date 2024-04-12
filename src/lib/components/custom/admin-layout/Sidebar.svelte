<script lang="ts">
	import { page } from "$app/stores";
	import Separator from "$lib/components/ui/separator/separator.svelte";
	import { cn } from "$lib/utils";
	import { type Icon, ArrowLeft, ArrowRight, HomeIcon, BookIcon, UsersIcon } from "lucide-svelte";
	import type { ComponentType } from "svelte";
	import LucideIcons from "../LucideIcons.svelte";
	import logo from "$lib/images/logo.png";

	$: pathname = $page.url.pathname

	type NavItem = {
		title: string,
		href: string,
		icon: ComponentType<Icon>
	}

	const sidebarNavItems: NavItem[] = [
		{
			title: "Home",
			href: "/dashboard",
			icon: HomeIcon,
		},
		{
			title: "Perpustakaan",
			href: "/dashboard/library",
			icon: BookIcon,
		},
		{
			title: "Kelas",
			href: "/dashboard/classes",
			icon: UsersIcon,
		}
	];

	let navbarOpen = true;

	function toggleNavbarOpen() {
		navbarOpen = !navbarOpen;
	}
</script>
<aside
		class={cn(
			"bg-card border-r shadow-xl min-h-screen max-w-[250px] p-4 z-[100] flex flex-col",
			navbarOpen ? "fixed md:static" : "static"
		)}
	>
		<div class="flex flex-col items-center mt-8">
			<img
				src={logo}
				alt="logo hmj"
				width={128}
				height={128}
				class={cn(
					"transition-all",
					navbarOpen ? "w-16 h-16" : "w-7 h-7"
				)}
			/>
			<p class={cn(navbarOpen ? "dark:text-muted-foreground mt-3 font-black" : "hidden")}>
				VEDANTA
			</p>
		</div>
		<Separator class="my-4" />
		<ul class="space-y-1 flex-1">
			{#each sidebarNavItems as e}
				<li
					title={e.title}
				>
					<a href={e.href} class={cn("flex items-center gap-3", "hover:bg-gray-200 dark:hover:bg-accent text-accent transition-all rounded-md",
					pathname == e.href
						? "dark:bg-accent text-primary dark:text-accent-foreground"
						: "text-muted-foreground",
					navbarOpen ? "px-4 py-2" : "p-2")}>
						<LucideIcons icon={e.icon}/>
						{#if navbarOpen}
							 <span>{e.title}</span>
						{/if}
					</a>
				</li>
			{/each}
		</ul>
		<div>
			<Separator class="my-4" />
			<button
				class="bg-accent-foreground dark:bg-accent text-accent dark:text-accent-foreground transition-all rounded-md p-2 flex gap-3 w-full"
				on:click={toggleNavbarOpen}
			>
				{#if navbarOpen}
					<ArrowLeft /> Tutup{" "}
				{:else}
					<ArrowRight />
				{/if}
			</button>
		</div>
	</aside>
