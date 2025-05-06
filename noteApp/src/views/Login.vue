<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
    <div class="max-w-md space-y-8">
      <div class="text-center">
        <h2 class="text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
        <p class="mt-2 text-sm text-gray-600">
          Or
          <router-link to="/register" class="font-medium text-indigo-600 hover:text-indigo-500 transition">
            create a new account
          </router-link>
        </p>
      </div>

      <div
        class="bg-white py-8 px-6 shadow-xl rounded-2xl transform transition duration-300 hover:scale-[1.02] hover:shadow-2xl"
      >
        <LoginForm />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import LoginForm from "@/components/Auth/LoginForm.vue";
</script>
