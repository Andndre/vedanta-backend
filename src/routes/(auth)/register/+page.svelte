<script lang="ts">
	import RegisterForm from '$lib/components/custom/auth-layout/RegisterForm.svelte';
	import AuthPage from '$lib/components/custom/auth-layout/AuthPage.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<AuthPage title="Daftarkan Akun">
	<RegisterForm data={data.form} />
</AuthPage>
