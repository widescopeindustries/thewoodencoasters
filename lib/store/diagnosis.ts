import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { DiagnosisSession, Vehicle, Message, Diagnosis } from '../types/diagnosis';

interface DiagnosisStore {
  // Current session
  currentSession: DiagnosisSession | null;

  // Session history
  sessions: DiagnosisSession[];

  // UI state
  isLoading: boolean;
  error: string | null;

  // Actions
  startNewSession: (vehicle: Vehicle, initialSymptoms: string) => void;
  addMessage: (message: Message) => void;
  updateDiagnosis: (diagnosis: Diagnosis) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearSession: () => void;
  loadSession: (sessionId: string) => void;
  deleteSession: (sessionId: string) => void;
}

export const useDiagnosisStore = create<DiagnosisStore>()(
  persist(
    (set, get) => ({
      currentSession: null,
      sessions: [],
      isLoading: false,
      error: null,

      startNewSession: (vehicle, initialSymptoms) => {
        const newSession: DiagnosisSession = {
          id: `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          vehicle,
          initialSymptoms,
          conversation: [
            {
              id: `msg-${Date.now()}`,
              role: 'system',
              content: `Starting diagnosis for ${vehicle.year} ${vehicle.make} ${vehicle.model}. Symptoms: ${initialSymptoms}`,
              timestamp: new Date(),
            },
          ],
          status: 'gathering-info',
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        set((state) => ({
          currentSession: newSession,
          sessions: [newSession, ...state.sessions],
        }));
      },

      addMessage: (message) => {
        set((state) => {
          if (!state.currentSession) return state;

          const updatedSession = {
            ...state.currentSession,
            conversation: [...state.currentSession.conversation, message],
            updatedAt: new Date(),
          };

          return {
            currentSession: updatedSession,
            sessions: state.sessions.map((s) =>
              s.id === updatedSession.id ? updatedSession : s
            ),
          };
        });
      },

      updateDiagnosis: (diagnosis) => {
        set((state) => {
          if (!state.currentSession) return state;

          const updatedSession = {
            ...state.currentSession,
            diagnosis,
            status: 'diagnosed' as const,
            updatedAt: new Date(),
          };

          return {
            currentSession: updatedSession,
            sessions: state.sessions.map((s) =>
              s.id === updatedSession.id ? updatedSession : s
            ),
          };
        });
      },

      setLoading: (loading) => set({ isLoading: loading }),

      setError: (error) => set({ error }),

      clearSession: () => set({ currentSession: null, error: null }),

      loadSession: (sessionId) => {
        const session = get().sessions.find((s) => s.id === sessionId);
        if (session) {
          set({ currentSession: session });
        }
      },

      deleteSession: (sessionId) => {
        set((state) => ({
          sessions: state.sessions.filter((s) => s.id !== sessionId),
          currentSession:
            state.currentSession?.id === sessionId ? null : state.currentSession,
        }));
      },
    }),
    {
      name: 'diagnosis-storage',
      partialize: (state) => ({
        sessions: state.sessions,
      }),
    }
  )
);
