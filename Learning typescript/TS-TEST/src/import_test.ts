import { getFullName, User } from './export_test';

const heropy: User = {
    firstName: 'Heropy',
    lastName: 'Park',
    age: 85,
    isValid: true
}
const fullName = getFullName(heropy);

console.log(fullName); // Heropy
console.log(heropy.isValid)