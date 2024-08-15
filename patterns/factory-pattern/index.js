import { v4 as uuidv4 } from 'uuid';


const createUser = (firstName, lastName) => ({
    id: uuidv4(),
    firstName,
    lastName,
    fullName: `${firstName} ${lastName}`,
    createdAt: Date.now(),
    isVerified: false,
});


const johnLee = createUser('John', 'Lee');

console.log({ johnLee });