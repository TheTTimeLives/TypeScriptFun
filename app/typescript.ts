import { json } from 'body-parser'

//We might need to add the ? operator if our Partials aren't good enough later
interface Item {
  _id: number
  key: string
  time: string
  text: string
}

let itemList: Item[]

class ToDoList {
  constructor() {
  }

  // This is a return type
  // I can't do Return<K,T> because I don't have any other functions that return anything, but basically you can use how you'd use other variables but you can basically record the shape of your return and pass it along under that convention
  // It's common to see Return<K extends string, T> because it prevents you from passing objects or whatever as property names on an object

  getcurrentDate(): string {
    let today = new Date()
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
    let time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
    let dateTime = date + ' ' + time
    return dateTime
  }

  sendToDo(item: Partial<Item>) {
    console.log(item.time)
    console.log(item.text)

    let xhr = new XMLHttpRequest()
    xhr.open('POST', '/postroute', true)
    // we had this urlencode vs set as application/json formatting which is what caused the strange shape
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')

    let thing = 1

    xhr.send(JSON.stringify(item))
  }

  async deleteToDo(data: Item) {
    fetch(`/deleteListing/${data._id}`, {
      method: 'delete'
    })
      .then(response => response.json())
  }

  // Update and delete CRUD too and then we'll move it to local storage

  async getToDo() {
    try {
      var response = await fetch('/todolist')
      var body = await response.json()

      // Create the list element:
      var list = document.createElement('ul')

      body.forEach(function (data: Item) {
        // Create the list item:
        var item = document.createElement('li')
        var button = document.createElement('button')
        // give it an id from the db
        button.setAttribute('id', <any>data._id)
        button.addEventListener('click', function (event) {
          // This isn't the optimal pattern, you should just add the document listener because it's more performant apparently
          event.preventDefault()
          console.log('Say some shit')
          console.log(data)

          // Why can't I just call the method from the class like this even when I use the arrow function?
          // this.deleteToDo(data.__id);

          fetch(`/deleteListing/${data._id}`, {
            method: 'delete'
          })
            .then(response => response.json())
        })
        button.innerHTML = 'Delete this listing'
        // Set its contents:
        item.appendChild(document.createTextNode(data.text))
        // Add it to the list:
        list.appendChild(item)
        list.appendChild(button)
      })

      // Finally, return the constructed list:
      // return list;

      // Object is possibly null?

      let listTarget: HTMLElement = document.getElementById('listTarget')!
      listTarget.appendChild(list)

      console.log(body)
    } catch (e) {
      console.log(e)
    }
  }

  async getToDoLocal() {
    try {
      // type checking
      var body: Item[] = []
      let keys = Object.keys(localStorage)

      // I should make an intermediate array and append the key data to each thing so that I have access to all my data in one thing

      keys.forEach(function (key) {
        // this ! operator just solves everything I guess
        let item: string = localStorage.getItem(key)!
        let parsed: Item = JSON.parse(item)
        parsed.key = key
        body.push(parsed)
      })

      console.log('These my keys')
      console.log(body)

      // Create the list element:
      var list = document.createElement('ul')

      body.forEach(function (data) {
        // Create the list item:
        var item = document.createElement('li')
        var button = document.createElement('button')
        // give it an id from the db
        button.setAttribute('id', <any>data._id)
        button.addEventListener('click', function (event) {
          // This isn't the optimal pattern, you should just add the document listener because it's more performant apparently
          event.preventDefault()
          console.log('Say some shit')
          console.log(data)

          // Why can't I just call the method from the class like this even when I use the arrow function?
          // this.deleteToDo(data.__id);

          // Am I going to have to query local storage again?
          // I need to get an array of the keys in there and have the right one so that I can delete the right thing from storage. I have an array of keys but I need to first verify that each one is correct ... ?
          // any saving me again man jeez... no bueno
          // I guess theres no way or reason to use generic types with this
          localStorage.removeItem(<any>data.key)
        })
        button.innerHTML = 'Delete this listing'
        // Set its contents:
        item.appendChild(document.createTextNode(data.text))
        // Add it to the list:
        list.appendChild(item)
        list.appendChild(button)
      })

      // Finally, return the constructed list:
      // return list;

      let listTarget: HTMLElement = document.getElementById('listTarget')!
      listTarget.appendChild(list)

      console.log(body)
    } catch (e) {
      console.log(e)
    }
  }
}

let sentItem = new ToDoList()

sentItem.getToDo()

// sentItem.getToDoLocal()

// Add the contents of options[0] to #foo:

// FOR MONGODB

function MongoClick() {
  let sendButton: HTMLElement = document.getElementById('sendText')!;

  sendButton.onclick = function (event) {

    event.preventDefault();

    //Why does this work???
    var inputValue = (<HTMLInputElement>document.getElementById('textBox')).value;

    // document.getElementById("myTextarea").value = "Fifth Avenue, New York City";

    let textData = {
      time: sentItem.getcurrentDate(),
      text: inputValue
    }

    sentItem.sendToDo(textData);

  }
}

MongoClick();




// document.getElementById('sendText').onclick = function (event) {

//   event.preventDefault();

//   //Why does this work???
//   var inputValue = (<HTMLInputElement>document.getElementById('textBox')).value;

//   // document.getElementById("myTextarea").value = "Fifth Avenue, New York City";

//   let textData = {
//       time: sentItem.getcurrentDate(),
//       text: inputValue
//   }

//   sentItem.sendToDo(textData);



// }






//THIS IS FOR LOCAL STORAGE

function LocalStorageClick() {

  let i = 1

  let sendButton: HTMLElement = document.getElementById('sendText')!

  sendButton.onclick = function (event) {
    event.preventDefault()

    // Why does this work???
    var inputValue = (<HTMLInputElement>document.getElementById('textBox')).value

    // document.getElementById("myTextarea").value = "Fifth Avenue, New York City";

    let textData = {
      time: sentItem.getcurrentDate(),
      text: inputValue
    }

    i++

    window.localStorage.setItem('listing' + i, JSON.stringify(textData))

    // sentItem.sendToDo(textData);
  }

}


// LocalStorageClick();






// I don't think this did anything below

// function deleteListing(event: ) {
//     event.preventDefault();

//     console.log('Sucks');
// }

// //get the HTML Collection (it's not an Array and you have to loop for everything that has that class and add event listeners)
// var listingClasses = document.getElementsByClassName('deleteListing');

// console.log(listingClasses);

// var deleteListing = function(event) {
//     //I'm trying
//     event.preventDefault();

//     var attribute = this.getAttribute("ID");
//     console.log(attribute);
//     console.log('dicks');
//     // alert(attribute);

// };

// //change this to a foreach
// for (var i = 0; i < listingClasses.length; i++) {
//     console.log('This loop ran');
//     listingClasses[i].addEventListener('click', deleteListing, false);
// }

// var classname = document.getElementsByClassName("deleteListing");

// var myFunction = function(event) {
//     event.preventDefault();
//     console.log('Its me');
//     var attribute = this.getAttribute("data-myattribute");
//     alert(attribute);
// };

// //Why doesn't this work? This function is not running...

// for (var i = 0; i < classname.length; i++) {
//     classname[i].addEventListener('click', function (e) {
//         e.preventDefault();
//         console.log('Stuff')
//     }, false);
// }

// document.addEventListener('click', function (event) {

// 	if (event.target.matches('.modal-open')) {
// 		// Run your code to open a modal
// 	}

// 	if (event.target.matches('.close')) {
// 		// Run your code to close a modal
// 	}

// }, false);
