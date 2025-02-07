<template>
  <div class="mt-10 grid grid-cols-4 items-center justify-center gap-5">
    <SessionCard v-for="i in 4" />
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
