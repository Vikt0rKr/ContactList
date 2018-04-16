const {
  init,
  convertFromBSON,
  findContact,
  findNumber,
  addContact,
  deleteNumber,
  removeContact,
  showContacts,
} = require('./src/index.js');

// using anonymous function to execute functions properly
(async () => {
  await addContact('Vasya', '217-17-17, 000-00-00', '23-05-1978');
  await addContact('Vasya', '322-22-22', '15-12-1981');
  await addContact('Vasya', '489-08-92'); // adds extra number for Vasya
  await addContact('Petya', '324-24-24, 843-78-26', '23-04-1980');
  await addContact('Nadya', '233-33-33, 228-28-28', '31-06-1996');
  await addContact('Chapaev', '666-03-42, 111-11-11', '28-01-1887');
  await addContact('John', '666-66-46', '28-12-2000');
  await addContact('Vasya', '322-22-22', '15-12-1981');
  await deleteNumber('111-11-11');
  await showContacts();
  await removeContact('Vasya');
  await showContacts();
})();