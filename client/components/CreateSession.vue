<template>
  <div class="inset-0 flex items-center justify-center">
    <button type="button" @click="openModal" class="submit-button items-center gap-2">
      <Icon name="iconamoon:sign-plus-circle-fill" class="size-5" />
      Create New Session
    </button>
  </div>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100" leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-black/25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95" enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100" leave-to="opacity-0 scale-95">
            <DialogPanel class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900"> Create New Session </DialogTitle>
              <div class="mt-2">
                <p class="text-sm text-gray-500">Lorem ipsum dolor disficis en amet dolorite.</p>
              </div>

              <div class="mt-7 flex items-center justify-end gap-2">
                <button type="button" class="submit-button w-fit border bg-white px-10 text-black shadow">Cancel</button>
                <button type="button" class="submit-button w-fit px-10" @click="closeModal">Submit</button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from "@headlessui/vue";

const isOpen = ref(false);

function closeModal() {
  isOpen.value = false;
}
function openModal() {
  isOpen.value = true;
}
</script>
