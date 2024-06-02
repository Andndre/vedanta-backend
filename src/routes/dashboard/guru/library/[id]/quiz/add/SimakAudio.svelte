<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import * as RadioGroup from '$lib/components/ui/radio-group';
</script>

<h1 class="text-2xl font-bold">Inputkan Pertanyaan Simak Audio</h1>
<div class="py-3"></div>
<form
	action="?/save"
	method="POST"
	enctype="multipart/form-data"
	class="space-y-3 rounded-md p-8 shadow-md"
>
	<Input type="hidden" name="type" value="simakaudio" class="space-y-3 rounded-md p-8 shadow-md" />
	<div class="space-y-2">
		<Label>Audio</Label>
		<span class="text-sm italic">(audio yang harus didengarkan oleh siswa)</span>
		<Input name="audio" type="file" accept="audio/*" class="max-w-52" required />
	</div>
	<div class="space-y-2">
		<Label>Pertanyaan</Label>
		<Input name="title" placeholder="Ketikkan Pertanyaan..." required />
	</div>
	<div class="space-y-2">
		<Label>Opsi <span class="italic">(tandai opsi yang benar)</span></Label>
		<RadioGroup.Root required value="b">
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
			<RadioGroup.Input required name="correct" value="b" />
		</RadioGroup.Root>
	</div>
	<Button type="submit">Simpan</Button>
</form>
