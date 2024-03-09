<script lang="ts">
  import { toggleMode } from "mode-watcher";
</script>

<button class="contents" on:click={() => toggleMode()}>
	<slot></slot>
</button>
