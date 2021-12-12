<template>
	<div class="w-full border-b border-opacity-10 pb-3 px-2">
		<div class="w-full text-sm font-medium text-color">
			<router-link
				:to="`/profile/${user.uid}`"
				class="opacity-80 transition-all duration-200 hover:opacity-100 w-full cursor-pointer flex items-center py-2 px-2 rounded-md space-x-3"
				style="height: 42px"
				:class="{ 'bg-white bg-opacity-5 opacity-100': $route.path === `/profile/${user.uid}` }"
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
				@click="currentModal = markRaw(require('@/features/modals/friendRequestsModal.vue').default)"
				class="transition-all duration-200 opacity-80 hover:opacity-100 w-full cursor-pointer flex items-center py-2 px-2 rounded-md"
				style="height: 42px"
				:class="{ 'bg-white bg-opacity-5 opacity-100': $route.path === '/friend_requests' }"
			>
				<span class="material-icons text-white mr-3" style="font-size: 22px">person_add</span>
				<div class="text-white mr-auto" style="font-size: 15px">Friend requests</div>
				<div class="ml-auto w-5 h-5 rounded-full border border-white bg-opacity-100 flex">
					<span class="m-auto text-white text-xs">
						{{ friendRequests.length }}
					</span>
				</div>
			</div>
		</div>
		<div class="w-full text-sm font-medium text-color">
			<div
				@click="addList(`New list #${ownedLists.length + 1}`)"
				class="transition-all duration-200 opacity-80 hover:opacity-100 w-full cursor-pointer flex items-center py-2 px-2 rounded-md space-x-3"
				style="height: 42px"
			>
				<span class="material-icons text-white" style="font-size: 24px"> playlist_add </span>
				<div class="text-white" style="font-size: 15px">Create new list</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, markRaw } from 'vue';
import { addList } from '@/composables/addList';
import { friendRequests } from '@/global/data';
import { currentModal } from '@/global/modal';
import { user } from '@/global/user';
import { ownedLists } from '@/global/data';

export default defineComponent({
	setup() {
		return { user, addList, friendRequests, ownedLists, currentModal, markRaw };
	},
});
</script>

<style scoped></style>
