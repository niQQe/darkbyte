<template>
	<div class="bg-black bg-opacity-20 flex flex-col relative z-10 flex-1">
		<slot />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	setup() {
		return {};
	},
});
</script>

<style scoped></style>
