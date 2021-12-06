<template>
	<tr @click="handleGotoPost" class="rounded-md cursor-default hover:bg-white hover:bg-opacity-5">
		<td class="text-color px-2 text-center" style="min-width: 60px; max-width: 60px; width: 60px">{{ index + 1 }}</td>
		<td>
			<div class="flex items-center space-x-3 py-3">
				<img
					v-if="post.image"
					class="bg-black rounded-md"
					:src="post.image"
					style="object-fit: cover; width: 70px; height: 70px"
					alt=""
				/>
				<div
					style="width: 70px; height: 70px; background-image: linear-gradient(#27125871, rgb(19, 18, 18))"
					class="bg-black bg-opacity-60 rounded-md flex"
					v-else
				>
					<span class="material-icons m-auto text-white" style="font-size: 32px"> link </span>
				</div>
				<div class="flex space-y-0.5 flex-col">
					<span class="text-white text-left line-clamp-2 font-medium text-md">
						{{ post.title }}
					</span>
					<span class="text-color text-xs line-clamp-1 w-full float-left"> {{ post.url }}</span>
				</div>
			</div>
		</td>
		<td style="min-width: 200px; max-width: 200px; width: 200px">
			<div class="text-sm text-color">{{ new Date(post.created * 1000).toLocaleDateString('sv-SE') }}</div>
		</td>
		<td style="min-width: 100px; max-width: 100px; width: 100px">
			<div class="flex items-center pr-3">
				<postCardOptions class="ml-auto" :post="post" :index="index"></postCardOptions>
			</div>
		</td>
	</tr>
</template>

<script lang="ts">
import { defineComponent, markRaw, ref } from 'vue';
import { shell } from 'electron';
import { currentPostIndex } from '@/global/posts';
import { currentModal } from '@/global/modal';
import postCardOptions from '@/features/post-card-options/postCardOptions.vue';

export default defineComponent({
	props: {
		post: {
			type: Object,
			required: true,
		},
		index: {
			type: Number,
			required: true,
		},
	},
	components: {
		postCardOptions,
	},
	setup(props: Record<string, any>) {
		const showText = ref(false);
		const handleGotoPost = () => {
			if (props.post.postType === 'text') {
				currentPostIndex.value = props.index;
				currentModal.value = markRaw(require('@/features/modals/textModal.vue').default);
			} else {
				return shell.openExternal(props.post.url);
			}
		};

		return {
			showText,
			handleGotoPost,
		};
	},
});
</script>

<style scoped>
.post-card:hover {
	background: #50555e69;
}
</style>
