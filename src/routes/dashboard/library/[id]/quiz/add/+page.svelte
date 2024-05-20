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
{/if}
