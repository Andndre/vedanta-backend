<script lang="ts">
	import logo from '$lib/images/logo.png';
	import introImg from '$lib/images/intro.svg';
	export let title: string;
</script>

<div class="flex">
	<div class="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
		<div class="sm:mx-auto sm:w-full sm:max-w-sm">
			<img class="mx-auto h-20 w-auto" src={logo} alt="Vedanta Logo" />
			<h2
				class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white lg:text-left"
			>
				{title}
			</h2>
			<p
				class="mt-2 text-center text-sm font-semibold leading-6 text-gray-600 dark:text-gray-400 lg:text-left"
			>
				Halo, selamat datang
			</p>
		</div>
		<div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
			<slot></slot>
		</div>
	</div>
	<div class="hidden flex-1 p-16 lg:block">
		<img class="h-full w-full" src={introImg} alt="Hello!" />
	</div>
</div>
