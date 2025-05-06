<template>
    <div class="max-w">
      <div class="relative rounded-md shadow-sm">
        <input
          v-model="searchTerm"
          @input="handleSearch"
          type="text"
          class="block w-full rounded-md border-gray-500 pl-10 py-2 focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Search notes..."
        />
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
          </svg>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, watch } from 'vue';
  
  const emit = defineEmits(['search']);
  
  const searchTerm = ref('');
  
  const handleSearch = () => {
    emit('search', searchTerm.value);
  };
  
  // Debounce search
  const debounceSearch = ref<ReturnType<typeof setTimeout> | null>(null);
  
  watch(searchTerm, () => {
    if (debounceSearch.value) {
      clearTimeout(debounceSearch.value);
    }
    
    debounceSearch.value = setTimeout(() => {
      handleSearch();
    }, 300);
  });
  </script>