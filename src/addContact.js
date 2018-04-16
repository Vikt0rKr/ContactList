const findContact = require('./findContact.js');
const init = require('./init.js');

const addContact = async (contactName, contactNumber, contactBirthday) => {
  // function to add new contact
  const addNew = async (thisDb) => {
    let numbers = contactNumber;
    // convert birthday to timeStamp for more effective storage use
    const timeStampBirthday = new Date(contactBirthday.split('-').reverse().join('-')).getTime();
    // check if there are several numbers to add, if (true) split and add them into Array
    if (contactNumber.length > 9) {
      numbers = contactNumber.split(', ');
    }
    // interacting with db (inserting new contact)
    const insertIn = await thisDb.collection('phoneBook').insert({ name: contactName, number: numbers, birthday: timeStampBirthday });
    if (insertIn) console.log(`Created contact: ${contactName}, birthday: ${contactNumber}, numbers: ${contactBirthday}`);
  };
  // searching if that particular contact exists
  const findName = await findContact(contactName);
  // if our function return null, it means that there is no such contact in the db
  // so, we can insert it safely
  if (findName === null) {
    // interact with db using mongodb module
    await init(addNew);
  } else if (findName !== null && contactBirthday === undefined) {
    // if there is no birthday, it means that we need to add new number to the contact
    const updateNumber = async (thisDB) => {
      let numbers = contactNumber;
      if (contactNumber.length > 9) {
        numbers = await contactNumber.split(', ');
      }
      const updatingNumber = await thisDB.collection('phoneBook').update({ name: contactName }, { $push: { number: numbers } });
      if (updatingNumber) console.log(`Added numbers: ${numbers} to contact: ${contactName}`);
    };
    await init(updateNumber);
  } else {
    console.log(`Contact ${contactName} already exists`);
  }
};

module.exports = addContact;
