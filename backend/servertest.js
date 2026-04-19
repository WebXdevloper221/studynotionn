const bcrypt = require('bcrypt');

const hash = "$2b$10$wrR66NNyMaNFFv7MLtWatu3XkqW6q70AeLZkTRKCs24SwFPmHKzxG";
const guess = "your_password_guess";

bcrypt.compare(guess, hash, function(err, result) {
  console.log(result);
  if (result) {
    console.log(" Password is correct");
  } else {
    console.log(" Incorrect password");
  }
});
