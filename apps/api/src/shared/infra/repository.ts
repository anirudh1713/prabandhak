export interface IRepository<T> {
  exists(id: string): Promise<boolean>;
  delete(id: string): Promise<void>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  save(t: T): Promise<any>;
}
