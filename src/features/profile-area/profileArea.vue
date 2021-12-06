<template>
	<div class="flex flex-col h-full w-full overflow-hidden">
		<div
			class="fixed top-0 left-0 w-full"
			style="height: 400px; z-index: 1; background-image: linear-gradient(rgb(76, 79, 85), rgb(32 34 37))"
		></div>
		<div class="w-full relative space-x-5 z-10 flex items-center px-10" style="height: 460px">
			<div>
				<div class="w-36 h-36 rounded-full shadow-lg flex" style="background: #2a2a2c">
					<span class="material-icons m-auto text-white" style="font-size: 72px"> link </span>
				</div>
			</div>
			<div class="flex flex-col pt-10" v-if="user">
				<div class="text-white text-sm uppercase">Profile</div>
				<div class="text-white text-5xl font-bold">{{ user.nickname }}</div>
				<div class="text-white text-xs mt-2">{{ lists.length }} public lists</div>
			</div>
		</div>
		<div class="bg-black bg-opacity-20 h-full relative z-10 p-4">
			<div class="text-xl text-white font-bold w-full p-4">Public lists</div>
			<div class="w-full px-4 space-y-2">
				<div class="w-full float-left" style="margin-left: -10px; margin-right: -10px">
					<router-link
						:to="`/list/${list.id}`"
						class="p-2 float-left"
						v-for="list in lists"
						style="min-width: 200px; max-width: 164px"
					>
						<div
							class="w-full rounded-sm p-4 transition-all space-y-3 bg-white bg-opacity-5 hover:bg-opacity-10"
							style="height: 260px"
						>
							<div
								class="w-full bg-white bg-opacity-10 rounded-sm overflow-hidden"
								style="height: 168px; box-shadow: 0px 3px 18px 0px #00000046"
								v-if="list.listThumbs.length"
							>
								<div v-for="thumb in list.listThumbs">
									<img
										class="w-full float-left"
										v-if="list.listThumbs.length === 1"
										style="height: 168px; object-fit: cover; object-position: 50%"
										:src="thumb"
										alt=""
									/>
									<img
										class="w-1/2 float-left"
										v-else
										style="height: 84px; object-fit: cover; object-position: 50% 50%"
										:src="thumb"
										alt=""
									/>
								</div>
							</div>
							<div v-else style="height: 168px; box-shadow: 0px 3px 18px 0px #00000046">
								<div class="flex w-full h-full bg-black bg-opacity-50">
									<span class="material-icons m-auto text-white" style="font-size: 82px"> link </span>
								</div>
							</div>
							<div class="text-white truncate text-md font-medium leading-tight">{{ list.name }}</div>
							<div class="text-color text-xs">by {{ list.displayname }}</div>
						</div>
					</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { lists } from '@/composables/getOwnedLists';
import { user } from '@/global/user';

export default defineComponent({
	setup() {
		return {
			lists,
			user,
		};
	},
});
</script>

<style scoped></style>
