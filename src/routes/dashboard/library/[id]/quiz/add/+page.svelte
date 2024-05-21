<script lang="ts">
	import type { PageServerData } from './$types';
	import Isian from './Isian.svelte';
	import PilihanGanda from './PilihanGanda.svelte';
	export let data: PageServerData;
</script>

{#if data.type == 'pilgan'}
	<PilihanGanda />
{:else if data.type == 'isian'}
	<Isian />
{:else if data.type == 'simakaudio'}
	<!-- Todo -->
{:else if data.type == 'cocokgambar'}
	<!-- Todo -->
{/if}
