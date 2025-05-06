<script setup lang="ts">
// No script needed for this component
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
        <h1 class="text-3xl font-extrabold text-gray-900">Notes App</h1>
        <p class="mt-2 text-sm text-gray-600">
          Easily manage your notes and stay organized.
        </p>
      </div>

      <div
        class="bg-white py-8 px-6 shadow-xl rounded-2xl transform transition duration-300 hover:scale-105 hover:shadow-2xl"
      >
        <div class="flex flex-col gap-4">
          <router-link
            to="/login"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition"
          >
            Login
          </router-link>
          <router-link
            to="/register"
            class="w-full flex justify-center py-2 px-4 border border-indigo-600 rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-indigo-50 transition"
          >
            Register
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
