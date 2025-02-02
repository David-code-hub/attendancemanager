<template>
  <div class="flex h-screen min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 class="text-md font-regular text-center tracking-tight text-gray-600">Sign in to continue</h2>
      <h2 class="mt-0 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Attendance Manager</h2>
    </div>

    <div class="mt-7 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6">
        <div>
          <label for="email" class="block text-sm/6 font-medium text-gray-900">Username</label>
          <div class="mt-2">
            <input type="text" v-model="loginForm.username" name="email" id="email" autocomplete="email" required="true" class="input-field" />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm/6 font-medium text-gray-900">Password</label>
          </div>
          <div class="mt-2">
            <input type="password" name="password" v-model="loginForm.password" id="password" autocomplete="current-password" required="true" class="input-field" />
          </div>
        </div>
        <div>
          <button type="submit" @click.prevent="handleUserLogin()" class="submit-button">
            <Icon v-if="isLoading" name="svg-spinners:180-ring-with-bg" class="size-5" />
            <span v-else>Sign in</span>
          </button>
          <a href="https://github.com/David-code-hub/attendancemanager" target="_blank" class="my-3 block w-full rounded-lg border border-black px-3 py-2 text-center text-sm capitalize text-black hover:opacity-80">Github repo</a>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { handleEndpoints } from "~/server/end-points";

const { handleLogin } = handleEndpoints();

const loginForm = reactive({
  username: "",
  password: "",
});

const { state: userData, isLoading, execute: handleUserLogin_ } = handleLogin(loginForm.username, loginForm.password);

const handleUserLogin = () => {
  handleLogin(loginForm.username, loginForm.password).execute();
};
</script>

<style scoped></style>
