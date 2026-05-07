import { create } from "zustand";
import type { 
  VocabularyItem, 
  GrammarQuestion, 
  FlashCard,
  LearningProgress 
} from "../types";
import { vocabularyItems, grammarQuestions } from "../data/mockData";

interface LearnState {
  // Vocabulary
  vocabularyItems: VocabularyItem[];
  currentVocabIndex: number;
  masteredVocabIds: string[];
  
  // Grammar
  grammarQuestions: GrammarQuestion[];
  currentGrammarIndex: number;
  grammarScore: number;
  
  // Flash cards
  flashCards: FlashCard[];
  currentFlashCardIndex: number;
  isFlipped: boolean;
  
  // Session
  sessionStartTime: Date | null;
  sessionDuration: number;
  
  // Actions
  nextVocab: () => void;
  prevVocab: () => void;
  markVocabMastered: (id: string) => void;
  
  nextGrammar: () => void;
  answerGrammar: (questionId: string, answerIndex: number) => boolean;
  
  flipCard: () => void;
  nextFlashCard: () => void;
  prevFlashCard: () => void;
  markFlashCardMastered: (id: string) => void;
  
  startSession: () => void;
  endSession: () => number;
  resetProgress: () => void;
}

const createFlashCards = (items: VocabularyItem[]): FlashCard[] => {
  return items.map((item) => ({
    id: item.id,
    front: item.word,
    back: item.translation,
    pronunciation: item.pronunciation,
    mastered: false,
  }));
};

export const useLearnStore = create<LearnState>((set, get) => ({
  vocabularyItems: vocabularyItems,
  currentVocabIndex: 0,
  masteredVocabIds: [],
  
  grammarQuestions: grammarQuestions,
  currentGrammarIndex: 0,
  grammarScore: 0,
  
  flashCards: createFlashCards(vocabularyItems),
  currentFlashCardIndex: 0,
  isFlipped: false,
  
  sessionStartTime: null,
  sessionDuration: 0,

  nextVocab: () => {
    const { currentVocabIndex, vocabularyItems } = get();
    if (currentVocabIndex < vocabularyItems.length - 1) {
      set({ currentVocabIndex: currentVocabIndex + 1 });
    }
  },

  prevVocab: () => {
    const { currentVocabIndex } = get();
    if (currentVocabIndex > 0) {
      set({ currentVocabIndex: currentVocabIndex - 1 });
    }
  },

  markVocabMastered: (id: string) => {
    const { masteredVocabIds } = get();
    if (!masteredVocabIds.includes(id)) {
      set({ masteredVocabIds: [...masteredVocabIds, id] });
    }
  },

  nextGrammar: () => {
    const { currentGrammarIndex, grammarQuestions } = get();
    if (currentGrammarIndex < grammarQuestions.length - 1) {
      set({ currentGrammarIndex: currentGrammarIndex + 1 });
    }
  },

  answerGrammar: (questionId: string, answerIndex: number) => {
    const { grammarQuestions, grammarScore } = get();
    const question = grammarQuestions.find((q) => q.id === questionId);
    if (question) {
      const isCorrect = question.correctAnswer === answerIndex;
      if (isCorrect) {
        set({ grammarScore: grammarScore + 1 });
      }
      return isCorrect;
    }
    return false;
  },

  flipCard: () => {
    set((state) => ({ isFlipped: !state.isFlipped }));
  },

  nextFlashCard: () => {
    const { currentFlashCardIndex, flashCards } = get();
    if (currentFlashCardIndex < flashCards.length - 1) {
      set({ 
        currentFlashCardIndex: currentFlashCardIndex + 1,
        isFlipped: false 
      });
    }
  },

  prevFlashCard: () => {
    const { currentFlashCardIndex } = get();
    if (currentFlashCardIndex > 0) {
      set({ 
        currentFlashCardIndex: currentFlashCardIndex - 1,
        isFlipped: false 
      });
    }
  },

  markFlashCardMastered: (id: string) => {
    set((state) => ({
      flashCards: state.flashCards.map((card) =>
        card.id === id ? { ...card, mastered: true } : card
      ),
    }));
  },

  startSession: () => {
    set({ sessionStartTime: new Date(), sessionDuration: 0 });
  },

  endSession: () => {
    const { sessionStartTime } = get();
    if (sessionStartTime) {
      const duration = Math.floor(
        (new Date().getTime() - sessionStartTime.getTime()) / 1000
      );
      set({ sessionStartTime: null, sessionDuration: duration });
      return duration;
    }
    return 0;
  },

  resetProgress: () => {
    set({
      currentVocabIndex: 0,
      currentGrammarIndex: 0,
      grammarScore: 0,
      currentFlashCardIndex: 0,
      isFlipped: false,
      sessionStartTime: null,
      sessionDuration: 0,
    });
  },
}));
