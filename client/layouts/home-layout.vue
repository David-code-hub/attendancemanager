<template>
  <div>
    <nav class="flex items-center justify-between px-10 py-3 text-black shadow">
      <p class="text-base font-medium">Attendance Manager</p>
      <div class="flex items-center gap-2">
        <CreateStudentGroup />
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
