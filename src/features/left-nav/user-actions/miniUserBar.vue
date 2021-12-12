<template>
	<div class="w-full h-14 mt-auto flex items-center px-2 bg-black bg-opacity-10">
		<div class="w-9 h-9 rounded-full bg-white flex bg-opacity-10 shadow-lg">
			<span class="material-icons text-white text-opacity-80 m-auto">face</span>
		</div>
		<div class="flex flex-col space-y-0 ml-2">
			<div class="text-sm text-white font-medium leading-tight">{{ user.displayname }}</div>
			<div class="text-xs text-color font-medium leading-tight">#23288</div>
		</div>
		<button @click="handleSignOut" class="ml-auto mr-2 font-medium text-sm text-white">Sign out</button>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { authenticated } from '@/global/auth';
import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'vue-router';
import { user } from '@/global/user';

export default defineComponent({
	setup() {
		const auth = getAuth();
		const router = useRouter();
		const handleSignOut = async () => {
			try {
				await signOut(auth);
				authenticated.value = false;
				router.push('/');
			} catch (e) {
				console.log('error signing out', e);
			}
		};
		return {
			user,
			handleSignOut,
		};
	},
});
</script>

<style scoped></style>
