<script lang="ts">
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
	Selamat Datang {data.user?.name}
</h1>
<p class="leading-7 [&:not(:first-child)]:mt-6">
	Ini adalah halaman guru yang dimana anda dapat mengelola data dalam aplikasi seperti kelas dan
	penugasan, materi umum, quiz umum, dan hadiah umum.
</p>
<blockquote class="mt-6 border-l-2 pl-6 italic">Jaga akun anda dengan baik!</blockquote>
