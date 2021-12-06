<template>
	<div id="content" class="flex flex-col w-full relative z-30 overflow-auto" v-if="!loading">
		<list-backdrop />
		<list-presentation />
		<list-user-content>
			<list-user-actions />
			<list-posts v-if="posts.length" />
			<list-empty-placeholder v-else />
		</list-user-content>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, watch, ref, onBeforeUnmount } from 'vue';
import { getPosts } from '@/composables/getPosts';
import { posts, search } from '@/global/posts';
import { useRoute } from 'vue-router';
import { currentList } from '@/global/currents';
import { getSingleList } from '@/composables/getSingleList';
import titleBar from '../title-bar/titleBar.vue';
import listPresentation from './listPresentation.vue';
import listBackdrop from './listBackdrop.vue';
import listUserContent from './listUserContent.vue';
import listUserActions from './listUserActions.vue';
import listPosts from './listPosts.vue';
import listEmptyPlaceholder from './listEmptyPlaceholder.vue';
import addPostBar from '../add-post-bar/addPostBar.vue';
import ListEmptyPlaceholder from './listEmptyPlaceholder.vue';

export default defineComponent({
	components: {
		addPostBar,
		titleBar,
		listPresentation,
		listBackdrop,
		listUserContent,
		listUserActions,
		listPosts,
		listEmptyPlaceholder,
		ListEmptyPlaceholder,
	},
	setup() {
		const route = useRoute();
		const loading = ref(true);
		watch(
			route,
			async () => {
				if (route.path.includes('list')) {
					await handleGetPosts();
				}
			},
			{ deep: true }
		);

		const handleGetPosts = async () => {
			loading.value = true;
			search.value = '';
			const res = getPosts(route.params.id as string);
			watch(
				res,
				(v) => {
					if (v) posts.value = res.value;
				},
				{ deep: true }
			);
			currentList.value = await getSingleList(route.params.id as string);
			posts.value = res.value;
			loading.value = false;
		};

		onMounted(async () => {
			if (!posts.value.length) {
				console.log('inne');
				loading.value = true;
				currentList.value = await getSingleList(route.params.id as string);
				handleGetPosts();
				loading.value = false;
			}
		});

		onBeforeUnmount(() => {
			loading.value = true;
			posts.value = [];
		});

		return {
			posts,
			loading,
		};
	},
});
</script>

<style scoped></style>
