<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useAuthStore } from './store/authStore';

const authStore = useAuthStore();

onMounted(() => {
  authStore.checkAuth();
});
</script>