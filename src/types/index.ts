export interface GameWord {
  word: string;
  hint: string;
  category: string;
  difficulty: "easy" | "normal" | "hard";
}

export interface FloatingCharProps {
  char: string;
  isVowel: boolean;
  position: [number, number, number];
  speed: number;
}

export interface GameState {
  score: number;
  timeLeft: number;
  combo: number;
  currentInput: string;
  isPlaying: boolean;
}
