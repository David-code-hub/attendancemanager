<template>
  <div>
    <nav class="flex items-center justify-between px-10 py-3 text-black shadow">
      <p class="text-base font-medium">Attendance Manager</p>
      <div class="flex items-center gap-2">
        <router-link class="submit-button items-center gap-2" to="/">
          <Icon name="iconamoon:sign-plus-circle-fill" class="size-5" />
          Create New Session</router-link
        >
        <router-link class="submit-button w-fit items-center gap-2 bg-white text-black" to="/" @click="userStore.clearUserStore"> Logout </router-link>
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
