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

function printHello(): void { //  It is commonly used as the return type of function that does not return a value.
    console.log("Hello!");
  }

printHello()

function throwError(): never {
    throw new Error("An error occurred!");
  }

  // we have used type annotations to specify that the addUser function takes in an input which follows the interface User and returns a string.
  function addUser(user: User): string {
    return user.name + " added successfully";
}


// type inference refers to the ability of the compiler to automatically determine the data type of a value based on its usage.
let userName = "Jane";  // type: string
let userID = 10;  // type: number      
let uniqueID = userName + userID;  //Here, the compiler will automatically infer that userName is a string and userID is a number and will concatenate the final output as a string.


// Arrays in TypeScript are a data type that allows you to store a collection of elements, typically of the same type.
// syntax :- let arrayName: type[] = [value1, value2, ..., valueN]
let projectID: number[] = [1, 2, 3, 4, 5];
let taskList: string[] = ["Fix Camera", "Buy Milk"];


// Tuples in TypeScript are similar to arrays, but unlike arrays, which can store elements of different types, tuples can store elements of fixed data types.
// syntax :- let tupleName: [type1, type2, ..., typeN] = [value1, value2, ..., valueN]
// to create a tuple named user that holds a username (string) and a password (string)
let USER : [string, string] = ["johnDoe", "mySecretPassword"];
// You can also use the below way to easily extract the values of the elements in a tuple into separate variables. For example, to extract the username and password from the user tuple
let [username, password] = USER; //This is called "destructuring" and helps in extracting the data from the Tuple.


// An interface in TypeScript is a type that defines a contract for the shape of an object. It specifies the members that an object must have and their types.
// For example, consider an interface for a User object that has a name property of type string, an id property of type number, and a function, greet(), that returns a string. 
interface User {
  name: string;
  id: number;
  greet(): string;
}

const user: User = {
  name: 'Alice',
  id: 1,
  greet() {
    return `Hello, my name is ${this.name}`;
  },
};

// We can also use interfaces to define the shape of function arguments and return values. 
interface GetGreetingFn {
  (user: User): string;
}

// We can then create a function that adheres to this contract:
const getGreeting: GetGreetingFn = (user: User) => {
  return user.greet();
};

console.log(getGreeting(user)); // "Hello, my name is Alice"

// Interfaces can also be used to define the shape of classes. For example, we can define an interface for an Employee class that extends the User interface and has a salary property of type number:
interface Employee extends User {
  salary: number;
}

// We can then create a class that implements this interface:
class Manager implements Employee {
  name: string;
  id: number;
  salary: number;

  constructor(name: string, id: number, salary: number) {
    this.name = name;
    this.id = id;
    this.salary = salary;
  }

  greet() {
    return `Hi, my name is ${this.name} and I am the manager.`;
  }
}

const manager = new Manager('Uday', 4, 50000);
console.log(getGreeting(manager)); // "Hi, my name is Uday and I am the manager."
// In summary, we can use interfaces in TypeScript to define a contract for the shape of an object, the members it can have and their data types.
