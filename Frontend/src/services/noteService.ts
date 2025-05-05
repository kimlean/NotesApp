import api from '../utils/fetchApi';
import type { Note, NoteSaveDto } from '../types/noteTypes';

class NoteService {
  private static instance: NoteService;

  private constructor() {}

  public static getInstance(): NoteService {
    if (!NoteService.instance) {
      NoteService.instance = new NoteService();
    }
    return NoteService.instance;
  }

  public async getNotes(): Promise<Note[]> {
    return api.get('/api/notes');
  }

  public async getNote(id: number): Promise<Note> {
    return api.get(`/api/notes/${id}`);
  }

  // New save method for create or update
  public async saveNote(noteDto: NoteSaveDto): Promise<Note> {
    return api.post('/api/notes/save', noteDto);
  }

  public async deleteNote(id: number): Promise<void> {
    return api.delete(`/api/notes/${id}`);
  }

  public async searchNotes(searchTerm: string): Promise<Note[]> {
    return api.get('/api/notes/search', { params: { searchTerm } });
  }
}

export const noteService = NoteService.getInstance();