var crypto = require('crypto');

var createCipher = (algorithm, password) => {
  return crypto.createCipher(algorithm, password);
};

module.exports = {
  /**
   * AES Decrypt
   * @param {string} data The data string
   * @param {string} algorithm The encrypt algorithm
   * @param {string} password The password
   */
  aesEncrypt(data, algorithm = 'aes192', password = 'mantou') {
    const cipher = createCipher(algorithm, password);
    var crypted = cipher.update(data, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
  },

  /**
   * AES Decrypt
   * @param {string} encrypted The encrypted string
   * @param {string} algorithm The encrypt algorithm
   * @param {string} password The password
   */
  aesDecrypt(encrypted, algorithm = 'aes192', password = 'mantou') {
    const cipher = createCipher(algorithm, password);
    var decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }
};
