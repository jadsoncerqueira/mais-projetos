function randomToken() {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJLMNOPQRSTUVWXYZ';
  const passwordLength = 16;
  let password = '';
  
  for (let i = 0; i < passwordLength; i += 1) {
    const randomNumber = Math.floor(Math.random() * chars.length);
    password += chars.substring(randomNumber, randomNumber + 1);
  }
  return password;
}

module.exports = randomToken;