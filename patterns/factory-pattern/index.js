import { v4 as uuidv4 } from 'uuid';

import User from './classes/user.class.js';


const createUser = (firstName, lastName) => ({
    id: uuidv4(),
    firstName,
    lastName,
    fullName: `${firstName} ${lastName}`,
    createdAt: Date.now(),
    isVerified: false,
    getFullName: function () {
        return this.fullName;
    }
});


const johnLee = createUser('John', 'Lee');

const mattFengthong = new User('Matt', 'Fengthong');

console.log({ johnLee, mattFengthong });

console.log(johnLee.getFullName());
console.log(mattFengthong.getFullName());
