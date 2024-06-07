<script lang="ts">
	import AvatarFallback from '$lib/components/ui/avatar/avatar-fallback.svelte';
	import AvatarImage from '$lib/components/ui/avatar/avatar-image.svelte';
	import Avatar from '$lib/components/ui/avatar/avatar.svelte';
	import { Popover, PopoverTrigger } from '$lib/components/ui/popover';
	import PopoverContent from '$lib/components/ui/popover/popover-content.svelte';
	import { LogOut, Moon, Sun, User } from 'lucide-svelte';
	import ModeToggle from '../ModeToggle.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import { getInitialName } from '$lib/utils';

	export let avatar: string | null;
	export let name: string;
</script>

<header class="flex justify-end border-b px-4 py-2 shadow-sm lg:px-8">
	<div class="flex items-center gap-3">
		<Popover>
			<PopoverTrigger>
				<Avatar class="cursor-pointer">
					<AvatarImage src={`https://cdn.hmjtiundiksha.com/${avatar}`} alt="user avatar" />
					<AvatarFallback>{getInitialName(name)}</AvatarFallback>
				</Avatar>
			</PopoverTrigger>
			<PopoverContent class="p-0">
				<ul class="flex flex-col">
					<li>
						<a
							href="/settings/profile"
							class="flex items-center gap-3 px-4 py-4 transition-all hover:bg-accent"
						>
							<span>
								<User class="h-[16px]" />
							</span>{' '}
							Profil
						</a>
					</li>
					<li>
						<ModeToggle>
							<div
								class="flex cursor-pointer items-center gap-3 px-4 py-4 transition-all hover:bg-accent"
							>
								<span>
									<Sun class="block h-[16px] transition-all dark:hidden" />
									<Moon class="hidden h-[16px] transition-all dark:block" />
								</span>
								Toggle Theme
							</div>
						</ModeToggle>
					</li>
					<li>
						<Separator />
					</li>
					<li>
						<a
							href="/logout"
							class="flex items-center gap-3 px-4 py-4 transition-all hover:bg-accent"
						>
							<span>
								<LogOut class="h-[16px]" />
							</span>{' '}
							Logout
						</a>
					</li>
				</ul>
			</PopoverContent>
		</Popover>
	</div>
</header>
