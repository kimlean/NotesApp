import { defineStore } from "pinia";
import { ref } from "vue";
import api from "@/utils/fetchApi";
import type { Note, NoteSaveDto } from "@/types/note";

export const useNotesStore = defineStore("notes", () => {
  const notes = ref<Note[]>([]);
  const currentNote = ref<Note | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchNotes = async () => {
    try {
      loading.value = true;
      error.value = null;
      notes.value = await api.get("/api/notes");
    } catch (err) {
      error.value = "Failed to fetch notes";
      console.error("Error fetching notes:", err);
    } finally {
      loading.value = false;
    }
  };

  const fetchNote = async (id: number) => {
    try {
      loading.value = true;
      error.value = null;
      currentNote.value = await api.get(`/api/notes/${id}`);
    } catch (err) {
      error.value = "Failed to fetch note";
      console.error("Error fetching note:", err);
    } finally {
      loading.value = false;
    }
  };

  const saveNote = async (noteDto: NoteSaveDto) => {
    try {
      loading.value = true;
      error.value = null;
      const savedNote = await api.post<Note>("/api/notes/save", noteDto);

      if (noteDto.id) {
        // Update existing note in array
        const index = notes.value.findIndex((n) => n.id === noteDto.id);
        if (index !== -1) {
          notes.value[index] = savedNote;
        }
      } else {
        // Add new note to beginning of array
        notes.value.unshift(savedNote);
      }

      return savedNote;
    } catch (err) {
      error.value = "Failed to save note";
      console.error("Error saving note:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const deleteNote = async (id: number) => {
    try {
      loading.value = true;
      error.value = null;
      await api.delete(`/api/notes/${id}`);
      notes.value = notes.value.filter((n) => n.id !== id);
    } catch (err) {
      error.value = "Failed to delete note";
      console.error("Error deleting note:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const searchNotes = async (searchTerm: string) => {
    try {
      loading.value = true;
      error.value = null;
      notes.value = await api.get("/api/notes/search", { params: { searchTerm } });
    } catch (err) {
      error.value = "Failed to search notes";
      console.error("Error searching notes:", err);
    } finally {
      loading.value = false;
    }
  };

  // Reset store state
  const resetStore = () => {
    notes.value = [];
    currentNote.value = null;
    error.value = null;
  };

  return {
    notes,
    currentNote,
    loading,
    error,
    fetchNotes,
    fetchNote,
    saveNote,
    deleteNote,
    searchNotes,
    resetStore
  };
});