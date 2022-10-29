<template>
  <div class="bg-gray-50 min-h-screen">
    <div class="mx-auto max-w-7xl py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-3xl divide-y-2 divide-gray-200">
        <h2
          class="
            text-center text-3xl
            font-bold
            tracking-tight
            text-gray-900
            sm:text-4xl
          "
        >
          Gift List
        </h2>
        <p class="text-gray-900 mt-10">
          Below is a few gift ideas. Don't feel obligated to purchase the gifts
          listed below. If you want to bring a gift and it isn't listed below
          you are more than welcome. Anything, if anything is appreciated.
        </p>
        <p class="text-gray-900 mt-5">
          Please check if you have purchased a gift listed below so that
          everyone doesn't get the same thing. 😁
        </p>

        <fieldset class="mt-10">
          <legend class="text-lg font-medium text-gray-900">
            Gift suggestions
          </legend>
          <div
            class="
              mt-4
              divide-y divide-gray-200
              border-t border-b border-gray-200
            "
          >
            <div
              v-for="(person, personIdx) in people"
              :key="personIdx"
              class="relative flex items-start py-4"
            >
              <div class="mr-3 flex h-5 items-center">
                <input
                  :id="`person-${person.id}`"
                  :name="`person-${person.id}`"
                  type="checkbox"
                  class="
                    h-4
                    w-4
                    rounded
                    border-gray-300
                    text-black
                    focus:ring-black
                  "
                />
              </div>
              <div class="min-w-0 flex-1 text-sm">
                <label
                  :for="`person-${person.id}`"
                  class="select-none font-medium text-gray-700"
                  >{{ person.name }}</label
                >
              </div>
            </div>
          </div>
        </fieldset>
      </div>
    </div>
  </div>
</template>

<script setup>
const people = [
  { id: 1, name: "Annette Black" },
  { id: 2, name: "Cody Fisher" },
  { id: 3, name: "Courtney Henry" },
  { id: 4, name: "Kathryn Murphy" },
  { id: 5, name: "Theresa Webb" },
];
</script>