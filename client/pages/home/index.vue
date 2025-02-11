<template>
  <div class="mt-10 grid grid-cols-4 items-center justify-center gap-5">
    <SessionCard v-for="i in 4" />
  </div>
</template>

<script setup lang="ts">
import { handleEndpoints } from "~/server/end-points";

const isLoading = ref(false);
const { handleGetStudentsGroup } = handleEndpoints();

const handleGetStudents = async () => {
  const studentGroupState = handleGetStudentsGroup();
  isLoading.value = true;
  await studentGroupState.execute();
  isLoading.value = studentGroupState.isLoading.value;
};

definePageMeta({
  layout: "home-layout",
});

onMounted(() => {
  handleGetStudents();
});
</script>

<style scoped></style>
