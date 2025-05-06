<template>
  <div>
    <div v-if="loading" class="text-center py-10">
      <p class="text-gray-500">Loading notes...</p>
    </div>
    
    <div v-else-if="notes.length === 0" class="text-center py-10">
      <p class="text-gray-500">No notes found. Create your first note!</p>
    </div>
    
    <div v-else class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <div v-for="note in notes" :key="note.id" class="bg-white rounded-lg shadow p-4 hover:shadow-md transition">
        <div class="flex justify-between mb-2">
          <h3 class="text-lg font-semibold text-gray-800 truncate">{{ note.title }}</h3>
          <div class="flex space-x-2">
            <button @click="editNote(note)" class="text-blue-500 hover:text-blue-700">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </button>
            <button @click="confirmDelete(note)" class="text-red-500 hover:text-red-700">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
        <p class="text-gray-600 line-clamp-3">{{ note.content }}</p>
        <div class="text-sm text-gray-500 mt-2">
          {{ new Date(note.updatedAt).toLocaleDateString() }}
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Confirm Delete</h3>
        <p class="text-gray-600 mb-6">Are you sure you want to delete "{{ noteToDelete?.title }}"? This action cannot be undone.</p>
        <div class="flex justify-end space-x-3">
          <button 
            @click="cancelDelete" 
            class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancel
          </button>
          <button 
            @click="deleteNote" 
            class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useNotesStore } from '@/stores/notesStore';
import type { Note } from '@/types/note';

const notesStore = useNotesStore();

// Props and emits
const emit = defineEmits(['edit']);

// Computed properties
const notes = computed(() => notesStore.notes);
const loading = computed(() => notesStore.loading);

// Delete modal state
const showDeleteModal = ref(false);
const noteToDelete = ref<Note | null>(null);

// Methods
const editNote = (note: Note) => {
  emit('edit', note);
};

const confirmDelete = (note: Note) => {
  noteToDelete.value = note;
  showDeleteModal.value = true;
};

const cancelDelete = () => {
  showDeleteModal.value = false;
  noteToDelete.value = null;
};

const deleteNote = async () => {
  if (noteToDelete.value) {
    try {
      await notesStore.deleteNote(noteToDelete.value.id);
      showDeleteModal.value = false;
      noteToDelete.value = null;
    } catch (error) {
      console.error('Failed to delete note:', error);
    }
  }
};
</script>