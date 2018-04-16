const init = require('./init.js');
const convertFromBSON = require('./convertFromBSON.js');
const findContact = require('./findContact.js');
const findNumber = require('./findNumber.js');
const addContact = require('./addContact.js');
const deleteNumber = require('./deleteNumber.js');
const removeContact = require('./removeContact.js');
const showContacts = require('./showContacts.js');

module.exports = {
  init,
  convertFromBSON,
  findContact,
  findNumber,
  addContact,
  deleteNumber,
  removeContact,
  showContacts,
};
