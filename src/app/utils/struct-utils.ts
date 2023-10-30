export class CustomMap<K, V> {
  private map = new Map();

  constructor(entries: [K, V][]) {
    entries.forEach(([key, value]) => this.map.set(key, value));
  }

  public getValue(key: K): V {
    return this.map.has(key) ? this.map.get(key) : undefined;
  }
}
