import { create } from 'zustand';

export interface EditorStore {
  currentId: string;
  setCurrentId: (id: string) => void;
}

export const useEditorStore = create<EditorStore>((set) => ({
  currentId: '',
  setCurrentId: (id: string) => set({ currentId: id })
}));
