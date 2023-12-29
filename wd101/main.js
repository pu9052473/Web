// const hello = () =>{
//      console.log("hello node.js");
// };
// hello();


// const fs = require("fs");   // include file system (fs) 

// fs.writeFile(                  // write in the file 
//      "sample.text",            // name of file in which we have to write
//      "hello world. Welcome to the node.js File system module \n",  // the content which we are writing in the file
//      (err) => {
//           if (err) throw err;
//           console.log("File is created");
//      }
// );


// fs.readFile("sample.text",(err,data) => {    // to read the content of file which write in console.log()
//      if (err) throw err,
//      console.log(data.toString());     // convert content into the string to display in console
// });


// fs.appendFile("sample.text","this is my update file",(err) => {   // to update the file
//      if (err) throw err;
//      console.log("file updated!");      // display in console
// });


// fs.rename("sample.text","text.txt",(err) => {   // to rename the file
//      if (err) throw err;
//      console.log("file renamed!");      // display in console
// });


// fs.unlink("text.txt",(err) => {   // to delete the file
//      if (err) throw err;
//      console.log("file text.txt is deleted successfully");      // display in console
// });


// const http = require("http");   // create a http
// const fs = require("fs");     // create a file system

// const server = http.createServer((req,res) => {
//      // fs.readFile("sample.txt",(err,data) => {   // read the file which is given 
//      //      res.end(data);    // call back function which call the server 
//      // });   // this function read all the data from the file then display to the server , so for many content it takes much time to display

//      const stream = fs.createReadStream("sample.txt");  // it read content and display in the server by line to line , so after run the content will auto display after reading and stream in the server page
//      stream.pipe();    // call back function which call the server 
// });
// server.listen(1003)     // create the server of localhost which have value localhost:1003    

     
//      // accepting  input from CLI , it is usefull for taking single argument , it become complicated for multiple argument 
// const readline = require("readline");

// const linedetail = readline.createInterface({
//     input : process.stdin ,     // for taking input
//     output : process.stdout ,     // give output
// }); 

// linedetail.question(`Please provide your name - `, (name) => {   // display in terminal
//     console.log(`Hi ${name}!`);   // output eith given name 
//     lineDetail.close();    // close the function call
//   });


     // for accepting multiple argument input we use minimist
// const args = require("minimist")(process.argv.slice(2));  // using slice method to get argument 
// console.log(args);     // to print the argument

//  let args = require("minimist")(process.argv.slice(2), {  //This is useful if you want to have a short name for your variable options
//      alias: {
//        n: "name",  // take argument in both n or name 
//        a: "age",   // take argument in both a or age
//      },
//      default: {
//         greeting: "hello user!",     // if not passed any argument 
//      }
//     });
//     console.log(args);  // to print the argument


         //  wb 201 : L2 , for my first application project
//   const http = require("http");     // declare http server
//   const fs = require("fs");      //  declare file system 

//   let homeContent = "" ;
//   let projectContent = "" ;
//   let registrationcontent = "";

//  fs.readFile("home.html",(err,home) => {   // value of file that give to "home" , when call "home" this page will open
//      if (err) throw err;
//      homeContent = home ;     // give value to call back function
//  });

//  fs.readFile("project.html",( err , project ) => {    // value of file that give to "project" , when call "project" this page will open
//     if (err) throw err ;
//     projectContent = project ;      // give value to call back function  
//  });

//  fs.readFile("form.html",( err , form ) => {      // value of file that give to "form" , when call "form" this page will open
//    if (err) throw err ;
//    registrationcontent = form ;      // give value to the call back function
//    });

//    const args = require("minimist")(process.argv.slice(2));       // declare the minimist
// const portinput = args.port;

// //To check If Number is Provided or not
// if (portinput === undefined) {
//     console.log("Enter A Valid Port Number");
// } else {
//     const port = parseInt(portinput, 10); 
     
//  http
//  .createServer((request, response) => {      // creating the server

//    let url = request.url ;
//    response.writeHeader(200, { "Content-Type": "text/html" });   // tells http server that file should be html
//    switch ( url ) {

//    case "/project" :                  // case mean if localhost(1003)/project then display this page
//    response.write(projectContent);    // to call the file who have value "projectcontent"
//    response.end();                    // end of call
//    break ;

//    case "/form" :
//     response.write(registrationcontent);       // to call the file who have value "registrationcontent"
//     response.end();                            // end of call
//     break ;

//    default :                          // if there no specified after localhost(1003) the display the default page
//    response.write(homeContent);       // if default the call file who have value "homecontent"
//    response.end();                    // end the call

//  }
//  })

//  .listen(port, () => { console.log(`Server is listening on port ${port}`); });   // 
// }
// //  .listen(1003);    // value of localhost


// console.log('Hello 1');
// setTimeout(function() {       // setTimeout() function do work after given time in milisecond 
//   console.log('Hello 2');  
// },1000);                      // 1000 milisecond = 1 second                
// console.log('Hello 3');


     // call stack is like an container work as LIFO(last in first out)
// const firstName = () => console.log(`Uday`);
// const lastName = () => console.log(`Panchal`);
// const printName = () => {         
//   console.log(`My name is :`);
//   firstName();
//   lastName();
// }
// printName();   // when call fullName it fist print first line , then put firstName in call stack firstname do their work then it out from call stack , then put lastName in calll stack and repeat the work 
//                // this every is known as 'event loop' : (1) printname(); (2) print 'my name is :' (3) firstname(); (4) lastname(); 


// const firstName = () => console.log(`Uday`);
// const lastName = () => console.log(`Panchal`);
//  const printName = () => {                        // in this what happen in event loop : (1) printname(); (2) print 'my name is :'  
//   console.log(`My name is :`);
//  setTimeout( firstName , 0 );        // (3) setTimeout(firstname , 0) ,but event loop send this settimeout function to messageque , so this not work this work after all the function 
//   lastName();                                     // (4) lastname();
//  }
//   printName();  


       // use function closure
//   function generateGreetings(name) {          //  In closure child can use parent's ( argument or variable )  
//     function spanish() {
//        console.log(`Hola ${name}!`);               // using closure the one argument can use by both parent or child
//          }
//     function english() {
//        console.log(`Hello ${name}!`);
//          }
//        return {spanish, english};
//       };
        
//         const name = 'Uday';
//         const greetings = generateGreetings(name);
        
//         console.log(typeof(greetings.spanish)); // function
        
//         greetings.spanish(); // Hola Uday!
//         greetings.english(); // Hello Uday!


      //  callback function
// const fetchUserDetails = (userID , callback) => {
//    console.log(`Fetching User Details`);
//    setTimeout( () => {
//      callback(`http://image.example.com/${userID}`)
//    } , 500);
// };

// const downloadImage = (imageURL , callback) => {
//    console.log(`Downloading Image`);
//    setTimeout( () => {
//      callback(`Image data for ${imageURL}`)
//    } , 500);
// };

// const render = (image) => {
//      console.log(`Render Image`);
// };

// fetchUserDetails ( "Uday" , (imageURL) => {
//      downloadImage ( imageURL , (imagedata) => {     // this pattern known as callback function
//           render (imagedata);
//      })
// })


          // use resolve
// const fetchUserDetails = (userID) => {
//      console.log(`Fetching User Details`);
//     return new Promise (( resolve , reject ) => {
//      setTimeout( () => {
//          resolve(`http://image.example.com/${userID}`)
//        } , 500);
//     })
//   };

//   const downloadImage = (imageURL) => {
//      console.log(`Downloading Image`);
//      return new Promise ( ( resolve , reject ) => {
//           setTimeout( () => {
//                resolve(`Image data for ${imageURL}`)
//              } , 500);
//      })
//   };

//   const render = (image) => {
//      console.log(`Render Image`);
// };

// fetchUserDetails("Uday") 
// .then ( (imageURL) => downloadImage (imageURL))
// .then ( (ImageData) => render (ImageData) )
// .catch ( (error) => {
//      console.log(error);
// })


      // use async
// const time = async ( ms ) => {
//  return new Promise ( ( resolve , reject ) => {
//      setTimeout ( () => {
//           resolve();
//      } , ms );
//  });
// };

// const fetchUserDetails = async (userID) => {
//      console.log(`Fetching User Details`);
//      await time (500);
//      return `http://image.example.com/${userID}`
//   };

//   const downloadImage = async (imageURL) => {
//      console.log(`Downloading Image`);
//      await time (500);
//      return `Image data for ${imageURL}`
//   };

//   const render = async (image) => {
//      await time (300);
//      console.log(`Render Image`);
// };

// const run = async () => {
//      const imageURL = await fetchUserDetails("Uday");
//      const imageData = await downloadImage(imageURL);
//      await render(imageData);
// }

// run();


     // making todo list using closure ( this should write in terminal )
// const todolist = () => {
//     const all = [] ;                            // all will be empty in begning  
//         const add = (todoTask) => {              
//             all.push(todoTask);                 // which argument we will pass in todoTask that will push into the all
//             console.log(all);                   // print the all
//         }
//         const markAsComplete = (index) => {     
//             all[index].completed = true ;       // we pass which index number , in that todo list the value of element completed , change into the true
//             console.log(all);                   // print the all
//         }
//        return { all , add , markAsComplete };    
// }
// const todos = todolist();

     // after this function define in terminal 

// > todos.all
// []                                            // first this is empty
// > todos.add({ title : " i need to go to gym " , dueDate : "05-09-2022" , completed : false})
/* [
    {
      title : " i need to go to gym " , 
      dueDate : "05-09-2022" ,                   // this argumet push into the todos
      completed : false
    }
   ]*/
// > todos.add({title : "Renew insurance" , dueDate : "05-09-2022" , completed : false})
/* [
    {
      title : " i need to go to gym " , 
      dueDate : "05-09-2022" ,                   // this is also print becase the closure of the function
      completed : false
    },
    {
      title : "Renew insurance" , 
      dueDate : "05-09-2022" ,                   // this argument push into the todos
      completed : false
    }
   ]*/
// > todos.markAsComplete(1)
/* [
    {
      title : " i need to go to gym " , 
      dueDate : "05-09-2022" ,                  
      completed : false
    },
    {
      title : "Renew insurance" , 
      dueDate : "05-09-2022" ,                   
      completed : true                           // the value of comleted of index number(1) is change into the true
    }
   ]*/
// > todos.markAsComplete(0)   
/* [
    {
      title : " i need to go to gym " , 
      dueDate : "05-09-2022" ,                   
      completed : true                          // the value of comleted of index number(0) is change into the true
    },
    {
      title : "Renew insurance" , 
      dueDate : "05-09-2022" ,                   
      completed : true                          // value of index(1) is remain the true 
    }
   ]*/


     // 201 , L3 , task : display to-do list
    /*
    My Todo-list

    Overdue
    [ ] Submit assignment 2022-07-21

    Due Today
    [x] Pay rent
    [ ] Service vehicle

    Due Later
    [ ] File taxes 2022-07-23
    [ ] Pay electric bill 2022-07-23
     */

    /*
    const todoList = () => {
    all = []
    const add = (todoItem) => {
      all.push(todoItem)
    }
    const markAsComplete = (index) => {
      all[index].completed = true
    }
  
    const overdue = () => {
      // Write the date check condition here and return the array
      // of overdue items accordingly.
      return all.filter( item => item.dueDate === yesterday );     // return yesterday's date
    }
  
    const dueToday = () => {
      // Write the date check condition here and return the array
      // of todo items that are due today accordingly.
      return all.filter(item => item.dueDate === today );          // return today's date
    }
  
    const dueLater = () => {
      // Write the date check condition here and return the array
      // of todo items that are due later accordingly.
      return all.filter(item => new Date(item.dueDate) > new Date() );      // return date greter than today , mean tomorrow
    }
  
    const toDisplayableList = (list) => {
      // Format the To-Do list here, and return the output string
      // as per the format given above.
      return list 
       .map( (item) => {
        const status = item.completed ? "[X]" : "[]" ;                      // if completed = true print [X] , else print []
        const dueDate = item.dueDate === today ? "" : `${item.dueDate}`;    // if dueDate = today then "" mean don't print the date , else print the date 
        return `${status} ${item.title} ${dueDate}`;                        
       })
        .join("\n");     // this all join by '\n' mean new line
    };
  
    return {
      all,
      add,
      markAsComplete,
      overdue,
      dueToday,
      dueLater,
      toDisplayableList
    };
  };
  
  // ####################################### #
  // DO NOT CHANGE ANYTHING BELOW THIS LINE. #
  // ####################################### #
  
  const todos = todoList();
  
   const formattedDate = d => {                        // to get today's date
     return d.toISOString().split("T")[0]
   }

     let Today = new Date()
     const today = formattedDate(Today)                       // save today's date in today
     const yesterday = formattedDate(
       new Date(new Date().setDate(Today.getDate() - 1))      // get today's date and (-1) mean one day before (yesterday) , set into the yesterday
     )
     const tomorrow = formattedDate(
       new Date(new Date().setDate(Today.getDate() + 1))      // get today's date and (+1) mean one day after (tomorrow) , set into the tomorrow
     )

  todos.add({ title: 'Submit assignment', dueDate: yesterday, completed: false })
  todos.add({ title: 'Pay rent', dueDate: today, completed: true })
  todos.add({ title: 'Service Vehicle', dueDate: today, completed: false })
  todos.add({ title: 'File taxes', dueDate: tomorrow, completed: false })
  todos.add({ title: 'Pay electric bill', dueDate: tomorrow, completed: false })
  
  console.log("My Todo-list\n")
  
  console.log("Overdue");
  var overdues = todos.overdue();                               // value of call the overdue , set into the overdues
  var formattedOverdues = todos.toDisplayableList(overdues);    // call toDisplayableList(overdues) , set into formattedOverdues
  console.log(formattedOverdues);                               // print the formattedOverdues
  console.log("\n");
  
  console.log("Due Today");
  let itemsDueToday = todos.dueToday();                                    // value of call the dueToday , set into the itemDueToday
  let formattedItemsDueToday = todos.toDisplayableList(itemsDueToday);     // call toDisplayableList(itemDueToday) , set into formattedItemsDueToday
  console.log(formattedItemsDueToday);                                     // print the formattedItemsDueToday
  console.log("\n");
  
  console.log("Due Later");
  let itemsDueLater = todos.dueLater();                                    // value of call the dueLater , set into the itemDueLater
  let formattedItemsDueLater = todos.toDisplayableList(itemsDueLater);     // call toDisplayableList(itemDueLater) , set into formattedItemsDueLater
  console.log(formattedItemsDueLater);                                     // print the formattedItemsDueLater
  console.log("\n\n");   */


    //  Exp. of unit test using assert.js      
 /*
  let toggleTodoCompletedStatus = ( todoItem ) => {
    // todoItem.completed = !todoItem.completed ;        // message will display , because there is 'false'
     todoItem.completed = !todoItem.completed ;          // it converts the 'false' into the 'true' by (!) sign , so now there is 'true' message will not display
     return todoItem ;
};

let testToggleCompletion = () => {
   let item = {
    title : `By milk`,
    completed : true,
   };
 
   item = toggleTodoCompletedStatus(item);

   console.assert( item.completed === false , `Todo item should be completed`);  // here condition in 'false' not 'true',so it display the message 
}
  testToggleCompletion();   */
  

  const todoList = () => {
    all = []
    const add = (todoItem) => {
      all.push(todoItem)
    }
    const markAsComplete = (index) => {
      all[index].completed = true
    }
  
    const overdue = () => {
      // Write the date check condition here and return the array
      // of overdue items accordingly.
      return all.filter( item => item.dueDate === yesterday );     // return yesterday's date
    }
  
    const dueToday = () => {
      // Write the date check condition here and return the array
      // of todo items that are due today accordingly.
      return all.filter(item => item.dueDate === today );          // return today's date
    }
  
    const dueLater = () => {
      // Write the date check condition here and return the array
      // of todo items that are due later accordingly.
      return all.filter(item => new Date(item.dueDate) > new Date() );      // return date greter than today , mean tomorrow
    }
  
    const toDisplayableList = (list) => {
      // Format the To-Do list here, and return the output string
      // as per the format given above.
      return list 
       .map( (item) => {
        const status = item.completed ? "[X]" : "[]" ;                      // if completed = true print [X] , else print []
        const dueDate = item.dueDate === today ? "" : `${item.dueDate}`;    // if dueDate = today then "" mean don't print the date , else print the date 
        return `${status} ${item.title} ${dueDate}`;                        
       })
        .join("\n");     // this all join by '\n' mean new line
    };
  
    return {
      all,
      add,
      markAsComplete,
      overdue,
      dueToday,
      dueLater,
      toDisplayableList
    };
  };
  
  // ####################################### #
  // DO NOT CHANGE ANYTHING BELOW THIS LINE. #
  // ####################################### #
  
  const todos = todoList();
  
   const formattedDate = d => {                        // to get today's date
     return d.toISOString().split("T")[0]
   }

     let Today = new Date()
     const today = formattedDate(Today)                       // save today's date in today
     const yesterday = formattedDate(
       new Date(new Date().setDate(Today.getDate() - 1))      // get today's date and (-1) mean one day before (yesterday) , set into the yesterday
     )
     const tomorrow = formattedDate(
       new Date(new Date().setDate(Today.getDate() + 1))      // get today's date and (+1) mean one day after (tomorrow) , set into the tomorrow
     )

  todos.add({ title: 'Submit assignment', dueDate: yesterday, completed: false })
  todos.add({ title: 'Pay rent', dueDate: today, completed: true })
  todos.add({ title: 'Service Vehicle', dueDate: today, completed: false })
  todos.add({ title: 'File taxes', dueDate: tomorrow, completed: false })
  todos.add({ title: 'Pay electric bill', dueDate: tomorrow, completed: false })
  
  console.log("My Todo-list\n")
  
  console.log("Overdue");
  var overdues = todos.overdue();                               // value of call the overdue , set into the overdues
  var formattedOverdues = todos.toDisplayableList(overdues);    // call toDisplayableList(overdues) , set into formattedOverdues
  console.log(formattedOverdues);                               // print the formattedOverdues
  console.log("\n");
  
  console.log("Due Today");
  let itemsDueToday = todos.dueToday();                                    // value of call the dueToday , set into the itemDueToday
  let formattedItemsDueToday = todos.toDisplayableList(itemsDueToday);     // call toDisplayableList(itemDueToday) , set into formattedItemsDueToday
  console.log(formattedItemsDueToday);                                     // print the formattedItemsDueToday
  console.log("\n");
  
  console.log("Due Later");
  let itemsDueLater = todos.dueLater();                                    // value of call the dueLater , set into the itemDueLater
  let formattedItemsDueLater = todos.toDisplayableList(itemsDueLater);     // call toDisplayableList(itemDueLater) , set into formattedItemsDueLater
  console.log(formattedItemsDueLater);                                     // print the formattedItemsDueLater
  console.log("\n\n");   
  