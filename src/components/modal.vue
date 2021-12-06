<template>
	<div
		class="absolute top-0 left-0 delay-200 transition-all duration-500 w-full h-full flex"
		style="z-index: 999"
		:class="{ 'bg-black bg-opacity-50': fadeIn }"
	>
		<div
			v-click-away="handleClickaway"
			class="m-auto rounded-lg p-4 delay-200 transform transition-all duration-500"
			:class="fadeIn ? 'translate-y-5 opacity-100' : 'translate-y-0 opacity-0'"
			style="background: #fff"
		>
			<component :is="currentModal"></component>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { currentModal } from '@/global/modal';

export default defineComponent({
	setup() {
		const fadeIn = ref(false);
		const handleClickaway = () => {
			if (Object.keys(currentModal.value)) currentModal.value = '';
		};
		onMounted(() => {
			setTimeout(() => {
				fadeIn.value = true;
			}, 1);
		});
		return {
			handleClickaway,
			fadeIn,
			currentModal,
		};
	},
});
</script>

<style scoped></style>
