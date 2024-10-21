interface CharacterSet {
  name: string;
  characters: Record<string, string[]>;
  icon?: string;
  description?: string;
  firstAnswerAsCorrection?: boolean;
  input?: string;
}

interface CharacterSets {
  [key: string]: CharacterSet;
}

export type { CharacterSet, CharacterSets };
