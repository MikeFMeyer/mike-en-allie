<script setup>
	import { ref, onMounted } from "vue";
	import  { db }  from "@/firebase";
	import { doc, getDoc } from "firebase/firestore";
	import Participants  from "@/components/Participants.vue"

	let images = [
		'"/src/assets/images/1.jpg"',
		'"/src/assets/images/2.jpg"',
		'"/src/assets/images/3.jpeg"',
		'"/src/assets/images/4.jpg"',
	];

	let invite = ref({})
	const open = ref(false)

	onMounted(async () => {
		const docRef = doc(db, "invites", "test-invite");
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			invite.value = docSnap.data();
			invite.value.id = docSnap.id
		} else {
			invite.value = {};
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
	
	<div class="grid grid-cols-1 md:grid-cols-2">
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
			<p class="mt-10 text-base not-italic font-light text-black md:text-2xl">When: <strong class="font-bold">18 February 2023, 14:00</strong></p>
			<p class="mt-10 text-base not-italic font-light text-black md:text-2xl">Where: <a href="https://www.google.com/maps/search/?api=1&query=bell+and+blossom" target="_blank" class="underline"><strong class="font-bold">Bell & Blossom Wedding Venue</strong></a></p>
			<span class="mt-12 text-center text-black">RSVP before 10 January 2023</span>
			<button
				@click="openModal"
				class="items-center inline-block w-full max-w-sm px-6 py-3 mx-auto mt-16 text-base font-medium text-center text-white bg-black border border-transparent shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-back focus:ring-offset-2"
			>
				RSVP
			</button>
			<span class="mt-10 text-center text-black underline">More info</span>
			<Participants @closeModal="closeModal" :state="open" v-if="Object.keys(invite).length !== 0" :participants="invite.participants" :docId="invite.id"/>
		</div>
	</div>
</template>
