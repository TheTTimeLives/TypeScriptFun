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
    }
}

let sentItem = new ToDoList();


itemList = [
    {
        time: sentItem.getcurrentDate(),
        text: 'This is a thing'

    },
    {
        time: sentItem.getcurrentDate(),
        text: 'This is another thing'

    }

]


function makeList() {

    // Create the list element:
    var list = document.createElement('ul');

    itemList.forEach(function(data){
        // Create the list item:
        var item = document.createElement('li');
        // Set its contents:
        item.appendChild(document.createTextNode(data.text));
        // Add it to the list:
        list.appendChild(item);
    })
    // Finally, return the constructed list:
    return list;
}

// Add the contents of options[0] to #foo:
document.getElementById('listTarget').appendChild(makeList());

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

