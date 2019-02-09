var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var itemList;
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
        var xhr = new XMLHttpRequest();
        xhr.open("POST", '/postroute', true);
        //we had this urlencode vs set as application/json formatting which is what caused the strange shape
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        var thing = 1;
        xhr.send(JSON.stringify(item));
    };
    ToDoList.prototype.deleteToDo = function (data) {
        return fetch('/deletelisting', {
            method: "DELETE",
            // mode: "cors", // no-cors, cors, *same-origin
            // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            // credentials: "same-origin", // include, *same-origin, omit
            // headers: {
            //     "Content-Type": "application/json",
            //     // "Content-Type": "application/x-www-form-urlencoded",
            // },
            // redirect: "follow", // manual, *follow, error
            // referrer: "no-referrer", // no-referrer, *client
            body: JSON.stringify(data)
        })
            .then(function (response) { return console.log('The delete was sent'); }); // parses response to JSON
    };
    //Update and delete CRUD too and then we'll move it to local storage
    ToDoList.prototype.getToDo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, body, list, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, fetch('/todolist')];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()
                            // Create the list element:
                        ];
                    case 2:
                        body = _a.sent();
                        list = document.createElement('ul');
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
                                // also whenever I send the data to my route it comes back as an empty object and this confuses me, can I not send objects in a DELETE REQUEST?
                                // it doesn't seem to matter what I send there is just something wrong with this request
                                // 1. We know it hits the route correctly because if it was a different method it would just give me a 404 error
                                // 2. We know that at least before the fetch we have access to the data.
                                // A fetch is just syntactical sugar over the xmlhttprequest js way of making requests. Get requests request data, post requests, put requests and delete requests send objects (is this perfectly true?)
                                // this toDo is occuring asynchrnously meaning it will complete iself whenever it does (but this event handler should be on the element when I see it because ... it exists now)
                                // my question is ... where is the data when I want to make the request ... maybe if I get the data back from the element at that point then it will exist and I can send it...
                                // Setting the data equal to button's id element also sent an empty object
                                // I have to wonder if there is some sort of formatting error in the fetch process. 
                                fetch("/deleteListing/" + data._id, {
                                    method: 'delete'
                                })
                                    .then(function (response) { return response.json(); });
                                // fetch(data,'/deletelisting') {
                                //     method: 'delete'
                                //   })
                                //   .then(response => response.json());
                                // fetch('/deletelisting', {
                                //     method: "DELETE", // *GET, POST, PUT, DELETE, etc.
                                //     // mode: "cors", // no-cors, cors, *same-origin
                                //     // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                                //     // credentials: "same-origin", // include, *same-origin, omit
                                //     // headers: {
                                //     //     "Content-Type": "application/json",
                                //     //     // "Content-Type": "application/x-www-form-urlencoded",
                                //     // },
                                //     // redirect: "follow", // manual, *follow, error
                                //     // referrer: "no-referrer", // no-referrer, *client
                                //     body: button.getAttribute('id') // body data type must match "Content-Type" header
                                // })
                                //     .then(response => console.log('The delete was sent')); // parses response to JSON
                            });
                            button.innerHTML = 'Delete this listing';
                            // Set its contents:
                            item.appendChild(document.createTextNode(data.text));
                            // Add it to the list:
                            list.appendChild(item);
                            list.appendChild(button);
                        });
                        // Finally, return the constructed list:
                        // return list;
                        document.getElementById('listTarget').appendChild(list);
                        console.log(body);
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        console.log(e_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return ToDoList;
}());
var sentItem = new ToDoList();
sentItem.getToDo();
// Add the contents of options[0] to #foo:
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
