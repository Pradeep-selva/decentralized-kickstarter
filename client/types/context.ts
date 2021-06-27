export interface ContextType {
  searchKey: string;
  onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ProviderState {
  searchKey: string;
}
