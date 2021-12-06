<template>
	<div
		class="fixed flex flex-col space-y-3 z-30 py-2"
		style="width: 232px; height: 100vh; background: rgb(20, 20, 21); z-index: 200"
	>
		<div class="flex flex-col px-2">
			<div class="w-full border-b border-opacity-10 pb-3">
				<div class="w-full text-sm font-medium text-color">
					<router-link
						to="/profile/me"
						class="opacity-80 transition-all duration-200 hover:opacity-100 w-full cursor-pointer flex items-center py-2 px-2 rounded-md space-x-3"
						style="height: 42px"
						:class="{ 'bg-white bg-opacity-5 opacity-100': $route.path === '/profile/me' }"
					>
						<span class="material-icons text-white" style="font-size: 22px"> home </span>
						<div class="text-white" style="font-size: 15px">Home</div>
					</router-link>
				</div>
				<div class="w-full text-sm font-medium text-color">
					<router-link
						to="/search"
						class="transition-all duration-200 opacity-80 hover:opacity-100 w-full cursor-pointer flex items-center py-2 px-2 rounded-md space-x-3"
						style="height: 42px"
						:class="{ 'bg-white bg-opacity-5 opacity-100': $route.path === '/search' }"
					>
						<span class="material-icons text-white" style="font-size: 22px">search </span>
						<div class="text-white" style="font-size: 15px">Search</div>
					</router-link>
				</div>
				<div class="w-full text-sm font-medium text-color">
					<div
						@click="addList(`New list #${lists.length + 1}`)"
						class="transition-all duration-200 opacity-80 hover:opacity-100 w-full cursor-pointer flex items-center py-2 px-2 rounded-md space-x-3"
						style="height: 42px"
					>
						<span class="material-icons text-white" style="font-size: 24px"> playlist_add </span>
						<div class="text-white" style="font-size: 15px">Create new list</div>
					</div>
				</div>
			</div>
			<!-- <div class="text-color text-xs font-medium mt-4 mb-2 px-2">LISTS</div> -->
			<div class="w-full space-y-1 text-color" v-if="lists.length">
				<div
					@click="handleGotoList(list)"
					v-for="list in lists.sort((b:any,a:any) => a.created - b.created)"
					:key="list.id"
					class="px-2 mt-2 w-full flex items-center"
				>
					<list-card :list="list"></list-card>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue';
import { addList } from '@/composables/addList';
import { lists } from '@/composables/getOwnedLists';
import { currentList } from '@/global/currents';
import { useRouter } from 'vue-router';
import listCard from './listCard.vue';
export default defineComponent({
	components: {
		listCard,
	},
	setup() {
		const router = useRouter();

		const handleGotoList = (list: any) => {
			currentList.value = list;
			router.push(`/list/${list.id}`);
		};
		return {
			lists,
			handleGotoList,
			addList,
		};
	},
});
</script>

<style scoped></style>
