<template>
	<div class="flex flex-col space-y-5">
		<div class="flex flex-col space-y-1">
			<div class="w-full font-bold">Are you sure want to delete {{ currentListOption.name }}?</div>
			<div class="text-xs font-medium">This action cannot be reversed.</div>
		</div>
		<div class="mb-5 font-medium flex items-center space-x-2">
			<button @click="handleClose" class="w-1/2 p-2 transform hover:scale-105 text-gray-700 font-bold uppercase text-sm">
				<span class="leading-tight">Cancel</span>
			</button>
			<button
				@click="handleConfirmation"
				class="w-1/2 p-2 transform hover:scale-105 text-white rounded-full font-bold uppercase text-sm"
				style="background: rgb(49, 161, 15); letter-spacing: 1px"
			>
				<span class="leading-tight">Remove</span>
			</button>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { currentModal } from '@/global/modal';
import { currentConfirmation } from '@/global/currents';
import { currentListOption } from '@/global/currents';
export default defineComponent({
	setup() {
		const handleConfirmation = () => {
			currentConfirmation.value = true;
			currentModal.value = '';
		};
		const handleClose = () => {
			currentModal.value = '';
		};

		return { handleClose, handleConfirmation, currentListOption };
	},
});
</script>

<style scoped></style>
