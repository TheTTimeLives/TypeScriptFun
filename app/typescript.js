var itemList;
//Is currentDate equal to a date time
//I don't think Quokka plays nice with typescript and you have to restart the editor to clear the cache of whatever the types name is
var ToDoList = /** @class */ (function () {
    function ToDoList() {
    }
    ToDoList.prototype.getcurrentDate = function () {
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date + ' ' + time;
        return dateTime;
    };
    ToDoList.prototype.sendToDo = function (item) {
        console.log(item.time);
        console.log(item.text);
    };
    return ToDoList;
}());
var sentItem = new ToDoList();
itemList = [
    {
        time: sentItem.getcurrentDate(),
        text: 'This is a thing'
    },
    {
        time: sentItem.getcurrentDate(),
        text: 'This is another thing'
    }
];
function makeList() {
    // Create the list element:
    var list = document.createElement('ul');
    itemList.forEach(function (data) {
        // Create the list item:
        var item = document.createElement('li');
        // Set its contents:
        item.appendChild(document.createTextNode(data.text));
        // Add it to the list:
        list.appendChild(item);
    });
    // Finally, return the constructed list:
    return list;
}
document.getElementById('listTarget').appendChild(makeList());
document.getElementById('sendText').onclick = function (event) {
    event.preventDefault();
    //Why does this work???
    var inputValue = document.getElementById('textBox').value;
    // document.getElementById("myTextarea").value = "Fifth Avenue, New York City";
    var textData = {
        time: sentItem.getcurrentDate(),
        text: inputValue
    };
    sentItem.sendToDo(textData);
};
