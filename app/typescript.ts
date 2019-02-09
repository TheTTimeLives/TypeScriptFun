interface Item {
    id?: number
    time: string
    text: string
}

let itemList: Item[]

class ToDoList {
    constructor() {
    }

    getcurrentDate() {
        let today = new Date();
        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let dateTime = date + ' ' + time;
        return dateTime;
    }

    sendToDo(item: Item) {
        console.log(item.time);
        console.log(item.text);

        let xhr = new XMLHttpRequest();
        xhr.open("POST", '/postroute', true);
        //we had this urlencode vs set as application/json formatting which is what caused the strange shape
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

        let thing = 1;

        xhr.send(JSON.stringify(item));
    }

    async deleteToDo(data) {
        fetch(`/deleteListing/${data._id}`, {
            method: 'delete'
          })
          .then(response => response.json());
    }

    //Update and delete CRUD too and then we'll move it to local storage

    async getToDo() {
        try {
            var response = await fetch('/todolist')
            var body = await response.json()

            // Create the list element:
            var list = document.createElement('ul');

            body.forEach(function (data) {

                // Create the list item:
                var item = document.createElement('li');
                var button = document.createElement('button');
                //give it an id from the db
                button.setAttribute("id", data._id);
                button.addEventListener('click', function (event) {
                    //This isn't the optimal pattern, you should just add the document listener because it's more performant apparently
                    event.preventDefault();
                    console.log('Say some shit');
                    console.log(data);

                    //Why can't I just call the method from the class like this even when I use the arrow function?
                    // this.deleteToDo(data.__id);

                    fetch(`/deleteListing/${data._id}`, {
                        method: 'delete'
                      })
                      .then(response => response.json());

                })
                button.innerHTML = 'Delete this listing';
                // Set its contents:
                item.appendChild(document.createTextNode(data.text));
                // Add it to the list:
                list.appendChild(item);
                list.appendChild(button);
            })

            // Finally, return the constructed list:
            // return list;
            document.getElementById('listTarget').appendChild(list);


            console.log(body);
        } catch (e) {
            console.log(e)
        }
    }
}






let sentItem = new ToDoList();

sentItem.getToDo()

// Add the contents of options[0] to #foo:


document.getElementById('sendText').onclick = function (event) {

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

function deleteListing(event) {
    event.preventDefault();

    console.log('Sucks');
}


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

