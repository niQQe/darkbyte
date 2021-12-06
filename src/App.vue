<template>
	<modal v-if="showModal"></modal>
	<title-bar></title-bar>
	<left-nav v-if="authenticated"></left-nav>
	<div class="flex" style="margin-left: 232px; width: calc(100% - 232px); overflow: hidden; height: 100%">
		<!-- <top-bar></top-bar> -->
		<router-view></router-view>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { showModal } from './global/modal';
import { useRouter } from 'vue-router';
import leftNav from './features/left-nav/leftNav.vue';
import titleBar from './features/title-bar/titleBar.vue';
import modal from './components/modal.vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { onMounted, ref, watch } from 'vue';
import { user as userInfo } from '@/global/user';
import { getOwnedLists } from './composables/getOwnedLists';
import { ownedLists } from './global/data';
import { getNicknameById } from '@/composables/getNickname';
export default defineComponent({
	name: 'App',
	components: {
		modal,
		titleBar,
		leftNav,
	},
	setup() {
		const router = useRouter();
		const auth = getAuth();
		const authenticated = ref(false);

		onMounted(async () => {
			onAuthStateChanged(auth, async (user) => {
				if (user) {
					userInfo.value = { ...user };
					const ownedListResponse = await getOwnedLists();
					watch(ownedListResponse, (v) => {
						if (v) ownedLists.value = ownedListResponse.value;
					});
					const nickname = await getNicknameById(user.uid);
					userInfo.value = { ...userInfo.value, nickname };

					authenticated.value = true;
				} else {
					router.push('/login');
				}
			});
		});
		return { showModal, authenticated };
	},
});
</script>

<style>
* {
	font-family: 'roboto';
	user-select: none;
}

html,
body {
	width: 100vw;
	overflow: hidden;
	background: #202225;
}

.text-color {
	color: #aaa;
}

button {
	font-family: 'Roboto' !important;
}

/* width */
::-webkit-scrollbar {
	width: 12px;
	z-index: 999;
}

/* Track */
::-webkit-scrollbar-track {
	background: rgb(24, 24, 24);
	padding: 2px;
}

/* Handle */
::-webkit-scrollbar-thumb {
	background: rgba(255, 255, 255, 0.11);
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
	background: #555;
}

#app {
	height: 100vh;
}
</style>
