<template>
	<div style="min-width: 600px">
		<div class="font-bold">Friend requests</div>
		<div class="w-full flex flex-col mt-5">
			<div class="border font-medium flex items-center rounded-full" v-for="request: any in friendRequests">
				<div class="flex items-center space-x-3 p-2">
					<div class="w-8 h-8 flex bg-black shadow-lg bg-opacity-80 rounded-full">
						<span class="material-icons m-auto text-white">face</span>
					</div>
					<span class="text-md">
						{{ request.displayname }}
					</span>
				</div>
				<div class="ml-auto flex space-x-3 p-2">
					<button
						class="flex bg-opacity-80 transform hover:scale-105 rounded-full items-center p-2 px-4 text-black font-medium text-sm uppercase"
					>
						Decline
					</button>
					<button
						class="flex shadow-lg bg-opacity-80 transform hover:scale-105 rounded-full p-2 px-4 text-white text-sm font-medium uppercase"
						style="background: rgb(55, 192, 21)"
					>
						Accept
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { friendRequests } from '@/global/data';

export default defineComponent({
	setup() {
		return { friendRequests };
	},
});
</script>

<style scoped></style>
