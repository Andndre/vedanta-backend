<script lang="ts">
	import type { PageServerData } from './$types';
	import { cn } from '$lib/utils';
	import { CheckIcon, XIcon } from 'lucide-svelte';

	let options = ['optionOne', 'optionTwo', 'optionThree', 'optionFour'];
	let opt = ['a', 'b', 'c', 'd'];

	export let data: PageServerData;
</script>

<h1 class="bold text-2xl">Detail Jawaban Quiz</h1>

<div class="py-4"></div>

<div class="flex flex-col gap-3 rounded-lg border border-gray-200 bg-card p-8 shadow-sm">
	<p>Skor: {(data.quizz.correctCount / data.quizz.entries.length) * 100}</p>
	<p>Benar: {data.quizz.correctCount}</p>
	<p>Salah: {data.quizz.entries.length - data.quizz.correctCount}</p>
	<div class="pt-8"></div>
	<h2 class="text-xl font-bold">Jawaban</h2>
	<div class="pt-2"></div>
	<ul>
		{#each data.quizz.entries as entry, j}
			<li class="border-b border-gray-200 py-3">
				{#if entry.model.type == 'pilgan'}
					<p class="flex items-center gap-3">
						{j + 1}. {entry.model.title}
						{#if entry.model.correct == entry.answer}
							<CheckIcon size={15} class="text-green-500" />
						{:else}
							<XIcon size={15} class="text-red-500" />
						{/if}
					</p>
					<div class="pt-3"></div>
					{#each options as option, i}
						<div
							class={cn(
								'flex rounded-md p-2',
								entry.model.correct == opt[i]
									? 'bg-green-100'
									: entry.model.correct != entry.answer && entry.answer == opt[i]
										? 'bg-red-100'
										: 'bg-transparent'
							)}
						>
							<p>{opt[i]}. {entry.model[option]}</p>
						</div>
					{/each}
				{:else if entry.model.type == 'isian'}
					<p class="flex items-center gap-3">
						{j + 1}. {entry.model.title}
						{#if entry.model.correct == entry.answer}
							<CheckIcon size={15} class="text-green-500" />
						{:else}
							<XIcon size={15} class="text-red-500" />
						{/if}
					</p>
					<div class="pt-3"></div>

					<div
						class={cn(
							'flex rounded-md p-2',
							entry.model.correct == entry.answer ? 'bg-green-100' : 'bg-red-100'
						)}
					>
						<span>Jawaban: {entry.answer}</span>
					</div>
				{:else if entry.model.type == 'simakaudio'}
					<p class="flex items-center gap-3">
						{j + 1}
						{#if entry.model.correct == entry.answer}
							<CheckIcon size={15} class="text-green-500" />
						{:else}
							<XIcon size={15} class="text-red-500" />
						{/if}
					</p>
					.
					<audio src="https://cdn.hmjtiundiksha.com/{entry.model.audioUrl}" controls></audio>
					<div class="pt-3"></div>
					{#each options as option, i}
						<div
							class={cn(
								'flex rounded-md p-2',
								entry.model.correct == opt[i]
									? 'bg-green-100'
									: entry.model.correct != entry.answer && entry.answer == opt[i]
										? 'bg-red-100'
										: 'bg-transparent'
							)}
						>
							<p>{opt[i]}. {entry.model[option]}</p>
						</div>
					{/each}
				{:else if entry.model.type == 'cocokgambar'}
					<p class="flex items-center gap-3">
						{j + 1}. {entry.model.title}
						{#if entry.model.correct == entry.answer}
							<CheckIcon size={15} class="text-green-500" />
						{:else}
							<XIcon size={15} class="text-red-500" />
						{/if}
					</p>
					<div class="pt-3"></div>
					<div class="grid grid-cols-2 gap-3">
						{#each options as option, i}
							<div
								class={cn(
									'flex rounded-md p-2',
									entry.model.correct == opt[i]
										? 'bg-green-100'
										: entry.model.correct != entry.answer && entry.answer == opt[i]
											? 'bg-red-100'
											: 'bg-transparent'
								)}
							>
								<p>{opt[i]}.</p>
								<img
									class="aspect-square w-full object-contain"
									src="https://cdn.hmjtiundiksha.com/{entry.model[option]}"
									alt=""
								/>
							</div>
						{/each}
					</div>
				{/if}
			</li>
		{/each}
	</ul>
</div>
