<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import * as RadioGroup from '$lib/components/ui/radio-group';
	import ImageInput from './ImageInput.svelte';
</script>

<h1 class="text-2xl font-bold">Inputkan Pertanyaan Mencocokkan Gambar</h1>
<div class="py-3"></div>
<form
	action="?/save"
	method="POST"
	enctype="multipart/form-data"
	class="space-y-3 rounded-md bg-card p-8 shadow-md"
>
	<Input type="hidden" name="type" value="cocokgambar" class="space-y-3 rounded-md p-8 shadow-md" />
	<div class="space-y-2">
		<Label>Pertanyaan</Label>
		<Input name="title" placeholder="Ketikkan Pertanyaan..." required />
	</div>
	<div class="space-y-2">
		<Label>Opsi <span class="italic">(tandai opsi yang benar)</span></Label>
		<RadioGroup.Root required value="b" class="grid grid-cols-2 gap-4">
			<div class="flex flex-col items-start gap-3">
				<RadioGroup.Item value="a" id="r2" />
				<ImageInput name="optionOne" title="Opsi A" />
			</div>
			<div class="flex flex-col items-start gap-3">
				<RadioGroup.Item value="b" id="r2" />
				<ImageInput name="optionTwo" title="Opsi B" />
			</div>
			<div class="flex flex-col items-start gap-3">
				<RadioGroup.Item value="c" id="r2" />
				<ImageInput name="optionThree" title="Opsi C" />
			</div>
			<div class="flex flex-col items-start gap-3">
				<RadioGroup.Item value="d" id="r2" />
				<ImageInput name="optionFour" title="Opsi D" />
			</div>
			<RadioGroup.Input required name="correct" value="b" />
		</RadioGroup.Root>
	</div>
	<Button type="submit">Simpan</Button>

	<!-- <div class="flex justify-end">
		<input type="hidden" value="cocokgambar" name="type" />
		<input type="hidden" bind:value={title} name="title" />
		<Button type="submit">Simpan</Button>
	</div>

	<div class="pt-3"></div>

	<div class="rounded-md bg-purple-900 p-4">
		<div class="flex h-44 w-full flex-col items-center justify-center rounded-sm bg-purple-950">
			<p
				class="w-full text-center text-3xl text-purple-100 outline-none"
				contenteditable="true"
				bind:textContent={title}
			>
				Ketikkan Pertanyaan Disini
			</p>
		</div>
	</div>

	<div class="pt-2"></div>

	<RadioGroup.Root class="grid w-full grid-cols-12 gap-2">
		<div
			class="col-span-3 flex aspect-square flex-col items-center justify-between gap-2 rounded-md bg-green-300"
		>
			<div class="flex w-full justify-end p-3"><RadioGroup.Item value="a" id="r1" /></div>
			<div class="flex h-full items-center">
				<input type="file" name="optionOne" />
			</div>
		</div>
		<div
			class="col-span-3 flex aspect-square flex-col items-center justify-between gap-2 rounded-md bg-red-300"
		>
			<div class="flex w-full justify-end p-3"><RadioGroup.Item value="b" id="r2" /></div>
			<div class="flex h-full items-center">
				<input type="file" name="optionTwo" />
			</div>
		</div>
		<div
			class="col-span-3 flex aspect-square flex-col items-center justify-between gap-2 rounded-md bg-yellow-200"
		>
			<div class="flex w-full justify-end p-3"><RadioGroup.Item value="c" id="r3" /></div>
			<div class="flex h-full items-center">
				<input type="file" name="optionThree" />
			</div>
		</div>
		<div
			class="col-span-3 flex aspect-square flex-col items-center justify-between gap-2 rounded-md bg-blue-300"
		>
			<div class="flex w-full justify-end p-3"><RadioGroup.Item value="d" id="r4" /></div>
			<div class="flex h-full items-center">
				<input type="file" name="optionFour" />
			</div>
		</div>
		<RadioGroup.Input name="correct" required />
	</RadioGroup.Root> -->
</form>
