/**
 * @desc https://localforage.github.io/localForage/
 */
class DBStorage {
  constructor() {
    this.storage = localStorage;
  }

  get(key) {
    let data = this.storage.getItem(key);
    try {
      data = JSON.parse(data);
    } catch (e) {
      data = null;
    }
    return data;
  }

  set(key, value) {
    return this.storage.setItem(key, JSON.stringify(value));
  }

  remove(key) {
    return this.storage.removeItem(key);
  }

  clear() {
    return this.storage.clear();
  }
}

export const storage = new DBStorage();
