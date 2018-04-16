const init = require('./init.js');
const convertFromBSON = require('./convertFromBSON.js');

// find number in db
const findNumber = async (contactNumber) => {
  let result = null;
  const searchDbForNumber = async (dbNew) => {
    const foundNum = await dbNew.collection('phoneBook').find({ number: contactNumber }).toArray();
    if (foundNum) result = await convertFromBSON(foundNum);
    if (result.length === 0) result = null;
  };
  await init(searchDbForNumber);
  return result;
};

module.exports = findNumber;
