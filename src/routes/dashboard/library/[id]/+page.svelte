<script lang="ts">
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import type { PageServerData } from './$types';

	import QuizIcon from '$lib/images/icons/quiz.png';

	export let data: PageServerData;

	const quizItemOption = [
		{
			icon: QuizIcon,
			title: 'Pilihan Ganda',
			href: `/dashboard/library/${data.quiz.id}/quiz/add?type=pilgan`
		},
		{
			icon: QuizIcon,
			title: 'Simak Audio',
			href: `/dashboard/library/${data.quiz.id}/quiz/add?type=simakaudio`
		},
		{
			icon: QuizIcon,
			title: 'Isian Singkat',
			href: `/dashboard/library/${data.quiz.id}/quiz/add?type=isian`
		},
		{
			icon: QuizIcon,
			title: 'Mencocokkan Gambar',
			href: `/dashboard/library/${data.quiz.id}/quiz/add?type=cocokgambar`
		}
	];
</script>

<div class="flex flex-1 flex-col justify-center">
	<h1 class="text-2xl">{data.quiz?.title}</h1>
	<div class="pt-8"></div>
	<div class="flex flex-col gap-3 rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
		<div class="flex justify-between">
			<h2>{data.quiz?.entries.length} Quiz</h2>
			<Dialog.Root>
				<Dialog.Trigger class={buttonVariants({ variant: 'outline' })}>Edit Profile</Dialog.Trigger>
				<Dialog.Content class="sm:max-w-[425px]">
					<Dialog.Header>
						<Dialog.Title>Tambahkan Item Quiz</Dialog.Title>
						<Dialog.Description>Tambahkan item quiz baru pada quiz ini</Dialog.Description>
					</Dialog.Header>
					<div class="grid gap-4 py-4">
						<div class="pt-3"></div>
						<div class="flex flex-wrap gap-3">
							{#each quizItemOption as item}
								<Button
									href={item.href}
									variant="ghost"
									class="flex w-full justify-start gap-2 p-1 px-[5px] pr-3 lg:w-[45%]"
								>
									<img src={item.icon} alt="" class="w-[32px]" />
									<span>{item.title}</span>
								</Button>
							{/each}
						</div>
					</div>
					<Dialog.Footer>
						<p class="text-sm">Silakan pilih salah satu</p>
					</Dialog.Footer>
				</Dialog.Content>
			</Dialog.Root>
		</div>
		<div></div>
	</div>
</div>
