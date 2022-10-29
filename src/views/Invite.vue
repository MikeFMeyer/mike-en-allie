<script setup>
	import { ref, onMounted } from "vue";
	import  { db }  from "@/firebase";
	import { doc, getDoc } from "firebase/firestore";
	import Participants  from "@/components/Participants.vue"
	import { useRoute, useRouter } from 'vue-router'

	let images = [
		'"/images/1.jpg"',
		'"/images/2.jpg"',
		'"/images/3.jpeg"',
		'"/images/4.jpg"',
	];

	let invite = ref({})
	const open = ref(false)
	const route = useRoute()
	const router = useRouter()
	const loading = ref(false)

	onMounted(async () => {
		loading.value = true
		const docRef = doc(db, "invites", route.params.id);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			invite.value = docSnap.data();
			invite.value.id = docSnap.id
			loading.value = false
		} else {
			invite.value = {};
			router.push({
				name: 'NotFound'
			})
		}
	})

	function closeModal() {
		open.value = false
	}
	function openModal() {
		open.value = true
	}
</script>

<template>
	<div class="min-h-screen w-full flex items-center justify-center" v-show="loading">
		<div role="status">
			<svg aria-hidden="true" class="mr-2 w-16 h-16 text-gray-200 animate-spin fill-black" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"></path>
					<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"></path>
			</svg>
			<span class="sr-only">Loading...</span>
		</div>
	</div>
	<div class="grid grid-cols-1 md:grid-cols-2" v-show="!loading">
		<div class="min-h-screen">
			<div
				id="slideshow"
				class="relative w-full h-screen overflow-hidden"
				:data-zs-src="'[' + images + ']'"
				data-zs-overlay="false"
				data-zs-bullets="false"
			>
				<div id="content">
					<div class="flex flex-col justify-around mx-auto align-center">
						<h1
							class="mb-4 text-6xl font-medium leading-none text-black md:mb-12"
						>
							18.02.23
						</h1>
					</div>
				</div>
				<p class="absolute w-full text-center bottom-20 md:hidden">
					scroll down to rsvp
				</p>
			</div>
		</div>
		<div
			class="flex flex-col justify-center min-h-screen px-10 text-center align-center lg:px-24 invite-box"
		>
		<h2 class="mb-4 text-xl text-black uppercase md:text-2xl">You're invited to</h2>
			<h1 class="mb-4 text-5xl font-medium leading-none text-black xl:text-8xl lg:text-7xl md:text-6xl md:mb-12">
				<span class="inline-block">Mike</span><small class="inline-block px-6 text-2xl xl:text-5xl lg:text-4xl md:text-3xl">&amp;</small><span class="inline-block">Allie's</span><br>
				<span class="inline-block">Wedding</span>
			</h1>
			<p class="mt-10 text-base not-italic font-light text-black md:text-2xl">When: <strong class="font-bold">18 February 2023, 14:00 for 15:00</strong></p>
			<p class="mt-10 text-base not-italic font-light text-black md:text-2xl">Where: <a href="https://www.google.com/maps/search/?api=1&query=bell+and+blossom" target="_blank" class="underline"><strong class="font-bold">Bell & Blossom Wedding Venue, Pretoria</strong></a></p>
			<span class="mt-12 text-center text-black">RSVP before 10 January 2023</span>
			<button
				@click="openModal"
				class="items-center inline-block w-full max-w-sm px-6 py-3 mx-auto mt-16 text-base font-medium text-center text-white bg-black border border-transparent shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-back focus:ring-offset-2"
			>
				RSVP
			</button>
			<router-link to="/more" class="mt-10 text-center text-black underline">More info</router-link>
			<Participants @closeModal="closeModal" :state="open" v-if="Object.keys(invite).length !== 0" :participants="invite.participants" :docId="invite.id"/>
		</div>
	</div>
</template>
