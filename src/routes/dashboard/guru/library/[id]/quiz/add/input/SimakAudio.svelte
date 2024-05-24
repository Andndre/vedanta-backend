<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';

	import { Input } from '$lib/components/ui/input';
	import * as RadioGroup from '$lib/components/ui/radio-group';

	let question: File;
	let opsi1 = 'Ketikkan Pilihan 1';
	let opsi2 = 'Ketikkan Pilihan 2';
	let opsi3 = 'Ketikkan Pilihan 3';
	let opsi4 = 'Ketikkan Pilihan 4';
</script>

<form action="?/save" method="POST">
	<div class="flex justify-end">
		<input type="hidden" value="pilgan" name="type" />
		<input type="hidden" bind:value={opsi1} name="optionOne" />
		<input type="hidden" bind:value={opsi2} name="optionTwo" />
		<input type="hidden" bind:value={opsi3} name="optionThree" />
		<input type="hidden" bind:value={opsi4} name="optionFour" />
		<Button type="submit">Simpan</Button>
	</div>

	<div class="pt-3"></div>

	<div class="rounded-md bg-purple-900 p-4">
		<div class="flex h-44 w-full flex-col items-center justify-center rounded-sm bg-purple-950">
			<Input type="file" />
		</div>
	</div>

	<div class="pt-2"></div>

	<RadioGroup.Root class="grid w-full grid-cols-12 gap-2">
		<div
			class="col-span-3 flex aspect-square flex-col items-center justify-between gap-2 rounded-md bg-green-300"
		>
			<div class="flex w-full justify-end p-3"><RadioGroup.Item value="a" id="r1" /></div>
			<div class="flex h-full items-center">
				<p contenteditable="true" class="w-full p-2 text-center outline-none">
					{opsi1}
				</p>
			</div>
		</div>
		<div
			class="col-span-3 flex aspect-square flex-col items-center justify-between gap-2 rounded-md bg-red-300"
		>
			<div class="flex w-full justify-end p-3"><RadioGroup.Item value="b" id="r2" /></div>
			<div class="flex h-full items-center">
				<p contenteditable="true" class="w-full p-2 text-center outline-none">
					{opsi2}
				</p>
			</div>
		</div>
		<div
			class="col-span-3 flex aspect-square flex-col items-center justify-between gap-2 rounded-md bg-yellow-200"
		>
			<div class="flex w-full justify-end p-3"><RadioGroup.Item value="c" id="r3" /></div>
			<div class="flex h-full items-center">
				<p contenteditable="true" class="w-full p-2 text-center outline-none">
					{opsi3}
				</p>
			</div>
		</div>
		<div
			class="col-span-3 flex aspect-square flex-col items-center justify-between gap-2 rounded-md bg-blue-300"
		>
			<div class="flex w-full justify-end p-3"><RadioGroup.Item value="d" id="r4" /></div>
			<div class="flex h-full items-center">
				<p contenteditable="true" class="w-full p-2 text-center outline-none">
					{opsi4}
				</p>
			</div>
		</div>
		<RadioGroup.Input name="correct" required />
	</RadioGroup.Root>
</form>
