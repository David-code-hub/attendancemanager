<template>
  <div class="flex h-screen items-center justify-center">
    <div class="max-w-[300px] rounded-lg p-5 shadow-lg">
      <h1>home page</h1>
      <p class="text-base">
        {{ userStore.user.email }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "#imports";

const userStore = useUserStore();
</script>

<style scoped></style>
