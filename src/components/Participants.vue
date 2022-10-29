<script setup>
	import {
		Dialog,
		DialogPanel,
		DialogTitle,
		TransitionChild,
		TransitionRoot,
		Switch,
	} from "@headlessui/vue";
	import { ref } from "vue";
	import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
	import { db } from "@/firebase";

	const props = defineProps({
		participants: {
			type: Array,
			required: true,
		},
		docId: {
			type: String,
			required: true,
		},
		state: {
			type: Boolean,
			required: true
		}
	});

	const emit = defineEmits(['closeModal'])

	let participants = ref(props.participants);

	const docRef = doc(db, "invites", props.docId);

	async function submit() {
    // Check before RSVP date
    let today = new Date()
    today.setHours(0,0,0,0,0)
    let rsvp = new Date(2023, 0, 10)

    if (today < rsvp) {
      let newArray = [];
      Object.values(participants.value).forEach((item) => {
        newArray.push({ person: item.person, coming: item.coming });
      });
      await updateDoc(docRef, {
        participants: newArray,
        updated: serverTimestamp(),
      });
      emit("closeModal")
    } else {
      alert("It's past the RSVP time. Can't RSVP anymore")
      emit("closeModal")
    }
	}

	function closeModal() {
		emit("closeModal")
	}
</script>
	
<template>
	<TransitionRoot as="template" :show="state">
		<Dialog as="div" class="relative z-10" @close="closeModal">
			<TransitionChild
				as="template"
				enter="ease-out duration-300"
				enter-from="opacity-0"
				enter-to="opacity-100"
				leave="ease-in duration-200"
				leave-from="opacity-100"
				leave-to="opacity-0"
			>
				<div
					class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
				/>
			</TransitionChild>

			<div class="fixed inset-0 z-10 overflow-y-auto">
				<div
					class="flex justify-center min-h-full p-4 text-center items-center sm:p-0"
				>
					<TransitionChild
						as="template"
						enter="ease-out duration-300"
						enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						enter-to="opacity-100 translate-y-0 sm:scale-100"
						leave="ease-in duration-200"
						leave-from="opacity-100 translate-y-0 sm:scale-100"
						leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
					>
						<DialogPanel
							class="relative px-4 pt-5 pb-4 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:w-full sm:max-w-sm sm:p-6"
						>
							<div>
								<div class="mt-3 text-center sm:mt-5">
									<DialogTitle
										as="h3"
										class="text-lg font-medium leading-6 text-gray-900"
										>RSVP</DialogTitle
									>
									<div class="mt-2">
										<p class="text-sm text-gray-500">
											Please check or uncheck depending on if you will be
											attending or not.
										</p>
									</div>
									<ul role="list" class="space-y-3">
										<li
											v-for="participant in participants"
											:key="participant.person"
											class="flex items-center justify-between px-4 py-4 overflow-hidden bg-white shadow sm:rounded-md sm:px-6"
										>
											<div>{{ participant.person }}</div>
											<Switch
												v-model="participant.coming"
												:class="[
													participant.coming ? 'bg-black' : 'bg-gray-200',
													'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2',
												]"
											>
												<span
													:class="[
														participant.coming
															? 'translate-x-5'
															: 'translate-x-0',
														'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
													]"
												>
													<span
														:class="[
															participant.coming
																? 'opacity-0 ease-out duration-100'
																: 'opacity-100 ease-in duration-200',
															'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity',
														]"
														aria-hidden="true"
													>
														<svg
															class="w-3 h-3 text-gray-400"
															fill="none"
															viewBox="0 0 12 12"
														>
															<path
																d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
																stroke="currentColor"
																stroke-width="2"
																stroke-linecap="round"
																stroke-linejoin="round"
															/>
														</svg>
													</span>
													<span
														:class="[
															participant.coming
																? 'opacity-100 ease-in duration-200'
																: 'opacity-0 ease-out duration-100',
															'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity',
														]"
														aria-hidden="true"
													>
														<svg
															class="w-3 h-3 text-black"
															fill="currentColor"
															viewBox="0 0 12 12"
														>
															<path
																d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z"
															/>
														</svg>
													</span>
												</span>
											</Switch>
										</li>
									</ul>
								</div>
							</div>
							<div class="mt-5 sm:mt-6">
								<button
									type="button"
									class="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-black border border-transparent rounded-md shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 sm:text-sm"
									@click="submit"
								>
									Submit
								</button>
							</div>
						</DialogPanel>
					</TransitionChild>
				</div>
			</div>
		</Dialog>
	</TransitionRoot>
</template>
