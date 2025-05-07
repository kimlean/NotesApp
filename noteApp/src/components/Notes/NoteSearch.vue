<template>
  <div class="w-full">
    <div class="relative">
      <input
        type="text"
        v-model="searchTerm"
        @input="handleSearch"
        placeholder="Search notes..."
        class="bg-white w-full py-2 px-4 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      />
      <button
        v-if="searchTerm"
        @click="clearSearch"
        class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { debounce } from '@/utils/helpers';

const emit = defineEmits(['search']);
const searchTerm = ref('');

// Debounced search function to prevent too many API calls
const debouncedSearch = debounce((term: string) => {
  emit('search', term);
}, 300);

const handleSearch = () => {
  debouncedSearch(searchTerm.value);
};

const clearSearch = () => {
  searchTerm.value = '';
  emit('search', '');
};
</script>