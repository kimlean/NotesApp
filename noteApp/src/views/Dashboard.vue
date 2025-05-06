<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <h1 class="text-xl font-semibold">Notes App</h1>
            </div>
          </div>
          <div class="flex items-center">
            <button
              @click="handleLogout"
              class="ml-4 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-gray-900">My Notes</h2>
          <button
            @click="createNewNote"
            class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            New Note
          </button>
        </div>

        <div class="mb-6">
          <NoteSearch @search="handleSearch" />
        </div>

        <NoteList @edit="editNote" v-if="!showForm" />

        <div v-if="showForm" class="mt-6">
          <h3 class="text-lg font-medium text-gray-900 mb-4">
            {{ formTitle }}
          </h3>
          <NoteForm
            :note="currentNote"
            @saved="handleNoteFormSaved"
            @cancel="handleNoteFormCancel"
          />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../store/authStore";
import { useNotesStore } from "../store/notesStore";
import NoteList from "../components/Notes/NoteList.vue";
import NoteForm from "../components/Notes/NoteForm.vue";
import NoteSearch from "../components/Notes/NoteSearch.vue";

const router = useRouter();
const authStore = useAuthStore();
const notesStore = useNotesStore();

const showForm = ref(false);
const currentNote = ref(null);

const formTitle = computed(() => {
  return currentNote.value ? "Edit Note" : "Create Note";
});

const handleLogout = () => {
  authStore.logout();
  router.push("/login");
};

const createNewNote = () => {
  currentNote.value = null;
  showForm.value = true;
};

const editNote = (note) => {
  currentNote.value = note;
  showForm.value = true;
};

const handleNoteFormSaved = () => {
  showForm.value = false;
  currentNote.value = null;
};

const handleNoteFormCancel = () => {
  showForm.value = false;
  currentNote.value = null;
};

const handleSearch = (searchTerm) => {
  if (searchTerm) {
    notesStore.searchNotes(searchTerm);
  } else {
    notesStore.fetchNotes();
  }
};
</script>
