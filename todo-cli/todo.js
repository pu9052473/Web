/* eslint-disable no-undef */
const todoList = () => {
  all = [];
  const add = (todoItem) => {
    all.push(todoItem);
  };
  const markAsComplete = (index) => {
    all[index].completed = true;
  };

  // const formattedDate = (d) => {
  //   // to get today's date
  //   return d.toISOString().split("T")[0];
  // };

  // let Today = new Date();
  // const today = formattedDate(Today); // save today's date in today
  // const yesterday = formattedDate(
  //   new Date(new Date().setDate(Today.getDate() - 1)) // get today's date and (-1) mean one day before (yesterday) , set into the yesterday
  // );
  // const tomorrow = formattedDate(
  //   new Date(new Date().setDate(Today.getDate() + 1)) // get today's date and (+1) mean one day after (tomorrow) , set into the tomorrow
  // );
  let Today = new Date();

  // const today = formattedDate(Today);
  const yesterday = new Date(Today);
  yesterday.setDate(Today.getDate() - 1);
  const tomorrow = new Date(Today);
  tomorrow.setDate(Today.getDate() + 1);

  const overdue = () => {
    // Write the date check condition here and return the array
    // of overdue items accordingly.

    return all.filter((item) => item.dueDate === Today.getDate() - 1); // return yesterday's date
  };

  const dueToday = () => {
    // Write the date check condition here and return the array
    // of todo items that are due today accordingly.
    return all.filter((item) => item.dueDate === Today); // return today's date
  };

  const dueLater = () => {
    // Write the date check condition here and return the array
    // of todo items that are due later accordingly.
    return all.filter((item) => item.dueDate === Today.getDate() + 1); // return date greter than today , mean tomorrow
  };

  const toDisplayableList = (list) => {
    // Format the To-Do list here, and return the output string
    // as per the format given above.
    return list
      .map((item) => {
        const status = item.completed ? "[X]" : "[]"; // if completed = true print [X] , else print []
        const dueDate = item.dueDate === today ? "" : `${item.dueDate}`; // if dueDate = today then "" mean don't print the date , else print the date
        return `${status} ${item.title} ${dueDate}`;
      })
      .join("\n"); // this all join by '\n' mean new line
  };

  return {
    all,
    add,
    markAsComplete,
    overdue,
    dueToday,
    dueLater,
    toDisplayableList,
  };
};

module.exports = todoList;

// ####################################### #
// DO NOT CHANGE ANYTHING BELOW THIS LINE. #
// ####################################### #

/*
const todos = todoList();

const formattedDate = (d) => {
  // to get today's date
  return d.toISOString().split("T")[0];
};

let Today = new Date();
const today = formattedDate(Today); // save today's date in today
const yesterday = formattedDate(
  new Date(new Date().setDate(Today.getDate() - 1)) // get today's date and (-1) mean one day before (yesterday) , set into the yesterday
);
const tomorrow = formattedDate(
  new Date(new Date().setDate(Today.getDate() + 1)) // get today's date and (+1) mean one day after (tomorrow) , set into the tomorrow
);

todos.add({ title: "Submit assignment", dueDate: yesterday, completed: false });
todos.add({ title: "Pay rent", dueDate: today, completed: true });
todos.add({ title: "Service Vehicle", dueDate: today, completed: false });
todos.add({ title: "File taxes", dueDate: tomorrow, completed: false });
todos.add({ title: "Pay electric bill", dueDate: tomorrow, completed: false });

console.log("My Todo-list\n");

console.log("Overdue");
var overdues = todos.overdue(); // value of call the overdue , set into the overdues
var formattedOverdues = todos.toDisplayableList(overdues); // call toDisplayableList(overdues) , set into formattedOverdues
console.log(formattedOverdues); // print the formattedOverdues
console.log("\n");

console.log("Due Today");
let itemsDueToday = todos.dueToday(); // value of call the dueToday , set into the itemDueToday
let formattedItemsDueToday = todos.toDisplayableList(itemsDueToday); // call toDisplayableList(itemDueToday) , set into formattedItemsDueToday
console.log(formattedItemsDueToday); // print the formattedItemsDueToday
console.log("\n");

console.log("Due Later");
let itemsDueLater = todos.dueLater(); // value of call the dueLater , set into the itemDueLater
let formattedItemsDueLater = todos.toDisplayableList(itemsDueLater); // call toDisplayableList(itemDueLater) , set into formattedItemsDueLater
console.log(formattedItemsDueLater); // print the formattedItemsDueLater
console.log("\n\n");
*/
