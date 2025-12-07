export type GamePhase = 'setup' | 'loading' | 'assigning' | 'playing' | 'reveal';

export interface Player {
  id: string;
  name: string;
  isImpostor: boolean;
  avatar: string; // Emoji avatar
  word?: string;
  wordEmoji?: string;
}

export interface GameSettings {
  category: string;
  customCategory?: string;
  impostorCount: number;
}

export interface GameState {
  phase: GamePhase;
  players: Player[];
  secretWord: string;
  secretWordEmoji: string;
  category: string;
  currentPlayerIndex: number;
  startTime: number;
}

export const CATEGORIES = [
  { id: 'animals', label: 'Animales', icon: '🦁' },
  { id: 'countries', label: 'Países', icon: '🌎' },
  { id: 'football', label: 'Futbolistas', icon: '⚽' },
  { id: 'food', label: 'Comida', icon: '🍔' },
  { id: 'jobs', label: 'Profesiones', icon: '💼' },
  { id: 'objects', label: 'Objetos', icon: '📦' },
  { id: 'places', label: 'Lugares', icon: 'vacations' },
  { id: 'custom', label: 'Personalizado', icon: '✨' },
];

export const AVATARS = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐔', '🐧', '🐦', '🐤', '🦆', '🦅', '🦉', '🦇', '🐺', '🐗', '🐴', '🦄', '🐝', '🐛', '🦋', '🐌', '🐞', '🐜', '🦟', '🦗', '🕷', '🕸', '🦂', '🐢', '🐍', '🦎', '🦖', '🦕', '🐙', '🦑', '🦐', '🦞', '🦀', '🐡', '🐠', '🐟', '🐬', '🐳', '🐋', '🦈', '🐊', '🐅', '🐆', '🦓', '🦍', '🦧', '🐘', '🦛', '🦏', '🐪', '🐫', '🦒', '🦘', '🐃', '🐂', '🐄', '🐎', '🐖', '🐏', '🐑', '🦙', '🐐', '🦌', '🐕', '🐩', '🦮', '🐕‍🦺', '🐈', '🐈‍⬛', '🐓', '🦃', '🦚', '🦜', '🦢', '🦩', '🕊', '🐇', '🦝', '🦨', '🦡', '🦦', '🦥', '🐁', '🐀', '🐿', '🦔', '🐾', '🐉', '🐲', '🌵', '🎄', '🌲', '🌳', '🌴', '🌱', '🌿', '☘', '🍀', '🎍', '🎋', '🍃', '🍂', '🍁', '🍄', '🐚', '🌾', '💐', '🌷', '🌹', '🥀', '🌺', '🌸', '🌼', '🌻', '🌞', '🌝', '🌛', '🌜', '🌚', '🌕', '🌖', '🌗', '🌘', '🌑', '🌒', '🌓', '🌔', '🌙', '🌎', '🌍', '🌏', '🪐', '💫', '⭐', '🌟', '✨', '⚡', '☄', '💥', '🔥', '🌪', '🌈', '☀️', '🌤', '⛅', '🌥', '☁️', '🌦', '🌧', '⛈', '🌩', '🌨', '❄️', '☃️', '⛄', '🌬', '💨', '💧', '💦', '☔', '☂️', '🌊'];