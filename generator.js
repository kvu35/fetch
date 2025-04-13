class Generator {
    constructor() {}
  
    generateId(num) {
      if (typeof num !== 'number') {
        throw new Error('Input must be a number');
      }
  
      const hash = crypto.createHash('sha256').update(num.toString()).digest('hex');
  
      const uuid = [
        hash.slice(0, 8),
        hash.slice(8, 12),
        hash.slice(12, 16),
        hash.slice(16, 20),
        hash.slice(20, 32)
      ].join('-');
  
      return uuid;
    }
  }
  
  module.exports = Generator;