<template>
	<div class="fixed flex top-0 left-0 w-full h-full bg-black z-10 bg-opacity-80">
		<div
			class="m-auto rounded-md flex space-y-2 flex-col p-3"
			style="background: rgb(31, 31, 31); width: 450px; height: 450px"
		>
			<div class="text-white text-sm font-medium">{{ filteredPosts[currentPostIndex].title }}</div>
			<textarea
				placeholder="Enter text"
				readonly
				class="
					text-white
					bg-black bg-opacity-20
					border border-opacity-10
					text-xs
					p-2
					outline-none
					w-full
					flex-1
					max-h-full
				"
				cols="30"
				rows="10"
			>
			{{ filteredPosts[currentPostIndex].text }}
			</textarea
			>
			<div class="flex flex-row-reverse">
				<button
					@click="currentModal = ''"
					class="text-xs rounded-md bg-indigo-500 text-white px-2.5 py-1.5 font-medium"
					style="letter-spacing: 0.5px"
				>
					Close
				</button>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { filteredPosts, currentPostIndex } from '@/global/posts';
import { currentModal } from '@/global/modal';
export default defineComponent({
	setup() {
		return {
			currentPostIndex,
			filteredPosts,
			currentModal,
		};
	},
});
</script>

<style scoped></style>
