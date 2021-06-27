export interface ContextType {
  searchKey: string;
  onSearch: (searchKey: string) => void;
}

export interface ProviderState {
  searchKey: string;
}
