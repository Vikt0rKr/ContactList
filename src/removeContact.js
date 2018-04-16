const init = require('./init.js');
const findContact = require('./findContact.js');

// find contact in db by name and then delete it
const removeContact = async (contactName) => {
  const found = await findContact(contactName);
  if (found === null) {
    console.log(`There is no contact named ${contactName}`);
  } else {
    const removeByNameFromDb = async (DB) => {
      const removedContact = await DB.collection('phoneBook').remove({ name: contactName });
      if (removedContact) console.log(`Contact ${contactName} was successfully removed`);
    };
    await init(removeByNameFromDb);
  }
};

module.exports = removeContact;
