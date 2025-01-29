<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 class="text-md font-regular mt-10 text-center tracking-tight text-gray-600">Sign in to continue</h2>
      <h2 class="mt-1 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Attendance Manager</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" action="#" method="POST">
        <div>
          <label for="email" class="block text-sm/6 font-medium text-gray-900">Email address</label>
          <div class="mt-2">
            <input type="email" name="email" id="email" autocomplete="email" required="true" class="input-field" />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm/6 font-medium text-gray-900">Password</label>
            <!-- <div class="text-sm">
              <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
            </div> -->
          </div>
          <div class="mt-2">
            <input type="password" name="password" id="password" autocomplete="current-password" required="true" class="input-field" />
          </div>
        </div>

        <div>
          <button type="submit" class="submit-button">Sign in</button>
        </div>
      </form>

      <!-- <p class="mt-10 text-center text-sm/6 text-gray-500">
        Not a member?
        {{ " " }}
        <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Start a 14 day free trial</a>
      </p> -->
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
