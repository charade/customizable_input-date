export class CustomMap<K, V> {
  private map = new Map();

  constructor(private entries: [K, V][], private defaultValue?: V) {
    entries.forEach(([key, value]) => this.map.set(key, value));
  }

  public value(key: K): V {
    return this.map.has(key) ? this.map.get(key) : this.defaultValue;
  }
}
