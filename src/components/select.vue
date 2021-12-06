<template>
	<div class="pb-0 relative flex" style="height: 38px">
		<div
			@click="showOptions = !showOptions"
			class="w-full items-center flex px-3 relative text-white rounded-md text-xs cursor-pointer"
			style="min-width: 110px"
		>
			<div class="flex items-center">
				<span
					class="material-icons-outlined text-white o absolute right-2 top-3 transition-all"
					:class="showOptions ? 'transform rotate-180' : ''"
					style="font-size: 18px"
				>
					arrow_drop_down
				</span>
				<span class="mt-0.5" :class="selectedOption.length ? 'text-white' : 'text-white'" style="font-size: 13px">{{
					selectedOption.length ? selectedOption : placeholder
				}}</span>
				<div
					class="text-xs absolute right-10 top-3 text-indigo-600 opacity-90 hover:opacity-100 uppercase font-bold rounded-md cursor-pointer"
					@click.stop="
						selectedOption = '';
						showOptions = false;
					"
					v-if="selectedOption.length"
				>
					clear
				</div>
			</div>
			<div
				v-click-away="hideShowOptions"
				v-if="showOptions"
				style="background: rgb(24, 24, 24); max-height: 200px"
				class="z-40 flex flex-col absolute w-full left-0 rounded-md back top-10 shadow-md overflow-auto"
			>
				<span
					v-for="option in options"
					@click="selectedOption = option"
					class="cursor-pointer relative hover:bg-white hover:bg-opacity-20 w-full p-2 flex items-center pl-8"
				>
					<span
						class="material-icons-outlined absolute left-2 text-indigo-500"
						style="font-size: 16px"
						v-if="selectedOption === option"
					>
						check
					</span>
					<span>{{ option }}</span>
				</span>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
	props: {
		options: {
			type: Array,
		},
		placeholder: {
			type: String,
		},
	},
	setup(_, { emit }) {
		const showOptions = ref(false);
		const selectedOption = ref('' as any);

		const hideShowOptions = () => {
			showOptions.value = false;
		};
		watch(selectedOption, (option) => {
			emit('update:modelValue', option);
		});

		return {
			hideShowOptions,
			selectedOption,
			showOptions,
		};
	},
});
</script>

<style scoped></style>
