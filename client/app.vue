<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <AppNotificationHandler type="success" message="successfully" :show-message="true" />
  </div>
</template>
