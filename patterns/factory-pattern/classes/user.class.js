import { v4 as uuidv4 } from 'uuid';

class User {
    constructor (firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.fullName = `${firstName} ${lastName}`;
        this.id = uuidv4();
        this.isVerified = false;
        this.createdAt = Date.now();
    }

    getFullName () {
        return this.fullName;
    }

}


export default User;
