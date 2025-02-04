<template>
  <div class="flex items-center justify-center">
    <div class="max-w-[300px] rounded-lg p-5 shadow">
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

definePageMeta({
  layout: "home-layout",
});
</script>

<style scoped></style>
