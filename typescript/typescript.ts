// TypeScript is a superset of JavaScript adds typing to JavaScript
// To install TypeScript, use "npm install -g typescript"
// To run TypeScript code, use "tsc typescript.ts"
console.log("Hello World");

// This is a transpilation process,which will create a typescript.js file
// You can then run the file with "node typescript.js"

// You can also initiate a typescript project with "tsc --init", which will create a tsconfig.json file
// Some configurations:
// - outDir: the directory to output the javascript code
// - rootDir: the directory to input the typescript code
// - target: the target ECMAScript version
// - sourceMap: whether to generate source maps
// - declaration: whether to generate declaration files
// - declarationMap: whether to generate declaration map files
// - resolveJsonModule: whether to resolve json modules

// Typscript types:
let anyType: any;
let numberType: number;
let stringType: string;
let booleanType: boolean;
let voidType: void;

let functionType: (numberInput: number) => void  = 
    (numberInput: number) => { console.log(numberInput);}

// Implicit typing:
let implicitBoolean = true;
// implicitBoolean = 1;

// Objects:
let objectType: { name: string, age: number } = 
    { name: "John", age: 20 };

let listType: number[] = [1, 2, 3];
let listType2: Array<number> = [1, 2, 3];
let listType3: [number, string] = [1, "2"];

// null and undefined:
let age = 12;
// age = null;

let age2: number | null = 12;
age2 = null;

let age3: number | undefined = 12;
age3 = undefined;

let newObject: { name: string, age?: number } = { name: "John" };

// Generic types:
function listGenerator<T>(item: T): T[] {
    return [item];
}

const a: number[]  = listGenerator(1);
const b: string[]  = listGenerator("1");

// Pick/Omit/Partial:
type Person = {
    name: string;
    age: number;
    email: string;
}

const person: Person = { name: "John", age: 20, email: "john@example.com" };
const person2: Pick<Person, "name" | "age"> = { name: "John", age: 20 };
const person3: Omit<Person, "email"> = { name: "John", age: 20 };
const person4: Partial<Person> = { name: "John", age: 20 };
// You want to use these tools, so that object properties are inherited from the parent object

// Sometimes, you'll be bothered by the Typescript compiler, so you can use the "as" keyword to cast the type
const variable: string | number = 12; // Not really best practice
(variable as unknown as string).toLowerCase();

// ! is used to tell the Typescript compiler that the variable is not null or undefined
const variable2: string | null = "not null";
variable2!.toLowerCase();


// interface is used to define a contract for an object
interface PersonItf {
    name: string;
    age: number;
    email: string;
}

// interface can be extended
interface EmployeeItf extends PersonItf {
    salary: number;
}

const employee: EmployeeItf = { name: "John", age: 20, salary: 1000, email: "john@example.com" };

// You can create new types:
type PersonType = {
    name: string;
    age: number;
    email: string;
}

// There are some differences between interface and type:
// Interface can be extended, types use intersection
type EmployeeType = PersonType & {
    salary: number;
}
// Pick, Omit, Partial are types, not interfaces

// Exercise 1: Redo exercise 1 from javascript.js with typescript

// Exercise 2: Create a type, which can be used for a form to create a new house object

// Exercise 3: Add a new property to the house object, which is a list of rooms

// Exercise 4: Demonstrate that keys inherited from Omit inherit from the parent object

// Exercise 5: Create a toString function for houses or persons, then for any kind of object of type {[key: string]: string}
