export interface CachePort {
  set(key: string, value: string): Promise<void>;
  get(key: string): Promise<string | null>;
}
