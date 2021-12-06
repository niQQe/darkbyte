<template>
	<div
		@mouseenter="handleMouseEnter"
		@mouseleave="handleMouseLeave"
		@click="showSettingsButton = true"
		class="flex items-center w-full hover:text-white text-sm cursor-default"
		:class="{ 'text-white': (currentListOption.id === list.id && showSettings) || $route.params.id === list.id }"
		style="height: 35px"
	>
		<div v-if="changeListName">
			<input
				type="text"
				@keydown.enter="handleNameSave"
				class="text-white bg-transparent outline-none border border-opacity-20 bg-white bg-opacity-5 p-1 leading-tight"
				ref="inputRef"
				@focusout="handleNameSave"
				v-model="listName"
			/>
		</div>
		<div v-else class="flex items-center w-full">
			{{ list.name }}
			<span v-if="list.mutual" style="font-size: 16px" class="ml-3 material-icons-round"> group </span>
			<span v-if="list.private" style="font-size: 16px" class="ml-3 material-icons-round"> visibility_off </span>
		</div>
		<div class="ml-auto"></div>
		<div class="relative">
			<button
				v-show="showSettingsButton"
				@click.stop="handleOpenListSettings"
				@mouseenter="showSettingsButton = true"
				@mousedown.prevent.stop="listSettingActive = 'mousedown'"
				@mouseup.prevent.stop="listSettingActive = 'mouseup'"
				class="flex items-center text-color rounded-full"
				:class="{
					'bg-white bg-opacity-10': listSettingActive === 'mousedown',
					'btn-anim': listSettingActive === 'mouseup',
				}"
				style="width: 35px; height: 35px"
			>
				<i class="material-icons m-auto">more_horiz</i>
			</button>
			<div
				class="absolute shadow-md text-sm space-y-4 flex flex-col top-10 rounded-sm z-30 py-2"
				style="background: rgb(34, 34, 34); right: 0px; min-width: 150px"
				v-show="currentListOption.id === list.id && showSettings"
				@mouseleave="listSettingActiveId = null"
				v-click-away="handleClickAway"
			>
				<div
					@click.stop="setMutual(list.id, !list.mutual)"
					class="flex justify-between items-center w-full text-white hover:bg-white hover:bg-opacity-20 space-x-4 py-1.5 px-3"
				>
					<span class="font-size:14px;">Mutual list</span>
					<span v-if="list.mutual" class="material-icons ml-auto" style="font-size: 16px">check</span>
				</div>
				<div
					@click.stop="setPrivate(list.id, !list.private)"
					class="flex justify-between items-center w-full text-white hover:bg-white hover:bg-opacity-20 space-x-4 py-1.5 px-3"
				>
					<span class="font-size:14px;">Private</span>
					<span v-if="list.private" class="material-icons ml-auto" style="font-size: 16px">check</span>
				</div>
				<div
					@click.stop="handleChangeListName"
					class="flex items-center text-white hover:bg-white hover:bg-opacity-20 space-x-4 py-1.5 px-3"
				>
					<span class="font-size:14px;">Change name</span>
				</div>
				<div
					@click.stop="handleDeleteList"
					class="flex items-center text-white hover:bg-white hover:bg-opacity-20 space-x-4 py-1.5 px-3"
				>
					<span class="font-size:14px;">Delete</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, nextTick, markRaw, watch } from 'vue';
import { currentListOption } from '@/global/currents';
import { updateListName } from '@/composables/updateListName';
import { deleteList } from '@/composables/deleteList';
import { currentList, currentConfirmation } from '@/global/currents';
import { useRouter } from 'vue-router';
import { currentModal } from '@/global/modal';
import { setMutual } from '@/composables/setMutal';
import { setPrivate } from '@/composables/setPrivate';

export default defineComponent({
	props: {
		list: {
			type: Object,
			required: true,
		},
	},
	setup(props) {
		const router = useRouter();
		const showSettingsButton = ref(false);
		const showSettings = ref(false);
		const listSettingActive = ref('');
		const listSettingActiveId = ref();
		const changeListName = ref(false);
		const listName = ref('');
		const inputRef = ref();

		const handleOpenListSettings = () => {
			currentListOption.value = props.list;
			if (currentListOption.value.id !== props.list.id) {
				showSettings.value = false;
				return;
			}
			showSettings.value = true;
		};

		const handleMouseEnter = () => {
			listSettingActiveId.value = props.list.id;
			showSettingsButton.value = true;
		};

		const handleNameSave = async () => {
			props.list.name = listName.value;
			if (props.list.id === currentList.value.id) currentList.value.name = listName.value;
			await updateListName(props.list.id, listName.value);
			changeListName.value = false;
		};

		const handleClickAway = () => {
			if (showSettings.value) showSettings.value = false;

			listSettingActiveId.value = null;
			listSettingActive.value = '';
			if (showSettingsButton.value) showSettingsButton.value = false;
		};

		const handleMouseLeave = () => {
			if (showSettings.value) return;
			showSettingsButton.value = false;
			listSettingActive.value = '';
			listSettingActiveId.value = null;
		};

		const handleChangeListName = () => {
			changeListName.value = true;
			handleClickAway();
			listName.value = props.list.name;
			nextTick(() => {
				inputRef.value.focus();
			});
		};

		const handleDeleteList = async () => {
			handleClickAway();
			currentModal.value = markRaw(require('@/features/modals/deleteListConfirmationModal.vue').default);
			const unsubscribe = watch(currentConfirmation, async (confirm) => {
				console.log('watchers körs');
				if (confirm) {
					unsubscribe();
					currentConfirmation.value = false;
					await deleteList(currentListOption.value.id);
					if (props.list.id === currentList.value.id) router.push('/profile/me');
				}
			});
		};

		return {
			listSettingActive,
			setPrivate,
			currentListOption,
			listName,
			showSettingsButton,
			handleClickAway,
			handleOpenListSettings,
			handleMouseLeave,
			showSettings,
			changeListName,
			handleChangeListName,
			inputRef,
			handleMouseEnter,
			handleNameSave,
			handleDeleteList,
			setMutual,
			listSettingActiveId,
		};
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
