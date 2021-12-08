<template>
	<div class="p-6 w-full">
		<div class="relative">
			<span class="material-icons absolute top-3 left-3 text-black opacity-50">search</span>
			<input
				type="text"
				ref="inputRef"
				v-model="search"
				placeholder="Search for lists or users"
				class="bg-white outline-none p-3 pl-10 w-96 rounded-full"
			/>
		</div>
		<div class="flex flex-col space-y-3">
			<div class="w-full py-5 space-y-2" v-if="usersResult.length">
				<div class="text-2xl text-white font-bold">Users</div>

				<div class="w-full float-left flex flex-wrap" style="margin-left: -10px; margin-right: -10px">
					<router-link
						:to="`/profile/${result.user.raw}`"
						class="p-2 float-left flex-1"
						v-for="result in usersResult"
						style="min-width: 200px; max-width: 164px"
					>
						<div class="w-full rounded-sm p-4 transition-all bg-white bg-opacity-5 hover:bg-opacity-10">
							<div
								class="w-full bg-white bg-opacity-10 rounded-sm overflow-hidden"
								style="box-shadow: 0px 3px 18px 0px #00000046"
							>
								<div style="height: 168px; box-shadow: 0px 3px 18px 0px #00000046">
									<div class="flex w-full h-full" style="background: #151618">
										<span class="material-icons m-auto text-white" style="font-size: 82px">
											account_circle
										</span>
									</div>
								</div>
							</div>
							<div class="text-color text-xs mt-2">{{ result.displayname.raw }}</div>
						</div>
					</router-link>
				</div>
			</div>
			<div class="w-full py-5 space-y-2" v-if="listsResult.length">
				<div class="text-2xl text-white font-bold">Lists</div>
				<div class="w-full float-left flex flex-wrap" style="margin-left: -10px; margin-right: -10px">
					<router-link
						:to="`/list/${result._meta.id}`"
						class="p-2 float-left flex-1"
						v-for="result in listsResult"
						style="min-width: 200px; max-width: 164px"
					>
						<div class="w-full rounded-sm p-4 transition-all bg-white bg-opacity-5 hover:bg-opacity-10">
							<div
								class="w-full bg-white bg-opacity-10 rounded-sm overflow-hidden"
								style="box-shadow: 0px 3px 18px 0px #00000046"
								v-if="result.listthumbs.raw.length"
							>
								<div v-for="thumb in result.listthumbs.raw">
									<img
										class="w-full float-left"
										v-if="result.listthumbs.raw.length === 1"
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
								<div class="flex w-full h-full" style="background: #151618">
									<span class="material-icons m-auto text-white" style="font-size: 82px"> link </span>
								</div>
							</div>
							<div class="text-white truncate text-md font-medium leading-tight mt-2">{{ result.name.raw }}</div>
							<div class="text-white text-xs mt-1">{{ result.followers.raw }} Followers</div>
							<div class="text-color text-xs mt-2">by {{ result.displayname.raw }}</div>
						</div>
					</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch, computed } from 'vue';
var requestify = require('requestify');

export default defineComponent({
	setup() {
		const inputRef = ref();
		const search = ref('');
		const searchResult = ref([] as any);

		const listsResult = computed(() => searchResult.value.filter((list: any) => list.collection.raw === 'lists')) as any;
		const usersResult = computed(() => searchResult.value.filter((item: any) => item.collection.raw === 'users')) as any;

		watch(search, async (searchVal) => {
			if (searchVal.length > 3) {
				requestify
					.post(process.env.VUE_APP_SEARCH_URL, {
						query: searchVal,
					})
					.then(function (response: any) {
						console.log(response.getBody());
						// Get the response body (JSON parsed or jQuery object for XMLs)
						searchResult.value = response.getBody().results;
					});
			}
		});
		onMounted(() => {
			inputRef.value.focus();
		});
		return {
			listsResult,
			usersResult,
			search,
			searchResult,
			inputRef,
		};
	},
});
</script>

<style scoped>
input::placeholder {
	font-size: 14px;
	font-weight: 300;
}
</style>
