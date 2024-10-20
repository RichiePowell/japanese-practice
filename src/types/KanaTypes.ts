interface Kana {
  [key: string]: {
    name: string;
    characters: { [key: string]: string };
    icon: string;
    description?: string;
  };
}
