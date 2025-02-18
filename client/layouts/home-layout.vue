<template>
  <div>
    <nav class="flex items-center justify-between px-10 py-3 text-black shadow">
      <p class="text-base font-medium">Attendance Manager</p>
      <div class="flex items-center gap-2">
        <button type="button" class="submit-button items-center gap-2 text-nowrap">Create Session</button>
        <router-link type="button" class="submit-button border bg-white text-black" to="/" @click="userStore.clearUserStore()">Logout</router-link>
      </div>
    </nav>
    <main class="p-10">
      <slot />
    </main>
  </div>
</template>
<script setup lang="ts">
import { useUserStore } from "#imports";

const userStore = useUserStore();
</script>
