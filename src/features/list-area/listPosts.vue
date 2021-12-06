<template>
	<div class="w-full px-5 flex pb-20 flex-col space-y-2 ">
		<table class="w-full">
			<tr class="text-sm border-b border-opacity-10 h-12">
				<th class="text-color font-medium leading-tight text-center px-3">#</th>
				<th class="text-left text-color font-medium leading-tight uppercase">Title</th>
				<th class="text-left text-color font-medium leading-tight uppercase">Date added</th>
				<th class="text-left text-color font-medium leading-tight uppercase"></th>
			</tr>
			<tr style="height: 10px"></tr>
			<list-post-card v-for="(post, index) in filteredPosts" :key="post" :index="index" :post="post" />
			
		</table>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { filteredPosts } from '@/global/posts';
import listPostCard from './listPostCard.vue';
export default defineComponent({
	components: {
		listPostCard,
	},
	setup() {
		return {
			filteredPosts,
		};
	},
});
</script>

<style scoped></style>
