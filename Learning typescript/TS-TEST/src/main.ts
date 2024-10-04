// 타입 종류

// 문자
// let str: string;
// let red: string = "Red";
// let green: string = 'Green';
// let myColor: string = `My color is ${red}`;
// let yourColor: string = 'Your color is ' + green;

// 숫자
// let num: number;
// let integer: number = 6;
// let float: number = 3.14;
// let infinity: number = Infinity;
// let nan: number = NaN;

// boolean
// let isBoolean: boolean;
// let isDone: boolean = false;

// null
// let nul: null;
// let und: undefined;
// nul = null
// let num: number = 123;
// console.log(nul)
// console.log(und)
// console.log(num)

// array
// const fruits: string[] = ['Apple', 'Banana', 'Mango'];
// const numbers: number[] = [1, 2, 3, 4, 5, 6, 7];
// const union: (string | number)[] = [1, 2, 3, 'Apple', 'Banana', 'Mango'];

// object
// const obj: object = {};
// const arr: object = [];
// const userA: { name: string, age: number } = { name: 'Neo', age: 85 };

// 완전 자바랑 비슷하네
// interface User {
//     name: string;
//     age: number;
//     isValid: boolean;
// }
//
// const userA: User = {
//     name: 'Neo',
//     age: 85,
//     isValid: true
// }
//
// console.log(userA)

// function
// number를 매개변수로 2개 받아온 후 number를 리턴하는 함수
// const add: (x: number, y: number) => number = (a, b) => a + b;
// const sub = function (a: number, b: number): number { return a + b }
// const a: number = add(1, 2);
// console.log(a)
//
// // return이 없다면 void를 정의
// const hello: () => void =  function() {
//     console.log('Hello')
// }
//
// const hello2 = function(): void {
//     console.log('Hello')
// }
//
// hello()
// hello2()

// any 되도록이면 사용하지 않는 것이 좋다.
// let hello: any = 'hello';
// hello = 123;
// hello = true;
// hello = {};
// hello = null;

// Unknown
// const a: any = 30;
// // Unknown은 any와 비슷하지만 any보다는 조금 더 제약이 있다.
// const u: unknown = 123;
//
// const any: any = a;
// const boo: boolean = a;
// const num: number = a;
// const arr: string[] = a
// const obj: { x: string, y: number } = a;

// Tuple
// const tuple: [string, number, boolean] = ["a", 1, true];
// const user: [number, string, boolean][] = [[1, "Neo", true], [2, "Lewis", false]];

// Never 쓸 일이 없을 것 같다.
// const nev: [] = [];
// nev.push();

// Union
// let union: string | number;
// union = 'hello';
// union = 123;
// union = false; // 에러 발생

// intersection
// interface User {
//     name: string;
//     age: number;
// }
// interface Validation {
//     isValid: boolean;
// }
//
// const user: User & Validation = {
//     name: 'Neo',
//     age: 85,
//     isValid: true
// }


// type inference
// let num = 12
// num = "hello" 이미 위쪽에서 number를 할당해줬기 때문에 타입 추론이 적용되었다.

// function add (a: number, b = 2) {
//     return a + b;
// }

// 타입 단언 (Type Assertion)

// // 1.
// const el = document.querySelector('.title');
// if (el) {
//     el.textContent = "hello world";
// }
//
// // 2.
// function getNumber(x: number | null | undefined) {
//     if (x) {
//         return Number(x.toFixed(2));
//     }
// }
// getNumber(3.141592); // 3.14
// getNumber(null); // 에러 발생 잘못된 입력값
//
// // 3.
// function getValue(x: string | number, isNumber: boolean) {
//     if (isNumber) {
//         return Number((x as number).toFixed(2));
//     }
//     return (x as string).toUpperCase();
// }
// getValue('hello', false); // HELLO
// getValue(3.141592, true); // 123.00

// 할당 단언
// let num!: number;
// console.log(num)

// 타입 가드
// function logText(el: Element) {
//     console.log(el.textContent);
// }
//
// const h1El = document.querySelector('h1');
// if (h1El instanceof HTMLHeadingElement) {
//     logText(h1El);
// }

// function add(val: string | number) {
//     let res = "Result => "
//     if (typeof val === 'number') {
//         res += val.toFixed(2)
//     } else {
//         res += val.toUpperCase()
//     }
//     console.log(res)
// }
//
// add(3.141592)
// add('hello')

// interface 그냥 자바랑 비슷하다.

// interface User {
//     name: string;
//     readonly age: number;
//     // 선택적 속성
//     isValid ? : boolean;
// }
//
// const userA: User = {
//     name: 'Neo',
//     age: 85,
//     isValid: true
// }
//
// userA.isValid = false;
// // userA.age = 22; // readonly 속성이기 때문에 에러 발생
//
// const userB: User = {
//     name: 'Lewis',
//     age: 23,
// }

// interface GetName {
//     (message: string): string;
// }
// interface User {
//     name: string;
//     age: number;
//     // getName: (message: string) => string;
//     getName: GetName;
// }
//
// const userA: User = {
//     name: 'Neo',
//     age: 85,
//     getName(message: string) {
//         console.log(message);
//         return this.name;
//     }
// }
//
// userA.getName('Hello');

// 배열
// interface Fruits {
//     // Index Signature - 배열 타입의 인터페이스를 정의할것인데 item 속성은 number 타입이고 string이 인자로 들어옴
//     [item: number] : string
// }
//
// const fruits: Fruits = ["Apple", "Banana", "Mango"];
// console.log(fruits);
//
// interface User {
//     [key: string]: unknown;
//     name: string;
//     age: number;
// }
//
// const user: User = {
//     name: 'Neo',
//     age: 85,
// }

// Index Signature를 통해 동적 속성을 추가할 수 있다.
// user["isValid"] = true;
// user["emails"] = ["nice@naver.com", "test@naver.com"]
// console.log(user)
//
// interface Payload {
//     [key: string]: unknown
// }
// function logValues(payload: Payload) {
//     for (const key in payload) {
//         console.log(payload[key])
//     }
// }
//
// // extend와 Index Signature를 사용하여 동적 속성을 추가할 수 있다.
// // interface User extends Payload {
// interface User {
//     [key: string]: unknown
//     name: string;
//     age: number;
//     isValid: boolean;
// }
//
// const user: User = {
//     name: 'Neo',
//     age: 85,
//     isValid: true
// }
//
// logValues(user);

// interface UserA {
//     name: string;
//     age: number;
// }
//
// interface UserB extends UserA {
//     isValid: boolean;
// }
//
// const heropy: UserA = {
//     name: 'Heropy',
//     age: 85,
//     // isValid: true
// }
//
// const neo: UserB = {
//     name: 'Neo',
//     age: 85,
//     isValid: true
// }

// type으로 미리 지정해놓고 재탕 가능
// type TypeA = string;
// type TypeB = string | number | boolean;
//
// type User = {
//     name: string;
//     age: number;
//     isValid: boolean;
// } | [string, number, boolean];
//
// const userA: User = {
//     name: 'Neo',
//     age: 85,
//     isValid: true
// }
//
// const userB: User = ['Lewis', 23, true];
//
// function someFunc(param: TypeB): TypeA {
//     switch (typeof param) {
//         case "string":
//             return param.toUpperCase();
//         case "number":
//             return param.toFixed(2);
//         default:
//             return "test";
//     }
// }
//

// type TypeUser = {
//     name: string;
//     age: number;
//     isValid: boolean;
// }
//
// interface InterfaceUser {
//     name: string;
//     age: number;
//     isValid: boolean;
// }
//
// // 난 interface가 좀 더 손에 감긴다
// const user: InterfaceUser = {
//     name: 'Neo',
//     age: 85,
//     isValid: true
// }

interface Cat {
    name: string;
    age: number;
}

const cat: Cat = {
    name: 'Neo',
    age: 3
}

function hello(this: Cat, message: string) {
    console.log(`Hello ${this.name} ${message}`)
}
hello.call(cat, "you are cat")

