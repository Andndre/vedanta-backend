<script lang="ts">
	import { page } from "$app/stores";
	import Separator from "$lib/components/ui/separator/separator.svelte";
	import { cn } from "$lib/utils";
	import { Table2, type Icon, ArrowLeft, ArrowRight } from "lucide-svelte";
	import type { ComponentType } from "svelte";
	import LucideIcons from "../LucideIcons.svelte";

	const pathname = $page.url.pathname

	type NavItem = {
		title: string,
		href: string,
		icon: ComponentType<Icon>
	}

	const sidebarNavItems: NavItem[] = [
		{
			title: "Dashboard",
			href: "/",
			icon: Table2,
		}
	];

	let navbarOpen = false;

	function toggleNavbarOpen() {
		navbarOpen = !navbarOpen;
	}
</script>
<aside
		class={cn(
			"bg-card-foreground dark:bg-black dark:text-white text-card border-r shadow-xl min-h-screen max-w-[250px] p-4 z-[100] flex flex-col",
			navbarOpen ? "fixed md:static" : "static"
		)}
	>
		<div class="flex flex-col items-center mt-8">
			<img
				src={"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1024px-Google_%22G%22_logo.svg.png"}
				alt="logo hmj"
				width={128}
				height={128}
				class={cn(
					"transition-all",
					navbarOpen ? "w-16 h-16" : "w-7 h-7"
				)}
			/>
			<p class={cn(navbarOpen ? "font-medium text-muted dark:text-muted-foreground mt-3" : "hidden")}>
				VEDANTA ADMIN
			</p>
		</div>
		<Separator class="my-4" />
		<ul class="space-y-1 flex-1">
			{#each sidebarNavItems as e}
				<li
					title={e.title}
					class={cn(
						"hover:bg-accent-foreground dark:hover:bg-accent text-accent transition-all rounded-md",
						pathname == e.href
							? "dark:bg-accent text-accent dark:text-accent-foreground"
							: "text-muted-foreground",
						navbarOpen ? "px-4 py-2" : "p-2"
					)}
				>
					<a href={e.href} class="flex items-center gap-3">
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
