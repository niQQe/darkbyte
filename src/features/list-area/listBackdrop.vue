<template>
	<div
		class="absolute top-0 left-0 w-full"
		style="height: 400px; z-index: 0"
		:style="`background-image: linear-gradient(rgba(${dropColorCss}, 0.6), rgb(32 34 37))`"
	></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { dropColorCss } from '@/global/posts';

export default defineComponent({
	setup() {
		return { dropColorCss };
	},
});
</script>

<style scoped></style>
