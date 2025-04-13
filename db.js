class Db {
    constructor(initialData = {}) {
      this.store = { ...initialData };
    }
  
    set(id, receipt) {
      this.store[id] = receipt;
    }
  
    get(id) {
      return this.store[id] || null;
    }
  
    delete(id) {
      delete this.store[id];
    }
  
    has(id) {
      return Object.prototype.hasOwnProperty.call(this.store, id);
    }
  
    keys() {
      return Object.keys(this.store);
    }
  
    clear() {
      this.store = {};
    }
  }
  
  module.exports = Db;
  