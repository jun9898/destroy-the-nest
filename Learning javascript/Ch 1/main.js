// const user = {
//     name : "jeon",
//     age : 30,
//     isValid : true,
//     email : "test"
// }
//
// const fruits = ["Apple", "Banana", "Cherry"]
//
// function getThirdItem([,,c]) {
//     return c
// }
//
// function getEmail({email}) {
//     return email || "123"
// }
//
// function sum(...rest) {
//     return rest.reduce((acc, cur) => {
//         return acc + cur
//     })
// }
//
// console.log(getEmail(user))
// console.log(getThirdItem(fruits))
//
// console.log(sum(1,2,3,4,5,6,7,8,9))

// const a = 7;

// const double = () => {
//     console.log(a * 2)
// }
// double();
//
// (() => {
//     console.log(a * 2)
// })()

// const a = callback => {
//     console.log("A");
//     callback();
// }
//
// const b = () => console.log("B");
//
// a(b)

// const sum = (a, b, c) => {
//     setTimeout(() => {
//         c(a + b)
//     }, 1000)
// }
//
// console.log(sum(1, 2, value => {
//     console.log(value)
// }))

// callback
// https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSC4DtHTGprsp7K8u0ZlfSDmIDplvQYH5vniT0I3rpcl6wqBh8b

// 3. imgEl을 생성한다
// const loadImage = (url, callback) => {
//     const imgEl = document.createElement('img')
//     // 4. src는 내가 매개변수로 설정해놓은 url로 세팅
//     imgEl.src = url
//     // 5. img가 모두 load 됐을때 callback 함수의 인자로 준비된 imgEl을 넘겨준다.
//     imgEl.addEventListener('load', () => {
//         // callback의 이해를 돕기 위해 setTimeout을 추가해봄
//         setTimeout(() => {
//             callback(imgEl)
//         }, 1000)
//     })
// }
//
// // 1. containerEl을 가져온다
// const containerEl = document.querySelector('.container')
// // 2. loadImage 함수에 첫번째 인자로 image url을 넘기고 imgEl이 준비돼면 실행할 callback 함수도 인자로 넘겨준다,
// loadImage("https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSC4DtHTGprsp7K8u0ZlfSDmIDplvQYH5vniT0I3rpcl6wqBh8b", (imgEl) => {
//     // 6. 그렇게 로드가 완료된 imgEl을 containerEl에 append해줌으로써 이미지를 표시
//     containerEl.innerHTML = ""
//     containerEl.append(imgEl)
// })

// let i = 0;
//
// const a = () => {
//     console.log("A")
//     i += 1
//     if (i < 5) {
//         a()
//     }
// }
//
// a()

// const hello = () => {
//     console.log("hello~")
// };
// const timeout = setInterval(hello, 2000)
// const h1El = document.querySelector("h1")
// h1El.addEventListener("click", () => {
//     console.log("Clear!")
//     clearInterval(timeout)
// })

// 객체 내부에서 this는 해당 객체의 필드값
// const user = {
//     firstName : "bj",
//     lastName : "j",
//     age : "27",
//     getFullName : function () {
//         return `${this.firstName} ${this.lastName}`
//     }
// }

// function user() {
//     this.firstName = "Neo"
//     this.lastName = "Anderson"
//     return {
//         firstName: "bj",
//         lastName: "j",
//         age: "27",
//         // 화살표 함수로 this에 접근한다면 현재 함수를 감싸고 있는 또 다른 외부 함수를 참조한다.
//         // getFullName: () => {
//         //     return `${this.firstName} ${this.lastName}`
//         // }
//         // 일반 함수로 this에 접근한다면 현재 호출된 함수에서 값을 참조하게 된다.
//         getFullName() {
//             return `${this.firstName} ${this.lastName}`
//         }
//     }
// }

// const jbj = {
//     firstName: "byeonjun",
//     lastName: "jeon"
// }
//
// const u = user();
//
// console.log(u.getFullName());
// // 이런 기능은 왜 있는거야
// console.log(u.getFullName.call(jbj));

// const timer = {
//     title : "TIMER!",
//     timeout : function () {
//         console.log(this.title)
//         // 쉽게 이해하자면 한댑스만 더 들어가도 this가 undefined 되버리는것같음
//         // setTimeout(function () {
//         //     console.log(this.title)
//         // }, 1000)
//         // 안전하게 가려면 화살표 함수를 사용하는게 좋을듯 함
//         // setTimeout(() => {
//         //     console.log(this.title)
//         // }, 1000)
//         // 궁금증 발생! 만약 한댑스를 더 들어가버려도 화살표함수로 설정해준 this는 유효할까?
//         setTimeout(() => {
//             setTimeout(() => {
//                 console.log(this.title)
//             }, 1000)
//         }, 1000)
//         // 유효함
//     }
// }
// timer.timeout()

// java의 람다 함수와 비슷한듯
// const arr = [1,2,3,4]
// const isValid = arr.every(item => item < 5)
// const filterNumbers = arr.filter(item => item < 3)
//
// console.log(isValid)
// console.log(filterNumbers)
//
// const user = [
//     {name : "bj", age : 11},
//     {name : "j", age : 19},
//     {name : "jeon", age : 30}
// ]
//
// const adults = user.filter(item => item.age >= 19)
// console.log(adults)

// const arr = [1,2,[3,[4]]]
// console.log(arr.flat(2))

// const parent = document.querySelector(".parent")
//
// console.log(parent.childNodes)
//
// console.log(parent.children)
//
// console.dir(parent)
//

const el = document.getElementById("child2")
console.log(el)



