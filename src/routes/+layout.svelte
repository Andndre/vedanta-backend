<script lang="ts">
	import '../app.pcss';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	import { Toaster } from '$lib/components/ui/sonner';

	injectSpeedInsights();
</script>

<Toaster />

<slot />
