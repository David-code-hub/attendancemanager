<template>
  <div class="mb-10 flex items-center justify-center gap-2">
    <input class="input-field w-80" placeholder="Search sessions..." />
    <button class="submit-button w-fit border border-black bg-white text-black">Search</button>
  </div>

  <div class="flex items-center justify-between">
    <p class="text-sm text-gray-400">0 Sessions</p>

    <div class="w-72">
      <Listbox v-model="selectedGroup">
        <div class="relative mt-1">
          <ListboxButton class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span class="block truncate">{{ selectedGroup?.name || "Filter by group" }}</span>
            <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <Icon name="iconamoon:arrow-down-2" class="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </ListboxButton>

          <transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0">
            <ListboxOptions class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              <ListboxOption v-slot="{ active, selected }" v-for="group in studentGroups" :key="group.name" :value="group" as="template">
                <li :class="[active ? 'bg-gray-100' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-10 pr-4']">
                  <span class="block truncate font-normal">{{ group.name }}</span>
                  <span v-if="selected" class="absolute inset-y-0 left-0 flex items-center pl-3">
                    <Icon name="iconamoon:check" class="h-5 w-5" aria-hidden="true" />
                  </span>
                </li>
              </ListboxOption>
              <div class="px-2">
                <CreateStudentGroup />
              </div>
            </ListboxOptions>
          </transition>
        </div>
      </Listbox>
    </div>
  </div>

  <AppNoDataPlaceholder />

  <!-- <div class="mt-10 grid grid-cols-4 items-center justify-center gap-5">
    <SessionCard v-for="i in 1" />
  </div> -->
</template>

<script setup lang="ts">
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from "@headlessui/vue";
import { handleEndpoints } from "~/server/end-points";

const isLoading = ref(false);
const name = ref("");
const studentGroups = ref([] as any);
const selectedGroup = ref();

const { handleGetStudentsGroup, handleCreateStudentsGroup } = handleEndpoints();

const handleGetStudents = async () => {
  const studentGroupState = handleGetStudentsGroup();

  isLoading.value = true;
  await studentGroupState.execute();
  studentGroups.value = studentGroupState.state.value;
  isLoading.value = studentGroupState.isLoading.value;
};

const handleCreateStudents = async () => {
  const studentGroupState = handleCreateStudentsGroup(name.value);
  isLoading.value = true;
  await studentGroupState.execute();
  isLoading.value = studentGroupState.isLoading.value;
};

definePageMeta({
  layout: "home-layout",
});

onMounted(() => {
  handleGetStudents();
});
</script>

<style scoped></style>
