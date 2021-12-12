<template>
	<div class="w-full bg-black h-full border fixed top-0 left-0 float-left flex opacity-40" style="height: 100vh">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			xmlns:xlink="http://www.w3.org/1999/xlink"
			version="1.1"
			width="1920"
			height="1080"
			viewBox="0 0 1920 1080"
			xml:space="preserve"
		>
			<desc>Created with Fabric.js 3.6.3</desc>
			<defs></defs>
			<g transform="matrix(1.06 0 0 1.16 982.48 464.42)">
				<path
					style="
						stroke: rgb(0, 0, 0);
						stroke-width: 0;
						stroke-dasharray: none;
						stroke-linecap: butt;
						stroke-dashoffset: 0;
						stroke-linejoin: miter;
						stroke-miterlimit: 4;
						fill: rgb(10, 10, 10);
						fill-rule: nonzero;
						opacity: 1;
					"
					vector-effect="non-scaling-stroke"
					transform=" translate(-960, -544)"
					d="M 3 602 L 417 296 L 548 467 L 9 882 L 1304 13 L 1523 302 L 670 928 Q 1917 278 1917 278 Q 1915 1073 1915 1073 L 3 1075 L 3 602 L 3 602 Q 3 602 3 602"
					stroke-linecap="round"
				/>
			</g>
		</svg>
	</div>
	<div class="absolute left-0 top-0 flex w-full h-full">
		<div class="m-auto flex flex-col rounded-md" v-if="!showCreateAccountForm" style="width: 500px">
			<div class="text-6xl text-white space-x-4 justify-center w-full flex items-center text-center font-bold mb-3">
				<span style="font-size: 100px" class="text-blue-600 material-icons">link</span>
				<span>Darkbyte</span>
			</div>

			<label for="email" class="mb-1.5 font-bold uppercase">email</label>
			<input name="email" type="text" class="mb-5" v-model="email" />
			<label for="password" class="mb-1.5 font-bold uppercase">password</label>
			<input name="passwsord" type="password" v-model="password" />
			<div class="flex flex-col w-full space-y-2">
				<button class="w-full bg-blue-600 rounded-md py-2.5 mt-10 text-white" @click="handleLogin()">Login</button>
				<div class="text-sm flex space-x-2">
					<span class="text-white">Need an account?</span>
					<span class="text-blue-600" @click="showCreateAccountForm = true">Register</span>
				</div>
			</div>
		</div>
		<div class="m-auto flex flex-col rounded-md" v-else style="width: 500px">
			<div class="text-6xl text-white space-x-4 justify-center w-full flex items-center text-center font-bold mb-3">
				<span style="font-size: 100px" class="text-blue-600 material-icons">link</span>
				<span>Darkbyte</span>
			</div>
			<label for="email" class="mb-1.5 font-bold uppercase">email</label>
			<input name="email" type="text" class="mb-5" v-model="email" />
			<label for="displayname" class="mb-1.5 font-bold uppercase">Display Name</label>
			<input name="displayname" type="text" class="mb-5" v-model="displayName" />
			<label for="password" class="mb-1.5 font-bold uppercase">password</label>
			<input name="passwsord" type="password" v-model="password" />
			<div class="flex flex-col w-full space-y-2">
				<button class="w-full bg-blue-600 rounded-md py-2.5 mt-10 text-white" @click="handleSignup()">
					Create account
				</button>
				<div class="text-sm flex space-x-2">
					<span class="text-blue-600" @click="showCreateAccountForm = false">Already have an account?</span>
				</div>
			</div>
		</div>
	</div>
	<!-- <div class="m-auto flex flex-col space-y-3 shadow-lg p-4 rounded-md" style="width: 300px">
			signup
			<input placeholder="email" type="text" v-model="email" />
			<input placeholder="displayname" type="text" v-model="displayName" />
			<div v-if="displayNameAlreadyInUse">displayname taken</div>
			<input placeholder="password" type="password" v-model="password" />
			<button @click="handleSignup()">signup</button>
		</div> -->
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
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
import { getDisplayName } from '@/composables/getDisplayName';

export default defineComponent({
	name: 'App',
	components: {},
	setup() {
		const displayNameAlreadyInUse = ref(false);
		const router = useRouter();
		const email = ref('');
		const password = ref('');
		const displayName = ref('');
		const showCreateAccountForm = ref(false);

		const auth = getAuth();
		onAuthStateChanged(auth, (user) => {
			if (user) router.push(`/profile/${user.uid}`);
		});
		console.log('asd');

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
			const displayNameAvailable = (await getDisplayName(displayName.value)) as any;
			if (!displayNameAvailable) {
				displayNameAlreadyInUse.value = true;
				return;
			}
			createUserWithEmailAndPassword(auth, email.value, password.value)
				.then(async (userCredential) => {
					console.log(userCredential);
					// Signed in
					user.value = userCredential.user;
					await addUser(userCredential.user, displayName.value);
					router.push(`/profile/${userCredential.user.uid}`);
					// ...
				})
				.catch((error) => {
					const errorCode = error.code;
					const errorMessage = error.message;
					// ..
				});
		};
		return { handleLogin, email, password, handleSignup, displayName, displayNameAlreadyInUse, showCreateAccountForm };
	},
});
</script>

<style scoped>
.sign-in-btn {
	background: rgb(40, 40, 40);
	transition: all 0.2s ease;
	cursor: pointer;
}

input {
	background: #424242;
	padding: 10px;
	height: 40px;
	border-radius: 3px;
	outline: none;
	font-size: 16px;
	transition: all 0.2s ease;
	color: white;
}

input:focus {
	border: 1px solid rgb(0, 162, 255);
}

label {
	color: #757779;
	font-size: 12px;
}

.sign-in-btn:hover {
	background: rgb(50, 50, 50);
	color: #fff;
}
</style>
