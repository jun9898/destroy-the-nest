// 제네릭
// 함수

interface Obj {
    x : number
}
type Arr = [number, number]

// function toArray(a: string, b: string): string[];
// function toArray(a: number, b: number): number[];
// function toArray(a: boolean, b: boolean): boolean[];
// function toArray(a: Obj, b: Obj): Obj[];
// function toArray(a: Arr, b: Arr): Arr[];
// function toArray(a: any, b: any) {
//     return [a, b]
// }

// java랑 똑같음
function toArray<T>(a: T, b: T): T[] {
    return [a, b]
}

console.log(
    toArray(1, 2),
    toArray<string>('1', '2'),
    toArray(true, false),
    toArray({x: 1}, {x: 2}),
    toArray([1, 2], [3, 4]),
)

// 클래스

// 이걸 과연 쓸까?
class User<P> {
    constructor(public payload: P) {}
    getPayload(): any {
        return this.payload
    }
}

interface UserAType {
    name: string;
    age: number;
    isValid: boolean;
}

interface UserBType {
    name: string;
    age: number;
    emails: string[];
}

const user = new User<UserAType>({
    name: 'Neo',
    age: 85,
    isValid: true,
    // emails: []
});

const neo = new User<UserBType> ({
    name: 'Neo',
    age: 85,
    emails: ["neo@gamil.com"]
});

console.log(user.getPayload())
console.log(neo.getPayload())

// interface
interface MyData<T extends string | number[]> {
    name: string;
    value: T;
}

const dataA: MyData<string> = {
    name: 'hello',
    value: 'world'
}

// const dataB: MyData<number> = {
//     name: 'hello',
//     value: 1234
// }

// const dataC: MyData<boolean> = {
//     name: 'hello',
//     value: true
// }

const dataD: MyData<number[]> = {
    name: 'hello',
    value: [1, 2, 3]
}
