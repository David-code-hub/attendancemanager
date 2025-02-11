<template>
  <div>
    <nav class="flex items-center justify-between p-4 text-black shadow">
      <p>Attendance Manager</p>
      <div class="flex items-center gap-2">
        <router-link class="submit-button items-center gap-2" to="/">
          <Icon name="iconamoon:sign-plus-circle-fill" class="size-5" />
          Create New Session</router-link
        >
        <!-- <div>
          <p class="text-base leading-4">{{ user.username }}</p>
          <p class="text-sm text-gray-400">{{ user.email }}</p>
        </div> -->
      </div>
    </nav>
    <main class="p-6">
      <slot />
    </main>
  </div>
</template>
<script setup lang="ts">
import { useUserStore } from "#imports";

const user = useUserStore().user;
</script>
