export interface ISearchResult {
  data: { data: any; next: string; total: number; album?: [] };
}
export interface ISearchResultAlbum {
  cover: string;
  cover_small: string;
}

export interface ITrackId {
  target: { id: number };
}
