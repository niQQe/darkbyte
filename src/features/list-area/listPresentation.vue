<template>
	<div style="width: 100%" class="p-10 relative z-30 mt-0 flex items-center">
		<div
			:class="{ 'opacity-100': showMiniListPresentation }"
			class="fixed opacity-0 transition-all border-b border-opacity-10 w-full left-0 top-0 flex flex-col"
			style="margin-left: 232px; width: calc(100% - 232px); background: #202225; z-index: 999"
		>
			<div class="p-4 flex-1 flex items-center space-x-5" :style="`background:rgba(${dropColorCss}, 0.2) `">
				<div
					@click="handleAddPost"
					v-if="user.uid === currentList.owner"
					class="add-post-btn rounded-full flex text-white transform hover:scale-110 cursor-pointer"
					style="width: 40px; height: 40px; background: rgb(55, 192, 21)"
				>
					<div class="material-icons m-auto" style="font-size: 16px">add</div>
				</div>
				<div
					:class="{ 'opacity-100': showMiniListPresentation }"
					class="font-bold delay-200 duration-300 text-3xl opacity-0 text-white"
				>
					{{ currentList.name }}
				</div>
			</div>
			<div class="px-4 py-2 h-8 flex items-center w-full text-sm relative">
				<div class="text-left text-color font-medium leading-tight absolute uppercase" style="left: 45px">#</div>
				<div class="text-left text-color font-medium leading-tight absolute uppercase" style="left: 80px">Title</div>
				<div class="text-left text-color font-medium leading-tight absolute uppercase" style="right: 250px">
					Date added
				</div>
			</div>
		</div>
		<div class="flex space-y-3 mr-5" v-if="currentList.listThumbs">
			<div class="w-52 h-52 flex flex-col rounded-md overflow-hidden shadow-2xl">
				<div v-if="currentList.listThumbs.length === 0" class="flex w-full h-full bg-black bg-opacity-50">
					<span class="material-icons m-auto text-white" style="font-size: 82px"> link </span>
				</div>
				<div v-else-if="currentList.listThumbs.length < 4" style="height: 100%">
					<img style="object-fit: cover; width: 100%; height: 100%" :src="currentList.listThumbs[0]" alt="" />
				</div>
				<div v-else>
					<div class="h-full flex" style="height: 104px">
						<img
							style="object-fit: cover; width: 50%"
							v-if="currentList.listThumbs[0].length"
							:src="currentList.listThumbs[0]"
							alt=""
						/>
						<div
							style="width: 100%; height: 100%; background-image: linear-gradient(#27125871, rgb(19, 18, 18))"
							class="bg-black bg-opacity-60 flex"
							v-else
						>
							<span class="material-icons m-auto text-white" style="font-size: 32px"> link </span>
						</div>

						<img
							style="object-fit: cover; width: 50%"
							v-if="currentList.listThumbs[1].length"
							:src="currentList.listThumbs[1]"
							alt=""
						/>
						<div
							style="width: 100%; height: 100%; background-image: linear-gradient(#27125871, rgb(19, 18, 18))"
							class="bg-black bg-opacity-60 flex"
							v-else
						>
							<span class="material-icons m-auto text-white" style="font-size: 32px"> link </span>
						</div>
					</div>
					<div class="flex h-full" style="height: 104px">
						<img
							width="80"
							v-if="currentList.listThumbs[2].length"
							style="object-fit: cover; width: 50%"
							:src="currentList.listThumbs[2]"
							alt=""
						/>
						<div
							style="width: 100%; height: 100%; background-image: linear-gradient(#27125871, rgb(19, 18, 18))"
							class="bg-black bg-opacity-60 flex"
							v-else
						>
							<span class="material-icons m-auto text-white" style="font-size: 32px"> link </span>
						</div>
						<img
							width="80"
							style="object-fit: cover; width: 50%"
							v-if="currentList.listThumbs[3].length"
							:src="currentList.listThumbs[3]"
							alt=""
						/>
						<div
							style="width: 100%; height: 100%; background-image: linear-gradient(#27125871, rgb(19, 18, 18))"
							class="bg-black bg-opacity-60 flex"
							v-else
						>
							<span class="material-icons m-auto text-white" style="font-size: 32px"> link </span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="font-medium flex flex-col relative z-10 mt-auto" v-if="currentList">
			<div class="text-8xl text-white">{{ currentList.name }}</div>
			<div class="text-white text-sm mb-1 mt-2 leading-loose pl-2">
				<router-link :to="`/profile/${currentList.owner}`" class="font-bold mr-1 hover:underline">{{
					currentList.displayname
				}}</router-link>
				•
				<span class="opacity-60 font-light ml-1"
					>{{ currentList.followers }} {{ currentList.followers === 1 ? 'follower' : 'followers' }}, {{ posts.length }}
					{{ posts.length === 1 ? 'post' : 'posts' }}</span
				>
			</div>
			<div class="pl-2">
				<button
					v-if="currentList.owner != user.uid && !isFollowing"
					@click="setFollow(currentList.id)"
					class="border border-white border-opacity-30 mt-1 hover:border-opacity-100 text-white px-2 py-1 text-sm rounded-md leading-tight"
				>
					Follow
				</button>
				<button
					v-else-if="isFollowing"
					@click="setUnFollow(currentList.id)"
					class="border border-white border-opacity-30 mt-1 hover:border-opacity-100 text-white px-2 py-1 text-sm rounded-md leading-tight"
				>
					Following
				</button>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount, markRaw } from 'vue';
import { posts, dropColorCss } from '@/global/posts';
import { currentList } from '@/global/currents';
import { user } from '@/global/user';
import { currentModal } from '@/global/modal';
import { setFollow } from '@/composables/setFollow';
import { setUnFollow } from '@/composables/setUnFollow';
import { isFollowing } from '@/global/data';

export default defineComponent({
	setup() {
		const followers = ref();
		const showMiniListPresentation = ref(false);
		const presentationBar = ref() as any;
		const handleScroll = (e: any) => {
			if (e.srcElement.scrollTop > 331) {
				showMiniListPresentation.value = true;
			} else {
				showMiniListPresentation.value = false;
			}
		};

		const handleAddPost = () => {
			currentModal.value = markRaw(require('@/features/modals/addPostModal.vue').default);
		};

		onMounted(async () => {
			presentationBar.value = document.querySelector('#content') as any;
			presentationBar.value.addEventListener('scroll', handleScroll);
		});
		onBeforeUnmount(() => {
			presentationBar.value.removeEventListener('scroll', handleScroll);
		});

		return {
			isFollowing,
			handleAddPost,
			showMiniListPresentation,
			posts,
			dropColorCss,
			user,
			currentList,
			setFollow,
			setUnFollow,
		};
	},
});
</script>

<style scoped></style>
