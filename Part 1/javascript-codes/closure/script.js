// function outerFunction(outerVariable) {
//     return function innerFunction(innerVariable) {
//         console.log('Outer function: ' + outerVariable);
//         console.log('Inner function: ' + innerVariable);
//     }
// }

// const newFunction = outerFunction('outside');
// console.log('New function: ' + newFunction)
// newFunction('inside');

let a = 'a';


function functionA() {
    let b = 'b';
    function functionB() {
        let c = 'c';
        console.log(a, b, c);
    }
    functionB();
    console.log(a, b);
}
functionA();

// function을 선언할때 전해졌던 outerVariable을 기억하고 있음
const outerFunction = (outerVariable) => {
    return innerFunction = (innerVariable) => {
        console.log("Outer function: " + outerVariable);
        console.log("Inner function: " + innerVariable);
    }
}

// function을 호출할 때 전해졌던 outerVariable을 기억하고 있음
const newFunction = outerFunction('outside');
// newFunction은 innerFunction을 가리키고 있음
newFunction("inside")
