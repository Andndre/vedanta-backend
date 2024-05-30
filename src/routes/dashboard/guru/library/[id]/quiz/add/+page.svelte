<script lang="ts">
	import type { PageServerData } from './$types';
	import Isian from './Isian.svelte';
	import MencocokkanGambar from './MencocokkanGambar.svelte';
	import PilihanGanda from './PilihanGanda.svelte';
	import SimakAudio from './SimakAudio.svelte';
	export let data: PageServerData;
</script>

{#if data.type == 'pilgan'}
	<PilihanGanda />
{:else if data.type == 'isian'}
	<Isian />
{:else if data.type == 'simakaudio'}
	<SimakAudio />
{:else if data.type == 'cocokgambar'}
	<MencocokkanGambar />
{:else}
	Harap inputkan gambar dengan benar
{/if}
