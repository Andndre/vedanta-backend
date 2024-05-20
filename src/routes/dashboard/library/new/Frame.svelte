<script lang="ts">
    export let title: string;
</script>

<div class="flex flex-1 flex-col justify-center">
	<h1 class="text-2xl">{title}</h1>
	<div class="pt-8"></div>
	<div class="flex flex-col gap-3 rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
		<slot></slot>
	</div>
</div>
