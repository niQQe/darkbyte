<template>
	<div class="flex space-x-2">
		<div class="flex-1 pb-0 relative flex items-center">
			<div class="relative items-center mr-3" style="height: 32px; min-width: 220px">
				<div
					@click="handleShowSearch"
					class="absolute top-0.5 cursor-pointer right-1 w-7 flex h-7 hover:bg-white hover:bg-opacity-10 rounded-full"
					:class="showSearch ? ' z-1' : 'z-30'"
				>
					<i
						class="material-icons transition-all ease-linear duration-100 text-white m-auto"
						:class="{ 'opacity-0': showSearch }"
						style="font-size: 22px"
						>search</i
					>
				</div>
				<div
					class="relative transition-all ease-linear mr-1 duration-200"
					style="height: 32px; float: right"
					:class="showSearch ? 'w-full opacity-1' : 'opacity-0 w-5'"
				>
					<div
						class="absolute top-0.5 left-0.5 z-10 w-7 h-7 flex rounded-full cursor-pointer"
						@click="handleShowSearch"
					>
						<i class="material-icons text-white m-auto" style="font-size: 22px">search</i>
					</div>
					<input
						@focusout="search === '' ? (showSearch = false) : null"
						type="text"
						ref="searchInputRef"
						placeholder="Search in list"
						v-model="search"
						class="w-full pl-8 text-xs text-white outline-none rounded-sm leading-tight"
						style="height: 32px; background: rgb(255 255 255 / 5%); max-width: 220px"
					/>
					<div
						v-if="search.length"
						class="absolute top-0.5 right-1 z-10 w-7 h-7 flex rounded-full cursor-pointer"
						@click="handleClearInput"
					>
						<i class="material-icons text-color hover:text-white m-auto" style="font-size: 16px">close</i>
					</div>
				</div>
			</div>
			<c-select
				placeholder="Filter by tag"
				style="max-width: 200px"
				class="ml-2"
				:options="tags"
				v-model="selectedTag"
			></c-select>
		</div>
	</div>
</template>

<script lang="ts">
import { tags, selectedTag, search } from '@/global/posts';
import cSelect from '@/components/select.vue';
import { defineComponent, ref } from 'vue';

export default defineComponent({
	components: {
		cSelect,
	},
	setup() {
		const showSearch = ref(false);
		const searchInputRef = ref(null) as any;
		const handleShowSearch = () => {
			showSearch.value = true;
			console.log(searchInputRef);
			searchInputRef.value.focus();
			if (showSearch.value) return;
		};

		const handleClearInput = () => {
			search.value = '';
			searchInputRef.value.focus();
		};
		return { search, tags, selectedTag, handleShowSearch, showSearch, searchInputRef, handleClearInput };
	},
});
</script>

<style scoped>
input::placeholder {
	color: rgba(223, 223, 223, 0.664);
	font-size: 13px;
	line-height: 1;
}

option {
	border: 1px solid red !important;
	border-radius: 0px !important;
}

.show-search {
	width: 200px;
	opacity: 1 !important;
}

select {
	color: rgb(94, 94, 94);
	font-size: 13px;
}
</style>
