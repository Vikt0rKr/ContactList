let phoneBook = new Array();

let Contact = function(name, number, birthday) {
	this.name = name;
	this.number = number;
	this.birthday = birthday;

};

function findPerson(value, Array1 = phoneBook, propertyKey = 'name') {
		let result = false;
		let person;

		for(let i = 0; i < Array1.length; i++) {
			if(Array1[i][propertyKey] == value) {
				result = true;
				person = Array1[i][propertyKey];
			}
		}
		
		if(result == true) {
			return person;
		} else {
			return null;
		}
		
};


function deleteNumber(value, Array1 = phoneBook, propertyKey = 'number') {
	let result = false;

	for(let i = 0; i < Array1.length; i++) {
		let arrNums = Array1[i][propertyKey].split(', ');
		for(let l =0; l < arrNums.length; l++) {
			if(arrNums[l] == value) {
				let index = arrNums.indexOf(arrNums[l]);
				arrNums.splice(index, 1);
				Array1[i][propertyKey] = arrNums.join(', ');
				result = true;
			}
		}
	}
	return result;
};


function addContact(name, number, birthday, Array1 = phoneBook, keyNumber = 'number') {

	if(findPerson(name) == null) {
		let personN = new Contact(name, number, birthday);
		Array1.push(personN);
	} else {
		for(let num = 0; num < Array1.length; num++) {
			Array1[num][keyNumber] +=', ' + number;
		}
	}
};

function removeContact(name, ARray = phoneBook, propKey = 'name') {
	let result = false;
	if(findPerson(name) == null) {
		console.log('Cannot remove contact ' + name + '. It does not exist in the contact book.')
		result = false;
	} else {
		for(let i = 0; i < ARray.length; i++) {
			if((ARray[i][propKey] == name) == true) {
				ARray.splice(i, 1);
				result = true;
			} else {
				result = false;
			}
		}
	}
 };


function showContacts(ArrayJ = phoneBook, propKey = 'birthday') {

	let finalArr = [];

	function comparator(a , b) {
		if(a > b) {
			return 1;
		} else if(a < b) {
			return -1;
		} else {
			return 0;
		}
	};

	let arrDate = [];

	for(let m = 0; m < ArrayJ.length; m++) {
		let dateArr = ArrayJ[m]['birthday'].split('-');

		// here we need to replace the month and day because the format is different
		let tempA = dateArr[0];
		dateArr[0] = dateArr[1];
		dateArr[1] = tempA;

		let dateFinal = dateArr.join('.');

		let dateN = new Date(dateFinal);

		arrDate.push(dateN);
	}

	let sortedData = arrDate.sort(comparator);
	let anotherTwist = sortedData.reverse();

	function removeChars(str, startIndex) {
		return str.substring(0, startIndex);
	};

	for(let num = 0; num < anotherTwist.length; num++) {

		let bigString = anotherTwist[num].toISOString();


		anotherTwist[num] = removeChars(bigString, 10);

		let splittedOne = anotherTwist[num].split('-');

			let tempYear = splittedOne[0];
			let tempMonth = splittedOne[1];
			let tempDay = splittedOne[2];

			splittedOne[0] = tempDay;
			splittedOne[2] = tempYear;

			let inty = parseInt(splittedOne[0], 10);
			inty += 1;
			if(inty >= 10) {
				splittedOne[0] = inty.toString();
			} else {
				splittedOne[0] = '0' + inty.toString();
			}

		anotherTwist[num] = splittedOne.join('-');
	}

// sorting the contacts from the youngest to the oldest
	for(let h = 0; h < anotherTwist.length; h++) {
		for(let u = 0; u < ArrayJ.length; u++) {
			if(anotherTwist[h] == ArrayJ[u]['birthday']) {
				finalArr.push(ArrayJ[u]);
			}
		}
	}

	for(let b = 0; b < finalArr.length; b++) {
		if( parseInt(finalArr[b]['number']) >= 10) {
			console.log((b + 1) + ' - ' + finalArr[b]['name'] + ', birthday: ' + finalArr[b]['birthday'] + ' - phone numbers: ' + finalArr[b]['number'])
		}
	};

};

addContact('Vasya', '322-22-22', '15-12-1981');
addContact('Vasya', '489-08-92'); // adds extra number for Vasya
addContact('Petya', '324-24-24, 843-78-26', '23-04-1980');
addContact('Nadya', '233-33-33, 228-28-28', '31-06-1996');

addContact('Chapaev', '666-03-42, 111-11-11', '28-01-1887');
addContact('John', '666-66-46', '28-12-2000');

deleteNumber('324-24-24'); 
showContacts();

