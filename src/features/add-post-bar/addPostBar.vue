<template>
	<div
		class="w-full bottom-0 flex items-center space-x-2 px-2 fixed h-10 border-b border-opacity-10"
	>
		<div class="w-full relative flex">
			<button
				@click="handleShowModal"
				class="w-12 h-12 rounded-full bg-indigo-600 left-0 m-auto -mt-10 flex"
				style="padding: 0px !important"
			>
				<i class="material-icons text-white m-auto">add</i>
			</button>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, markRaw } from 'vue';
import { currentModal } from '@/global/modal';

export default defineComponent({
	components: {},
	setup() {
		const handleShowModal = () => {
			currentModal.value = markRaw(require('@/features/modals/addPostModal.vue').default);
		};
		return { handleShowModal };
	},
});
</script>

<style scoped>
input::placeholder,
textarea::placeholder {
	font-size: 13px;
	opacity: 50%;
}

input:disabled {
	opacity: 40%;
}
</style>
