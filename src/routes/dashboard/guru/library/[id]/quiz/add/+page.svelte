<script lang="ts">
	import type { PageServerData } from './$types';
	import Isian from '$lib/components/custom/Isian.svelte';
	import MencocokkanGambar from '$lib/components/custom/MencocokkanGambar.svelte';
	import PilihanGanda from '$lib/components/custom/PilihanGanda.svelte';
	import SimakAudio from '$lib/components/custom/SimakAudio.svelte';
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
