<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div>
      <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
      <input
        id="email"
        v-model="form.email"
        type="email"
        required
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-700 p-1"
      />
    </div>

    <div>
      <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
      <input
        id="password"
        v-model="form.password"
        type="password"
        required
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-700 p-1"
      />
    </div>

    <div v-if="error" class="text-red-500 text-sm">
      {{ error }}
    </div>

    <button
      type="submit"
      :disabled="loading"
      class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
    >
      {{ loading ? "Logging in..." : "Login" }}
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import type { LoginDto } from "@/types/auth";

const router = useRouter();
const authStore = useAuthStore();

const form = ref<LoginDto>({
  email: "",
  password: "",
});

const loading = ref(false);
const error = ref("");

const handleSubmit = async () => {
  try {
    loading.value = true;
    error.value = "";

    const success = await authStore.login(form.value);
    if (success) {
      router.push("/dashboard");
    } else {
      error.value = "Invalid email or password";
    }
  } catch (err) {
    error.value = "Login failed. Please try again.";
  } finally {
    loading.value = false;
  }
};
</script>
