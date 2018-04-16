const findNumber = require('./findNumber.js');
const init = require('./init.js');

// find number in db and delete it
const deleteNumber = async (contactNumber) => {
  const searchNumber = await findNumber(contactNumber);
  if (searchNumber === null) {
    console.log(`There is no number like ${contactNumber} in the database`);
  } else {
    const deleteNumberFromDb = async (DB) => {
      const deleteFromDb = await DB.collection('phoneBook').update({ number: contactNumber }, { $pull: { number: contactNumber } });
      if (deleteFromDb) console.log(`Deleted number ${contactNumber}`);
    };
    await init(deleteNumberFromDb);
  }
};

module.exports = deleteNumber;
