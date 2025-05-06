<template>
  <div>
    <div v-if="loading" class="text-center py-10">
      <p class="text-gray-500">Loading notes...</p>
    </div>
    
    <div v-else-if="notes.length === 0" class="text-center py-10">
      <p class="text-gray-500">No notes found. Create your first note!</p>
    </div>
    
    <div v-else class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <NoteCard
        v-for="note in notes"
        :key="note.id"
        :note="note"
        @edit="editNote"
        @delete="confirmDelete"
      />
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" 
    class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
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
import NoteCard from './NoteCard.vue';

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