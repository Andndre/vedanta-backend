<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
</script>

<div class="flex flex-1 flex-col justify-center">
	<h1 class="text-2xl">Buat Quiz Baru</h1>
	<div class="pt-8"></div>
	<div class="flex flex-col gap-3 rounded-lg border border-gray-200 bg-card p-8 shadow-sm">
		<div>
			<h2>Berikan Judul</h2>
			<div class="pt-3"></div>
			<form action="?/create" method="POST">
				<Input placeholder="Judul" required name="title" />
				<div class="pt-3"></div>
				<Button type="submit">Selanjutnya</Button>
			</form>
		</div>
	</div>
</div>
