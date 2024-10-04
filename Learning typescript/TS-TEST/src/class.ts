// 클래스

// java와 마찬가지로 접근 제어자가 있음

// public, private, protected
// public : 어디서든 접근 가능
// private : 클래스 내부에서만 접근 가능
// protected : 클래스 내부 + 상속받은 클래스에서만 접근 가능

class UserA {
    // 요상한 문법 java의 record와 비슷한 느낌이다.
    constructor(
        public first: string,
        public last: string,
        public age: number
    ) {
    }


    getAge() {
        return `${this.first} is ${this.age} years old`;
    }
}

class UserB extends UserA {
    getAge() {
        return `${this.first} is ${this.age} years old (UserB)`;
    }
}

class UserC extends UserB {
    getAge() {
        return `${this.first} is ${this.age} years old (UserC)`;
    }
}

const userA = new UserA('Heropy', 'Park', 85);
const userB = new UserB('Heropy', 'Park', 85);
const userC = new UserC('Heropy', 'Park', 85);
// java의 setter 사용과 조금 다른 양식
userA.first = "test"

console.log(userA.getAge());
console.log(userB.getAge());
console.log(userC.getAge());
