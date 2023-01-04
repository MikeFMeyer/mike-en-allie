<script setup>
	import { ref, onMounted } from "vue";
	import  { db }  from "@/firebase";
	import { collection, getDocs } from "firebase/firestore";

	const invites = ref([])
	const loading = ref(false)
	const coming = ref(0)
	const total = ref(0)

	onMounted(async () => {
		loading.value = true
		const querySnapshot = await getDocs(collection(db, "invites"));
		querySnapshot.forEach((doc) => {
			let newDoc = {
				id: doc.id,
				...doc.data()
			}
			invites.value.push(newDoc)
		});

		invites.value.forEach(el => {
			el.participants.forEach(par => {
				if (par.coming) {
					coming.value += 1
				}
				total.value += 1
			})
		})

		loading.value = false
	})
</script>

<template>
	<div class="p-2 m-2">
		<p>Total: {{ total }}</p>
		<p>Coming: {{ coming }}</p>
	</div>
	<div v-show="!loading">
		<div v-for="item in invites" v-bind:key="item.id" class="p-2 m-2">
			<ul>
				<li v-for="part in item.participants" v-bind:key="part.person">{{ part.person }} - {{ part.coming ? "Coming" : "Not Coming" }}</li>
			</ul>
			<p class="italic mt-2 text-gray-600">{{ item.updated.toDate() }}</p>
		</div>
	</div>
</template>
