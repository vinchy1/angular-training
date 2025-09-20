/* 
* node was created to run Javascript code outside of the browser.
* It is a JavaScript runtime built on Chrome's V8 JavaScript engine.
*
* To run Javascript code, use "node javascript.js"
*/
console.log("Hello World");

// Let keyword is used to declare a variable
let string = "Hyun Woo";
let number = 1;
let boolean = true;
let object = {a: 1, b: 2, c: 3};
let list = [1, "2", 3];
let undefinedVar; // When a variable is declared but not assigned a value, it is undefined
let nullVar = null; // ...which is different from null
let symbolVar = Symbol("symbol");

// JavaScript is a dynamically typed language
console.log("type of number", typeof number);
number = "2";
console.log("type of number", typeof number);


// == is used to compare the value of the variable
let age = "21";
console.log(age == 21);

// === is used to compare the value and the type of the variable
console.log(age === 21);

// symbols are unique and immutable
let secondSymbolVar = Symbol("symbol");
console.log(secondSymbolVar === symbolVar);

// const is used to declare a constant variable
const PI = 3.14;
// PI = 3.15; // This will throw an error

// but you can change the value of a object property or a list item
const person = {
    name: "Hyun Woo",
    age: 20
};

person.age = 21; // This will not throw an error

const listOfNumbers = [1, 2, 3];
listOfNumbers[2] = 4;  // This will not throw an error

// Javascript is powerful enough to be a functional programming language
function add(a, b) {
    return a + b;
}

console.log(add(1, 2));

// variables can store functions
const varFunction = add;
console.log(varFunction(1, 2));

// Notice that brackets are used to call the function
const sayHello = function() {
    console.log("Hello");
}

console.log(sayHello);
console.log(sayHello());

// functional programming is based on pure functions
function pureFunction(a, b) {
    return a + b;
}

function impureFunction(a, b) {
    return a + b + Math.random();
}

// This allows composition of functions - List manipulation
let sequelOfNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let pairNumbers = sequelOfNumbers.map(function(x) {
    return x * 2;
});

// For readability, you could store the function in a variable
let double = function(x) {
    return x * 2;
}
let otherPairNumbers = sequelOfNumbers.map(double);

let tableOfTree = sequelOfNumbers.map(function(x) {
    return x * 3;
});

// with arrow functions, you can simplify the code
tableOfTree = sequelOfNumbers.map(x => x * 3);
console.log(tableOfTree);

// Now it's easy to compose functions
let highTriples =
    sequelOfNumbers
        .map(x => x * 3)
        .filter(x => x > 10);
console.log(highTriples);

// reduce is used to reduce a list to a single value
let sum = sequelOfNumbers.reduce(function(acc, x) {
    return acc + x;
}, 0);
console.log(sum);

// reduce is a swiss army knife for list manipulation
highTriples = 
    sequelOfNumbers
        .reduce((acc, x) => [...acc, 3*x], [])
        .reduce((acc, x) => x > 10 ? [...acc, x]  : acc, []);
console.log(highTriples);

// we just saw the spread operator
let otherSequelOfNumbers = [...sequelOfNumbers, 11, 12, 13];

// It can also be used in objects
let objectVar = { a: 1, b: 2, c: 3 };
let otherObjectVar = { ...objectVar, d: 4 };

// With destructuring, it can also be used to aggragate some part of an object
let { a, b, ...rest } = otherObjectVar;

// Exercise 1: Create a list of 5 objects representing house properties (id, price, city, address)

// Exercise 2: Derive a list of houses with a price lower than 100000 and only show their id and price

// Exercise 3: Calculate the average price of the 4 cheapest houses


// Event loop
setTimeout(() => {
    console.log("Hello");
}, 1000);
console.log("World");


// Exercise 4: Predict the output of the following code
// setTimeout(() => {
//     console.log("Hello");
// }, 0);
// console.log("World");

