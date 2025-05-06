<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <div>
      <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
      <input
        id="title"
        v-model="form.title"
        type="text"
        required
        class="bg-white mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
      />
    </div>

    <div>
      <label for="content" class="block text-sm font-medium text-gray-700">Content</label>
      <textarea
        id="content"
        v-model="form.content"
        rows="6"
        class="bg-white mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
      ></textarea>
    </div>

    <div v-if="error" class="text-red-500 text-sm">
      {{ error }}
    </div>

    <div class="flex justify-end space-x-2">
      <button
        type="button"
        @click="cancel"
        class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
      >
        Cancel
      </button>
      <button
        type="submit"
        :disabled="loading"
        class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
      >
        {{ loading ? "Saving..." : "Save" }}
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { useNotesStore } from "@/stores/notesStore";
import type { Note, NoteSaveDto } from "@/types/note";

const props = defineProps({
  note: {
    type: Object as () => Note | null,
    default: null,
  },
});

const emit = defineEmits(["saved", "cancel"]);

const notesStore = useNotesStore();
const loading = ref(false);
const error = ref("");

const form = ref({
  title: "",
  content: "",
});

const noteId = computed(() => props.note?.id || null);

watch(
  () => props.note,
  (newNote) => {
    if (newNote) {
      form.value = {
        title: newNote.title,
        content: newNote.content,
      };
    } else {
      form.value = {
        title: "",
        content: "",
      };
    }
  },
  { immediate: true },
);

const handleSubmit = async () => {
  try {
    loading.value = true;
    error.value = "";

    const noteDto: NoteSaveDto = {
      id: noteId.value,
      title: form.value.title,
      content: form.value.content,
    };

    await notesStore.saveNote(noteDto);
    emit("saved");
  } catch (err) {
    error.value = "Failed to save note";
    console.error("Error saving note:", err);
  } finally {
    loading.value = false;
  }
};

const cancel = () => {
  emit("cancel");
};
</script>