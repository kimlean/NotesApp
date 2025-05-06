<template>
    <div class="space-y-4">
      <div v-if="loading" class="text-center py-4">
        Loading notes...
      </div>
      
      <div v-else-if="error" class="text-red-500 text-center py-4">
        {{ error }}
      </div>
      
      <div v-else-if="notes.length === 0" class="text-center py-4 text-gray-500">
        No notes found. Create your first note!
      </div>
      
      <div v-else class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <NoteCard
          v-for="note in notes"
          :key="note.id"
          :note="note"
          @edit="editNote"
          @delete="deleteNote"
        />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { onMounted } from 'vue';
  import { useNotesStore } from '@/stores/notesStore';
  import NoteCard from './NoteCard.vue';
  import type { Note } from '@/types/note';
  
  const notesStore = useNotesStore();
  const { notes, loading, error } = notesStore;
  
  const emit = defineEmits(['edit']);
  
  onMounted(() => {
    notesStore.fetchNotes();
  });
  
  const editNote = (note: Note) => {
    emit('edit', note);
  };
  
  const deleteNote = async (id: number) => {
    await notesStore.deleteNote(id);
  };
  </script>