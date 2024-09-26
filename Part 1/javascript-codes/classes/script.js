// class Person {
//     constructor(name, email, birthday) {
//         this.name = name;
//         this.email = email;
//         this.birthday = new Date(birthday);
//     }

//     introduce() {
//         return `Hello my name is ${this.name}`;
//     }

//  staic은 자바와 같은듯 함
//     static multipleNumbers(x, y) {
//         return x * y;
//     }

// }

// const john = new Person('john', 'john@example.com', '10-3-98');
// console.log(john);


class Person {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }

    introduce() {
        return `Hello my name is ${this.name}`;
    }

    static multipleNumbers(x, y) {
        return x * y;
    }

}

class Client extends Person {
    constructor(name, email, phone, address) {
        super(name, email)

        this.phone = phone;
        this.address = address;
    }
}

class Child extends Person {
    constructor(name, email, test) {
        super(name, email);
        this.test = test;
    }
}

const john = new Child('John', 'john@example.com', 'constructor');
console.log(Person.multipleNumbers(3, 5));
console.log(john.introduce());