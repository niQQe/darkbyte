<template>
	<modal v-if="showModal"></modal>
	<title-bar></title-bar>
	<left-nav v-if="authenticated"></left-nav>
	<div class="flex" v-if="!loading" style="margin-left: 232px; width: calc(100% - 232px); overflow: hidden; height: 100%">
		<!-- <top-bar></top-bar> -->
		<router-view></router-view>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { showModal } from './global/modal';
import { useRouter } from 'vue-router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { onMounted, ref } from 'vue';
import { user as userInfo } from '@/global/user';
import { getOwnedLists } from './composables/getOwnedLists';
import { authenticated } from './global/auth';
import { getDisplayNameById } from '@/composables/getDisplayName';
import { ownedLists, followedLists } from '@/global/data';
import { getFollowedLists } from './composables/getFollowedLists';
import { getFriendRequests } from './composables/getFriendRequests';
import leftNav from './features/left-nav/leftNav.vue';
import titleBar from './features/title-bar/titleBar.vue';
import modal from './components/modal.vue';
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
		const loading = ref(true);

		onMounted(async () => {
			onAuthStateChanged(auth, async (user) => {
				if (user) {
					loading.value = true;
					userInfo.value = { ...user };
					await getOwnedLists({ uid: user.uid, endLocation: ownedLists });
					await getFollowedLists({ uid: user.uid, endLocation: followedLists });
					getFriendRequests();
					userInfo.value = { ...userInfo.value, displayname: await getDisplayNameById(user.uid) };

					authenticated.value = true;
					loading.value = false;
				} else {
					router.push('/');
				}
			});
		});
		return { showModal, authenticated, loading };
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
