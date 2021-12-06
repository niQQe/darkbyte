<template>
	<div class="px-5 py-5 flex">
		<div class="flex space-x-4">
			<div
				v-if="user.uid === currentList.owner"
				class="add-post-btn rounded-full flex text-white transform hover:scale-110 cursor-pointer"
				@click="handleAddPost"
				style="width: 50px; height: 50px; background: rgb(55, 192, 21)"
			>
				<div class="material-icons m-auto">add</div>
			</div>
			<div class="material-icons text-white m-auto">more_horiz</div>
		</div>
		<filter-options v-if="posts.length" class="ml-auto"></filter-options>
	</div>
</template>

<script lang="ts">
import { defineComponent, markRaw } from 'vue';
import { user } from '@/global/user';
import { currentList } from '@/global/currents';
import { currentModal } from '@/global/modal';
import { posts } from '@/global/posts';
import filterOptions from '../filter-options/filterOptions.vue';

export default defineComponent({
	components: {
		filterOptions,
	},
	setup() {
		const handleAddPost = () => {
			currentModal.value = markRaw(require('@/features/modals/addPostModal.vue').default);
		};

		return { user, currentList, handleAddPost, posts };
	},
});
</script>

<style scoped></style>
