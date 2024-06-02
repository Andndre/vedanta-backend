<script lang="ts">
	import { onMount } from 'svelte';
	let file;
	let fileName = '';
	let fileUrl = '';

	export let name: string;
	export let title: string;

	// @ts-ignore
	function handleFileChange(event) {
		const selectedFile = event.target.files[0];
		if (selectedFile) {
			file = selectedFile;
			fileName = file.name;

			const reader = new FileReader();
			reader.onload = (e) => {
				// @ts-ignore
				fileUrl = e.target.result;
			};
			reader.readAsDataURL(file);
		} else {
			file = null;
			fileName = '';
			fileUrl = '';
		}
	}
</script>

<section class="w-full items-center">
	<div class="mx-auto max-w-sm items-center overflow-hidden rounded-lg bg-card shadow-md">
		<div class="px-4 py-4">
			<div
				id="image-preview-{name}"
				class="mx-auto max-w-sm cursor-pointer items-center rounded-lg border-2 border-dashed border-gray-400 bg-gray-100 p-6 text-center dark:bg-gray-700"
			>
				<input
					id={name}
					type="file"
					class="hidden"
					accept="image/*"
					{name}
					on:change={handleFileChange}
				/>
				<label for={name} class="cursor-pointer">
					{#if fileUrl}
						<img src={fileUrl} class="mx-auto max-h-48 rounded-lg" alt="preview" />
					{:else}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="mx-auto mb-4 h-8 w-8 text-gray-700 dark:text-gray-300"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
							/>
						</svg>
						<h5 class="mb-2 text-lg font-medium tracking-tight text-gray-700 dark:text-gray-300">
							{title}
						</h5>
					{/if}
					<span class="z-50 bg-gray-200 text-gray-500">{fileName}</span>
				</label>
			</div>
		</div>
	</div>
</section>

<style>
	.hidden {
		display: none;
	}
	.cursor-pointer {
		cursor: pointer;
	}
</style>
