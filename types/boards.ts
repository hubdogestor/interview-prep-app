export interface BoardCardChip {
  label: string;
  colorClass?: string;
}

export interface BoardCard {
  id: string;
  title: string;
  description?: string;
  owner?: string;
  ownerLabel?: string;
  dueDate?: string;
  metric?: string;
  progress?: number;
  items?: string[];
  chips?: BoardCardChip[];
  highlight?: string;
  meta?: string;
}

export interface BoardColumn {
  id: string;
  title: string;
  subtitle?: string;
  accentColor?: string;
  highlight?: string;
  cards: BoardCard[];
}
