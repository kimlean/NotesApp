export interface Note {
  id: number;
  title: string;
  content: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

export interface NoteDto {
  title: string;
  content: string;
}

// New interface for save operation
export interface NoteSaveDto {
  id?: number | null;
  title: string;
  content: string;
}
