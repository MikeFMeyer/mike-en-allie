<script setup>
	import  { db }  from "@/firebase";
	import { ref, onMounted, watch } from "vue";
	import { doc, getDoc } from "firebase/firestore";
	import Participants  from "@/components/Participants.vue"


	let invite = ref({})

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
</script>

<template>
	<ul role="list" class="space-y-3">
    <Participants v-if="Object.keys(invite).length !== 0" :participants="invite.participants" :docId="invite.id"/>
  </ul>
</template>
