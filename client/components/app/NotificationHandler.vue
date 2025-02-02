<template>
  <div v-if="shownNotification" :class="handleBg" class="align-center fixed top-0 flex w-full items-center justify-between gap-3 bg-gray-100 px-4 py-2">
    <div class="flex items-center gap-3">
      <Icon :name="handleIcon" class="size-6" />
      <div class="text-base text-black">{{ notification.message }}</div>
    </div>
    <button class="flex items-center rounded-full p-1 duration-300 hover:bg-gray-50/50" @click="shownNotification = false">
      <Icon name="iconamoon:close-bold" class="size-6" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { useNotificationStore } from "~/stores/notifiction-store";

const notification = computed(() => useNotificationStore().notification);

const handleIcon = ref(notification.value.type === "success" ? "iconamoon:check-circle-1-fill" : notification.value.type === "error" ? "iconamoon:close-circle-1-fill" : "iconamoon:information-circle-fill");
const handleBg = ref(notification.value.type === "success" ? "bg-green-300" : notification.value.type === "error" ? "bg-red-300" : "bg-blue-300");
const shownNotification = ref(notification.value.showMessage as Boolean);
</script>

<style scoped></style>
