<template>
	<div class="w-full flex flex-col space-y-5">
		<div class="flex flex-col space-y-3">
			<div>
				<div class="w-full font-bold">Add new post to {{ currentList.name }}</div>
				<div class="text-xs text-color font-medium">Invalid url's will be rejected.</div>
			</div>
			<div style="min-width: 400px">
				<input
					type="text"
					ref="inputRef"
					v-model="url"
					:class="{ 'border-red-500': urlError }"
					placeholder="https://www.pornhub.com"
					class="border-2 border-gray-500 bg-black bg-opacity-5 p-2 w-full rounded-md text-sm text-black outline-none"
				/>
				<span :class="{ 'opacity-100': urlError }" class="opacity-0 text-xs text-red-500">Invalid url</span>
			</div>
		</div>
		<div class="mb-5 font-medium flex flex-row-reverse items-center space-x-2">
			<button
				@click="handleAddPost"
				class="w-1/3 p-1 transform hover:scale-105 text-white rounded-full font-bold uppercase text-sm leading-tight flex"
				style="background: rgb(49, 161, 15); letter-spacing: 1px; width: 133.333px; height: 33px"
			>
				<div v-if="addPostIsPending && !urlError" class="lds-ring m-auto">
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
				<span class="m-auto" v-else> Add post </span>
			</button>
			<button @click="handleClose" class="w-1/3 p-2 transform hover:scale-105 text-gray-700 font-bold uppercase text-sm">
				<span class="leading-tight">Cancel</span>
			</button>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { addPost } from '@/composables/addPost';
import { currentModal } from '@/global/modal';
import { currentList } from '@/global/currents';
const urlMetadata = require('url-metadata');
import cSelect from '@/components/select.vue';
export default defineComponent({
	components: {
		cSelect,
	},
	setup() {
		
		const url = ref('');
		const selectedTag = ref('');
		const newTag = ref('');
		const urlError = ref(false);
		const text = ref('');
		const title = ref('');
		const inputRef = ref();
		const addPostIsPending = ref(false);

		onMounted(() => {
			setTimeout(() => {
				inputRef.value.focus();
			}, 50);
		});

		const getMetaData = async () => {
			try {
				const metadata = await urlMetadata(url.value);
				urlError.value = false;
				return metadata;
			} catch (err) {
				console.log(err);
				urlError.value = true;
			}
		};

		const reset = () => {
			url.value = '';
			newTag.value = '';
			title.value = '';
			urlError.value = false;
			addPostIsPending.value = false;
			text.value = '';
		};

		const handleClose = () => {
			reset();
			currentModal.value = '';
		};

		const handleAddPost = async () => {
			addPostIsPending.value = true;
			let postData;
			const metadata = (await getMetaData()) as any;
			console.log(metadata);
			if (urlError.value) return;
			postData = {
				postType: 'url',
				image: metadata['og:image'],
				title: metadata['og:title'],
				url: url.value,
				tag: selectedTag.value || newTag.value,
			};

			await addPost(postData);
			addPostIsPending.value = false;
			reset();
			currentModal.value = '';
		};
		return { url, handleAddPost, urlError, inputRef, handleClose, currentList, addPostIsPending };
	},
});
</script>

<style scoped>
.lds-ring {
	display: inline-block;
	position: relative;
	width: 25px;
	height: 25px;
}
.lds-ring div {
	box-sizing: border-box;
	display: block;
	position: absolute;
	width: 25px;
	height: 25px;
	border: 3px solid #fff;
	border-radius: 50%;
	animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
	border-color: #fff transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
	animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
	animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
	animation-delay: -0.15s;
}
@keyframes lds-ring {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
</style>
