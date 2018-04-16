const init = require('./init.js');
const convertFromBSON = require('./convertFromBSON.js');

// find all the contacts in db, sort them by birthday in ascending order
// then print each contact on the screen
const showContacts = async () => {
  const showContactList = async (DB) => {
    const extractDbList = await DB.collection('phoneBook').find().sort({ birthday: 1 }).toArray();
    if (extractDbList) {
      const humanFormat = await convertFromBSON(extractDbList);
      await humanFormat.forEach(async (contact, index) => {
        const convertToHumanDate = async (newDate) => {
          const humanDate = await newDate.toISOString().substring(0, 10).split('-').reverse();
          const returnValue = await humanDate.join('-');
          return returnValue;
        };
        const humanFormatBirthday = await convertToHumanDate(new Date(contact.birthday));
        const orderNumber = index + 1;
        if (humanFormatBirthday) console.log(orderNumber, contact.name, ', numbers: ', contact.number, ', birthday: ', humanFormatBirthday);
      });
    }
  };
  await init(showContactList);
};

module.exports = showContacts;
