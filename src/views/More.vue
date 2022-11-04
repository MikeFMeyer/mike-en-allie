<template>
  <div class="bg-gray-50 min-h-screen">
    <div class="mx-auto max-w-7xl py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-3xl divide-y-2 divide-gray-200">
        <h2 class="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">More Wedding Related Info</h2>
        <dl class="mt-10 space-y-6 divide-y divide-gray-200">
          <Disclosure as="div" class="pt-6" v-slot="{ open }">
            <dt class="text-lg">
              <DisclosureButton class="flex w-full items-start justify-between text-left text-gray-400">
                <span class="font-medium text-gray-900">Places to stay in the area</span>
                <span class="ml-6 flex h-7 items-center">
                  <ChevronDownIcon :class="[open ? '-rotate-180' : 'rotate-0', 'h-6 w-6 transform']" aria-hidden="true" />
                </span>
              </DisclosureButton>
            </dt>
            <DisclosurePanel as="div" class="mt-10">
							<ul role="list">
								<li v-for="location in locations" :key="location.id" class="relative py-5 px-4 border-b border-solid border-gray-400 last:border-b-0">
									<a :href="location.link" target="_blank">
										<div class="flex justify-between">
											<div class="min-w-0 flex-1">
												<span class="absolute inset-0" aria-hidden="true" />
												<p class="text-md font-medium text-gray-900">{{ location.name }}</p>
											</div>
											<span class="flex-shrink-0 whitespace-nowrap text-sm text-gray-500">{{ location.distance }} from venue</span>
										</div>
										<div class="mt-4">
											<p class="text-sm text-gray-600 line-clamp-2">{{ location.link }}</p>
										</div>
									</a>
								</li>
							</ul>
            </DisclosurePanel>
          </Disclosure>
          <Disclosure as="div" class="pt-6" v-slot="{ open }">
            <dt class="text-lg">
              <DisclosureButton class="flex w-full items-start justify-between text-left text-gray-400">
                <span class="font-medium text-gray-900">What should I wear to the wedding?</span>
                <span class="ml-6 flex h-7 items-center">
                  <ChevronDownIcon :class="[open ? '-rotate-180' : 'rotate-0', 'h-6 w-6 transform']" aria-hidden="true" />
                </span>
              </DisclosureButton>
            </dt>
            <DisclosurePanel as="div" class="mt-10">
							<p>Please wear formal wear.</p>
            </DisclosurePanel>
          </Disclosure>
        </dl>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/24/outline'

const locations = [
  {
    id: 1,
    name: 'Klyne Jiweel Guest House',
    link: 'https://goo.gl/maps/vinrgdTSZBzCpNwCA',
    distance: '600m',
  },
  {
    id: 2,
    name: 'Batter Boys',
    link: 'https://goo.gl/maps/hXpEt6VPobDBg7cw9',
    distance: '1.1km',
  },
  {
    id: 3,
    name: 'Prinshof Manor',
    link: 'https://g.page/prinshofmanorgh?share',
    distance: '3.8km',
  },
  {
    id: 4,
    name: 'Delectus Manor Guest Lodge',
    link: 'https://goo.gl/maps/yiMqgxP8V11ns6wVA',
    distance: '1.6km',
  },
  {
    id: 5,
    name: 'Sheraton Pretoria Hotel',
    link: 'https://goo.gl/maps/nmqgpDQGu8Fz7WccA',
    distance: '16km',
  },
  {
    id: 6,
    name: 'Villa San Giovanni Accommodation',
    link: 'https://goo.gl/maps/KTvhru4Ukndnkgmr6',
    distance: '6.5km',
  },
]
</script>
