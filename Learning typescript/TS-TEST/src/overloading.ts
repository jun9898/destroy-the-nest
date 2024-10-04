// 함수 - 오버로딩

function add1(a: string, b: string) {
    return a + b;
}

function add2(a: number, b: number) {
    return a + b;
}

function add(a: string, b: string): string; // 타입 선언
function add(a: number, b: number): number; // 타입 선언
// java의 오버로딩과 비슷한듯 하면서 다른 느낌이다.
// 모든 매개변수가 들어올 수 있다는 뜻이 아닌 함수의 구현부를 의미.
function add(a: any, b: any): any { // 함수 구현부
    return a + b;
}

console.log(add1('Hello ', 'World'));
console.log(add2(1, 2));
// console.log(add('Hello ', 1)); // 오류 발생
// console.log(add('Hello ', 1));

