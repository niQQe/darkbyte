<template>
	<div id="content" class="flex flex-col w-full relative z-30 overflow-auto" v-if="!loading">
		<list-backdrop />
		<list-presentation />
		<list-user-content>
			<list-user-actions />
			<list-posts v-if="posts.length" />
			<list-empty-placeholder v-if="!posts.length && currentList.owner == user.uid" />
		</list-user-content>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, watch, ref, onBeforeUnmount } from 'vue';
import { getPosts } from '@/composables/getPosts';
import { user } from '@/global/user';
import { posts, search } from '@/global/posts';
import { useRoute } from 'vue-router';
import { currentList } from '@/global/currents';
import { getSingleList } from '@/composables/getSingleList';
import { isFollowing } from '@/global/data';
import { getFollowing } from '@/composables/getFollowing';
import { getIfFollow } from '@/composables/getIfFollow';
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
					await handleGetListData();
				}
			},
			{ deep: true }
		);

		const handleGetListData = async () => {
			loading.value = true;
			search.value = '';
			const res = getPosts(route.params.id as string);

			currentList.value = await getSingleList(route.params.id as string);
			currentList.value.followers = await getFollowing(route.params.id as string);
			console.log('currentlist');
			getIfFollow(currentList.value.id);

			loading.value = false;
		};

		onMounted(async () => {
			await handleGetListData();
		});

		onBeforeUnmount(() => {
			loading.value = true;
			posts.value = [];
		});

		return {
			posts,
			user,
			currentList,
			loading,
		};
	},
});
</script>

<style scoped></style>
