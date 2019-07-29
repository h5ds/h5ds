function safeGet(data) {
  try {
    return JSON.parse(data);
  } catch (e) {
    return null;
  }
}

class WebStorage {
  constructor(storage) {
    this._storage = storage;
  }

  get(key) {
    return safeGet(this._storage.getItem(key));
  }

  set(key, value) {
    const valueStr = JSON.stringify(value);
    this._storage.setItem(key, valueStr);
  }

  remove(key) {
    this._storage.removeItem(key);
  }
}

class MemoryStorage {
  constructor() {
    this.$dataMap = new Map();
  }
  get(key) {
    this.$dataMap.get(key);
  }

  set(key, value) {
    this.$dataMap.set(key, value);
  }

  remove(key) {
    this.$dataMap.delete(key);
  }
}

class CookieStorage {
  get(key) {}

  set(key, value) {}

  remove(key) {}
}
export const storage = {
  local: new WebStorage(localStorage),
  session: new WebStorage(sessionStorage),
  memory: new MemoryStorage(),
  cookie: new CookieStorage()
};
