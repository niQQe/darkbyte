<template>
	<div class="flex-2 relative" v-click-away="hideOptions">
		<button
			@mousedown.prevent.stop="postCardSettingsActive = 'mousedown'"
			@mouseup.prevent.stop="postCardSettingsActive = 'mouseup'"
			@click.stop="
				show = !show;
				activeIndex = index;
			"
			class="flex items-center text-color rounded-full"
			:class="{
				'bg-white bg-opacity-10': postCardSettingsActive === 'mousedown',
				'btn-anim': postCardSettingsActive === 'mouseup',
			}"
			style="width: 35px; height: 35px"
		>
			<i class="material-icons m-auto">more_vert</i>
		</button>
		<div
			class="absolute shadow-md text-sm space-y-4 flex flex-col top-9 rounded-sm z-30 py-2"
			style="background: rgb(34, 34, 34); right: 0px; min-width: 150px"
			v-if="show && activeIndex === index"
		>
			<div
				@click.stop="handleCopyToClipboard"
				class="flex items-center text-white hover:bg-white hover:bg-opacity-20 space-x-4 py-1.5 px-3"
			>
				<span class="font-size:14px;"> {{ post.postType === 'url' ? 'Copy URL' : 'Copy text' }}</span>
			</div>
			<div
				@click.stop="handleRemovePost"
				class="flex items-center text-white hover:bg-white hover:bg-opacity-20 space-x-4 py-1.5 px-3"
			>
				<span class="font-size:14px;">Remove</span>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, nextTick } from 'vue';
import { activeIndex } from './postcCardOptionsHandler';
import { deletePost } from '@/composables/deletePost';
import { currentList } from '@/global/currents';

export default defineComponent({
	props: {
		index: {
			type: Number,
		},
		post: {
			type: Object,
			required: true,
		},
	},
	setup(props: Record<string, any>) {
		const show = ref(false);
		const handleRemovePost = async () => {
			console.log(props.post);
			await deletePost(currentList.value.id, props.post.id);
		};

		const handleCopyToClipboard = () => {
			if (props.post.postType === 'url') navigator.clipboard.writeText(props.post.url);
			else navigator.clipboard.writeText(props.post.text);
			show.value = false;
		};
		const hideOptions = () => {
			if (show.value) {
				nextTick(() => {
					show.value = false;
				});
			}
		};
		const postCardSettingsActive = ref('');
		return { activeIndex, postCardSettingsActive, show, hideOptions, handleRemovePost, handleCopyToClipboard };
	},
});
</script>

<style scoped>
.btn-anim {
	animation: fadeout 0.5s ease forwards;
	border: 1px solid rgba(255, 255, 255, 0.308);
}

@keyframes fadeout {
	from {
		border: 1px solid rgba(255, 255, 255, 0.308);
		background: #232323;
	}
	to {
		border: 1px solid rgba(255, 255, 255, 0);
		background: #36393f00;
	}
}
</style>
