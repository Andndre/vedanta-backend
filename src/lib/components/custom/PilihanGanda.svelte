<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import * as RadioGroup from '$lib/components/ui/radio-group';
</script>

<h1 class="text-2xl font-bold">Inputkan Pertanyaan Pilihan Ganda</h1>
<div class="py-3"></div>
<form action="?/save" method="POST" class="space-y-3 rounded-md p-8 shadow-md">
	<Input type="hidden" name="type" value="pilgan" />
	<div class="space-y-2">
		<Label>Pertanyaan</Label>
		<Input name="title" placeholder="Ketikkan Pertanyaan..." required />
	</div>
	<div class="space-y-2">
		<Label>Opsi <span class="italic">(tandai opsi yang benar)</span></Label>
		<RadioGroup.Root required>
			<div class="flex items-center space-x-3">
				<RadioGroup.Item value="a" id="r2" />
				<Input required class="border-none" name="optionOne" placeholder="Ketikkan opsi A" />
			</div>
			<div class="flex items-center space-x-3">
				<RadioGroup.Item value="b" id="r2" />
				<Input required class="border-none" name="optionTwo" placeholder="Ketikkan opsi B" />
			</div>
			<div class="flex items-center space-x-3">
				<RadioGroup.Item value="c" id="r2" />
				<Input required class="border-none" name="optionThree" placeholder="Ketikkan opsi C" />
			</div>
			<div class="flex items-center space-x-3">
				<RadioGroup.Item value="d" id="r2" />
				<Input required class="border-none" name="optionFour" placeholder="Ketikkan opsi D" />
			</div>
			<RadioGroup.Input required name="correct" />
		</RadioGroup.Root>
	</div>
	<Button type="submit">Simpan</Button>
	<!-- 
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
	</RadioGroup.Root> -->
</form>
