<script lang="ts">
	import AvatarFallback from "$lib/components/ui/avatar/avatar-fallback.svelte";
	import AvatarImage from "$lib/components/ui/avatar/avatar-image.svelte";
	import Avatar from "$lib/components/ui/avatar/avatar.svelte";
	import { Popover, PopoverTrigger } from "$lib/components/ui/popover";
	import PopoverContent from "$lib/components/ui/popover/popover-content.svelte";
	import { LogOut, Moon, Sun, User } from "lucide-svelte";
	import ModeToggle from "../ModeToggle.svelte";
	import Separator from "$lib/components/ui/separator/separator.svelte";

</script>
<header class="flex justify-end shadow-sm border-b px-4 lg:px-8 py-2">
	<div class="flex items-center gap-3">
		<Popover>
			<PopoverTrigger>
				<Avatar class="cursor-pointer">
					<AvatarImage
						src="https://avatars.githubusercontent.com/u/81848639?v=4"
						alt="user avatar"
					/>
					<AvatarFallback>AN</AvatarFallback>
				</Avatar>
			</PopoverTrigger>
			<PopoverContent class="p-0">
				<ul class="flex flex-col">
					<li>
						<a
							href="/settings/profile"
							class="flex px-4 py-4 items-center gap-3 transition-all hover:bg-accent"
						>
							<span>
								<User class="h-[16px]" />
							</span>{" "}
							Profil
						</a>
					</li>
					<li>
						<ModeToggle>
							<div class="flex px-4 py-4 items-center gap-3 transition-all hover:bg-accent cursor-pointer">
								<span>
									<Sun class="h-[16px] block transition-all dark:hidden" />
									<Moon class="h-[16px] hidden transition-all dark:block" />
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
							class="flex px-4 py-4 items-center gap-3 transition-all hover:bg-accent"
						>
							<span>
								<LogOut class="h-[16px]" />
							</span>{" "}
							Logout
						</a>
					</li>
				</ul>
			</PopoverContent>
		</Popover>
	</div>
</header>
