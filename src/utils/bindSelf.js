export function bindSelf(target, name, descriptor) {
  return {
    configurable: true,
    get() {
      const bindFn = descriptor.value.bind(this);
      Object.defineProperty(this, name, {
        value: bindFn,
        configurable: true,
        writable: true
      });
      return bindFn;
    }
  };
}
