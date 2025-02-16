<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <AppNotificationHandler />
  </div>
</template>
<script setup lang="ts">
import { provideUseId } from "@headlessui/vue";

provideUseId(() => useId());
</script>
