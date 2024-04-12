<script lang="ts">
	import LoginForm from '$lib/components/custom/auth-layout/LoginForm.svelte';
	import AuthPage from '$lib/components/custom/auth-layout/AuthPage.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<AuthPage title="Masuk ke Akun">
	<LoginForm data={data.form}/>
</AuthPage>
