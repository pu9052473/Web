// interface User {
//     name: string;
//     id: number;
//     isAdmin: boolean;
//   }
// let newUser : User = {
//     name: "Uday",
//     id: 1003,
//     isAdmin: true,
// }
// console.log(newUser)
function printHello() {
  console.log("Hello!");
}
printHello();
function throwError() {
  throw new Error("An error occurred!");
}
// we have used type annotations to specify that the addUser function takes in an input which follows the interface User and returns a string.
function addUser(user) {
  return user.name + " added successfully";
}
// type inference refers to the ability of the compiler to automatically determine the data type of a value based on its usage.
var userName = "Jane"; // type: string
var userID = 10; // type: number
var uniqueID = userName + userID; //Here, the compiler will automatically infer that userName is a string and userID is a number and will concatenate the final output as a string.
// Arrays in TypeScript are a data type that allows you to store a collection of elements, typically of the same type.
// syntax :- let arrayName: type[] = [value1, value2, ..., valueN]
var projectID = [1, 2, 3, 4, 5];
var taskList = ["Fix Camera", "Buy Milk"];

// Tuples in TypeScript are similar to arrays, but unlike arrays, which can store elements of different types, tuples can store elements of fixed data types.
// syntax :- let tupleName: [type1, type2, ..., typeN] = [value1, value2, ..., valueN]
// to create a tuple named user that holds a username (string) and a password (string)
var USER = ["johnDoe", "mySecretPassword"];
// You can also use the below way to easily extract the values of the elements in a tuple into separate variables. For example, to extract the username and password from the user tuple
var username = USER[0],
  password = USER[1]; //This is called "destructuring" and helps in extracting the data from the Tuple.

var user = {
  name: "Alice",
  id: 1,
  greet: function () {
    return "Hello, my name is ".concat(this.name);
  },
};

// We can then create a function that adheres to this contract:
var getGreeting = function (user) {
  return user.greet();
};

console.log(getGreeting(user)); // "Hello, my name is Alice"

// We can then create a class that implements this interface:
var Manager = /** @class */ (function () {
  function Manager(name, id, salary) {
    this.name = name;
    this.id = id;
    this.salary = salary;
  }
  Manager.prototype.greet = function () {
    return "Hi, my name is ".concat(this.name, " and I am the manager.");
  };
  return Manager;
})();

var manager = new Manager("Uday", 4, 50000);
console.log(getGreeting(manager)); // "Hi, my name is Uday and I am the manager."
