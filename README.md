<!-- 1 Answer: -->

1.var → function-scoped, punoray declare kora jay, hoisting hoy.
2.let → block-scoped, punoray declare kora jay na , kintu value reassign kora jay
3.const → block-scoped, punoray declare kora jay na , and reassign kora jay na (kintu object/array hole vitore man poriborton kora jay )

<!-- 2 Answer: -->

forEach() → loop chalai, kichu return kore na.

map() → loop chalai and ekta new array return kore.

filter() → condition wise element select kore and new array return kore.

<!-- 3 Answer: -->

Arrow function hocche short syntax diye function likhar system.

Example:

const add = (a, b) => a + b;

Arrow function e this parent scope theke inherit kore, new kore bind hoy na.

<!-- 4 Answer: -->

Destructuring diye array or object theke value easily extract kora jay.

Array Example:

const numbers = [10, 20, 30];
const [a, b, c] = numbers;
console.log(a, b, c); // 10 20 30

Object Example:

const person = { name: "Hasib", age: 22 };
const { name, age } = person;
console.log(name, age); // Hasib 22

<!-- 5 Answer: -->

Template literals backtick (``) diye lekha hoy and ${} diye variable/expression use kora hoy.

Example:

const name = "Hasib";
console.log(`Hello, ${name}!`);

Difference:

Concatenation → "Hello, " + name + "!"

Template literal → Hello, ${name}!

Template literals diye multiline string easy, kintu concatenation e complex hoy.
