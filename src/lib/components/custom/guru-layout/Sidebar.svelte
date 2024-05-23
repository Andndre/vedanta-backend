<script lang="ts">
	import { page } from '$app/stores';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import { cn } from '$lib/utils';
	import { type Icon, ArrowLeft, ArrowRight, HomeIcon, BookIcon, UsersIcon } from 'lucide-svelte';
	import type { ComponentType } from 'svelte';
	import LucideIcons from '../LucideIcons.svelte';
	import logo from '$lib/images/logo.png';

	$: pathname = $page.url.pathname;

	type NavItem = {
		title: string;
		href: string;
		highlightMatch: boolean;
		icon: ComponentType<Icon>;
	};

	const sidebarNavItems: NavItem[] = [
		{
			title: 'Home',
			href: '/dashboard/guru',
			highlightMatch: true,
			icon: HomeIcon
		},
		{
			title: 'Perpustakaan',
			href: '/dashboard/guru/library',
			highlightMatch: false,
			icon: BookIcon
		},
		{
			title: 'Kelas',
			href: '/dashboard/guru/classes',
			highlightMatch: false,
			icon: UsersIcon
		}
	];

	let navbarOpen = true;

	function toggleNavbarOpen() {
		navbarOpen = !navbarOpen;
	}
</script>

<aside
	class={cn(
		'z-[100] flex min-h-screen max-w-[250px] flex-col border-r bg-card p-4 shadow-xl',
		navbarOpen ? 'fixed md:static' : 'static'
	)}
>
	<div class="mt-8 flex flex-col items-center">
		<img
			src={logo}
			alt="logo hmj"
			width={128}
			height={128}
			class={cn('object-contain transition-all', navbarOpen ? 'h-24 w-24' : 'h-7 w-7')}
		/>
		<p class={cn(navbarOpen ? 'mt-3 font-black dark:text-muted-foreground' : 'hidden')}>VEDANTA</p>
	</div>
	<Separator class="my-4" />
	<ul class="flex-1 space-y-1">
		{#each sidebarNavItems as e}
			<li title={e.title}>
				<a
					href={e.href}
					class={cn(
						'flex items-center gap-3',
						'rounded-md text-accent transition-all hover:bg-gray-200 dark:hover:bg-accent',
						(e.highlightMatch ? pathname == e.href : pathname.startsWith(e.href))
							? 'text-primary dark:bg-accent dark:text-accent-foreground'
							: 'text-muted-foreground',
						navbarOpen ? 'px-6 py-2' : 'p-2'
					)}
				>
					<LucideIcons icon={e.icon} />
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
			class="flex w-full gap-3 rounded-md bg-accent-foreground p-2 text-accent transition-all dark:bg-accent dark:text-accent-foreground"
			on:click={toggleNavbarOpen}
		>
			{#if navbarOpen}
				<ArrowLeft /> Tutup{' '}
			{:else}
				<ArrowRight />
			{/if}
		</button>
	</div>
</aside>
