<template>
	<div class="h-full w-full flex-1 space-y-1 text-color">
		<div
			@click="handleGotoList(list)"
			v-for="list in ownedLists.sort((b:any,a:any) => a.created - b.created)"
			:key="list.id"
			class="mt-2 w-full flex items-center"
		>
			<list-card v-if="list.id" :list="list"></list-card>
		</div>
		<div
			@click="handleGotoList(list)"
			v-for="list in followedLists.sort((b:any,a:any) => a.date - b.date)"
			:key="list.id"
			class="mt-2 w-full flex items-center"
		>
			<list-card v-if="list.id" :list="list"></list-card>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { currentList } from '@/global/currents';
import { followedLists } from '@/global/data';
import { ownedLists } from '@/global/data';
import listCard from './listCard.vue';

export default defineComponent({
	components: {
		listCard,
	},
	setup() {
		const route = useRoute();
		const router = useRouter();
		const handleGotoList = (list: any) => {
			if (list.id === route.params.id) return;
			currentList.value = list;
			router.push(`/list/${list.id}`);
		};
		return {
			ownedLists,
			followedLists,
			handleGotoList,
		};
	},
});
</script>

<style scoped></style>
