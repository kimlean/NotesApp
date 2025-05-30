<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div class="space-y-4">
      <div>
        <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
        <input
          id="username"
          v-model="form.username"
          type="text"
          required
          class="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
        />
      </div>

      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          required
          class="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
        />
      </div>

      <div>
        <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
        <input
          id="password"
          v-model="form.password"
          type="password"
          required
          minlength="6"
          class="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
        />
      </div>
    </div>

    <div v-if="error" class="text-red-500 text-sm mt-2">
      {{ error }}
    </div>

    <button
      type="submit"
      :disabled="loading"
      class="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {{ loading ? "Registering..." : "Register" }}
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import type { RegisterDto } from "@/types/auth";

const router = useRouter();
const authStore = useAuthStore();

const form = ref<RegisterDto>({
  username: "",
  email: "",
  password: "",
});

const loading = ref(false);
const error = ref("");

const handleSubmit = async () => {
  try {
    loading.value = true;
    error.value = "";

    const success = await authStore.register(form.value);
    if (success) {
      router.push("/login");
    } else {
      error.value = "Registration failed. Please try again.";
    }
  } catch (err) {
    error.value = "Registration failed. Please try again.";
  } finally {
    loading.value = false;
  }
};
</script>
