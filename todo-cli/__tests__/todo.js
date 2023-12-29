
const todoList = require('../todo');  // import the todo.js file 

const { all , markAsComplete , add } = todoList();

describe("Todolist test suite" , () => {
   test("Should add new todo" , () => {
    expect(all.length).toBe(0);              // before there are no any list 
    add(                                     // we add one list 
        {
            title : "Test todo",
            completed : false ,
            dueDate : new Date().toLocaleDateString("en-CA"),
        }
    );
     expect(all.length).toBe(1);             // then we expect there are one list
   });

   test("Should mark as todo complete" , () => {
    expect(all[0].completed).toBe(false);         // it check all[0].completed is "false "or not
    markAsComplete(0);                            // call the markAsCompleted , one we are check it then it convert "false" into the "true"
    expect(all[0].completed).toBe(true);          // the it it check all[0].completed is "true "or not
   })
})


/*
const todoList = require('../todo');   

const { all , markAsComplete , add } = todoList();

describe("Todolist test suite" , () => {
  beforeAll( () => {                            // this beforeAll exucute the code which we given inside before the all given code
    add(                                     
        {
    title : "Test todo",
    completed : false ,
    dueDate : new Date().toLocaleDateString("en-CA"),
}
);
  });

   test("Should add new todo" , () => {
    const todoItemsCount = all.length ;                  // this give all.length=(1) to the variable
    add(                                     
                {
            title : "Test todo",
            completed : false ,
            dueDate : new Date().toLocaleDateString("en-CA"),
        }
    );
     expect(all.length).toBe( todoItemsCount + 1);       // this give value and expect ( todoItemsCount + 1) = (1+1)    
   });

   test("Should mark as todo complete" , () => {
    expect(all[0].completed).toBe(false);         
    markAsComplete(0);                            
    expect(all[0].completed).toBe(true);          
   })
})
*/



