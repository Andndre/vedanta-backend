<script lang="ts">
  import logo from "$lib/images/logo.png";
  import introImg from "$lib/images/intro.svg";
	export let title: string;
</script>

<div class="flex">
  <div class="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 flex-1">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-20 w-auto" src="{logo}" alt="Vedanta Logo">
      <h2 class="mt-10 text-center lg:text-left text-2xl font-bold leading-9 tracking-tight text-gray-900">{title}</h2>
      <p class="mt-2 text-center lg:text-left text-sm font-semibold leading-6 text-gray-600">Halo, selamat datang</p>
    </div>
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <slot></slot>
    </div>
  </div>
  <div class="hidden lg:block flex-1 p-16">
    <img class="h-full w-full" src="{introImg}" alt="Hello!">
  </div>
</div>
