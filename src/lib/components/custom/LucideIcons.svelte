<script lang="ts">
	import { type Icon } from 'lucide-svelte'; 
	import type { ComponentType } from "svelte";

	export let icon: ComponentType<Icon>;
</script>

<svelte:component this={icon} />
