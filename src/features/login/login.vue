<template>
	<div class="w-full h-full border fixed top-0 left-0 float-left flex" style="height: 100vh">
		<div class="m-auto flex flex-col space-y-3 shadow-lg p-4 rounded-md" style="width: 300px">
			login
			<input type="text" v-model="email" />
			<input type="password" v-model="password" />
			<button @click="handleLogin()">login</button>
		</div>
		<div class="m-auto flex flex-col space-y-3 shadow-lg p-4 rounded-md" style="width: 300px">
			signup
			<input placeholder="email" type="text" v-model="email" />
			<input placeholder="nickname" type="text" v-model="nickname" />
			<div v-if="nicknameAlreadyInUse">Nickname taken</div>
			<input placeholder="password" type="password" v-model="password" />
			<button @click="handleSignup()">signup</button>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import {
	getAuth,
	onAuthStateChanged,
	createUserWithEmailAndPassword,
	setPersistence,
	browserLocalPersistence,
	signInWithEmailAndPassword,
} from 'firebase/auth';
import { user } from '@/global/user';
import { addUser } from '@/composables/addUser';
import { getNickname } from '@/composables/getNickname';

export default defineComponent({
	name: 'App',
	components: {},
	setup() {
		const nicknameAlreadyInUse = ref(false);
		const router = useRouter();
		const email = ref('');
		const password = ref('');
		const nickname = ref('');

		const auth = getAuth();
		onAuthStateChanged(auth, (user) => {
			console.log(user);
			if (user) router.push('/posts');
		});

		const handleLogin = () => {
			setPersistence(auth, browserLocalPersistence)
				.then(() => {
					// Existing and future Auth states are now persisted in the current
					// session only. Closing the window would clear any existing state even
					// if a user forgets to sign out.
					// ...
					// New sign-in will be persisted with session persistence.
					return signInWithEmailAndPassword(auth, email.value, password.value);
				})
				.catch((error) => {
					// Handle Errors here.
					const errorCode = error.code;
					const errorMessage = error.message;
				});
		};
		const handleSignup = async () => {
			const nicknameAvailable = (await getNickname(nickname.value)) as any;
			if (!nicknameAvailable) {
				nicknameAlreadyInUse.value = true;
				return;
			}
			createUserWithEmailAndPassword(auth, email.value, password.value)
				.then((userCredential) => {
					console.log(userCredential);
					// Signed in
					user.value = userCredential.user;
					addUser(userCredential.user, nickname.value);
					// ...
				})
				.catch((error) => {
					const errorCode = error.code;
					const errorMessage = error.message;
					// ..
				});
		};
		return { handleLogin, email, password, handleSignup, nickname, nicknameAlreadyInUse };
	},
});
</script>

<style scoped>
.sign-in-btn {
	background: rgb(40, 40, 40);
	transition: all 0.2s ease;
	cursor: pointer;
}

.sign-in-btn:hover {
	background: rgb(50, 50, 50);
	color: #fff;
}
</style>
