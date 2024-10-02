// // const process = require('process');
// // let count = 0;
// // const cb = () => {
// //     console.log(`Processing nextTick cb ${++count}`);
// //     process.nextTick(cb);
// // }
// // setImmediate(() => console.log('setImmediate is called'));
// // setTimeout(() => {
// //     console.log('setTimeout is called');
// // }, 100);

// // process.nextTick(cb);
// // console.log('start');


// const process = require('process');
// let count = 0;
// const cb = () => {
//     if (count < 2000) {
//         console.log(`Processing nextTick cb ${++count}`);
//         setImmediate(cb);
//     }
// }
// setImmediate(cb);
// setTimeout(() => {
//     console.log('setTimeout is called');
// }, 50);

// process.nextTick(cb);
// console.log('start');

const EventEmitter = require('events');

const celebrity = new EventEmitter();

celebrity.on('update post', (type) => {
    console.log(`This ${type} post is good`);
})

celebrity.on('update post', () => {
    console.log('This post is awesome');
})

celebrity.emit('update post', 'image');

const process = require('process');
// EventEmitter instance
process.on('beforeExit', (code) => {
    console.log('Process beforeExit event with code', code);
})

// process.emit('beforeExit', 0)