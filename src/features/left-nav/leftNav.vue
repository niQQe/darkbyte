<template>
	<div
		class="fixed flex flex-col space-y-3 z-30 py-2 pb-0"
		style="width: 232px; height: 100vh; background: rgb(20, 20, 21); z-index: 200"
	>
		<div class="flex flex-col flex-1">
			<user-actions />
			<lists />
			<mini-user-bar />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import userActions from './user-actions/userActions.vue';
import lists from './lists/lists.vue';
import miniUserBar from './user-actions/miniUserBar.vue';
export default defineComponent({
	components: {
		userActions,
		lists,
		miniUserBar,
	},
	setup() {
		return {};
	},
});
</script>

<style scoped></style>
