export type ID = string;

export interface Collection<TAttributes> {
  data: Entity<TAttributes>[];
  meta?: CollectionMeta;
}
export interface Singular<TAttributes> {
  data: Entity<TAttributes> | null;
}

export interface Entity<TAttributes> {
  id?: ID;
  attributes: TAttributes;
}

export interface CollectionMeta {
  pagination: {
    total: number;
    pageCount: number;
    page: number;
    pageSize: number;
  };
}
