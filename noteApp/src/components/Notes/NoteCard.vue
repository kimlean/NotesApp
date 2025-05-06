<template>
    <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ note.title }}</h3>
      <p class="text-gray-600 mb-4 line-clamp-3">{{ note.content }}</p>
      
      <div class="flex justify-between items-center text-sm text-gray-500 mb-4">
        <span>{{ formatDate(note.createdAt) }}</span>
        <span v-if="note.updatedAt !== note.createdAt">
          Updated: {{ formatDate(note.updatedAt) }}
        </span>
      </div>
      
      <div class="flex justify-end space-x-2">
        <button
          @click="editNote"
          class="px-3 py-1 text-sm text-indigo-600 hover:text-indigo-800 border border-indigo-600 rounded hover:bg-indigo-50"
        >
          Edit
        </button>
        <button
          @click="confirmDelete"
          class="px-3 py-1 text-sm text-red-600 hover:text-red-800 border border-red-600 rounded hover:bg-red-50"
        >
          Delete
        </button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps, defineEmits } from 'vue';
  import type { Note } from '@/types/note';
  
  const props = defineProps<{
    note: Note;
  }>();
  
  const emit = defineEmits(['edit', 'delete']);
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };
  
  const editNote = () => {
    emit('edit', props.note);
  };
  
  const confirmDelete = () => {
    if (confirm('Are you sure you want to delete this note?')) {
      emit('delete', props.note.id);
    }
  };
  </script>