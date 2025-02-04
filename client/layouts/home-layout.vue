<template>
  <div>
    <nav class="flex items-center justify-between p-4 text-black shadow">
      <p>Attendance Manager</p>
      <div class="flex items-center gap-2">
        <div class="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">{{ user.username[0].toUpperCase() }}</div>
        <div>
          <p class="text-base leading-4">{{ user.username }}</p>
          <p class="text-sm text-gray-400">{{ user.email }}</p>
        </div>
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
