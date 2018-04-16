const init = require('./init.js');
const convertFromBSON = require('./convertFromBSON.js');

// find contact in db by name
const findContact = async (contactName) => {
  let result = null;
  const searchDb = async (dbNew) => {
    const found = await dbNew.collection('phoneBook').find({ name: contactName }).toArray();
    if (found) result = await convertFromBSON(found);
    if (result.length === 0) result = null;
  };
  await init(searchDb);
  return result;
};

module.exports = findContact;
