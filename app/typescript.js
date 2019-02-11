"use strict";
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
exports.__esModule = true;
var itemList;
var ToDoList = /** @class */ (function () {
    function ToDoList() {
    }
    // This is a return type
    // I can't do Return<K,T> because I don't have any other functions that return anything, but basically you can use how you'd use other variables but you can basically record the shape of your return and pass it along under that convention
    // It's common to see Return<K extends string, T> because it prevents you from passing objects or whatever as property names on an object
    ToDoList.prototype.getcurrentDate = function () {
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
        var dateTime = date + ' ' + time;
        return dateTime;
    };
    ToDoList.prototype.sendToDo = function (item) {
        console.log(item.time);
        console.log(item.text);
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/postroute', true);
        // we had this urlencode vs set as application/json formatting which is what caused the strange shape
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        var thing = 1;
        xhr.send(JSON.stringify(item));
    };
    ToDoList.prototype.deleteToDo = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                fetch("/deleteListing/" + data._id, {
                    method: 'delete'
                })
                    .then(function (response) { return response.json(); });
                return [2 /*return*/];
            });
        });
    };
    // Update and delete CRUD too and then we'll move it to local storage
    ToDoList.prototype.getToDo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, body, list, listTarget, e_1;
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
                            // give it an id from the db
                            button.setAttribute('id', data._id);
                            button.addEventListener('click', function (event) {
                                // This isn't the optimal pattern, you should just add the document listener because it's more performant apparently
                                event.preventDefault();
                                console.log('Say some shit');
                                console.log(data);
                                // Why can't I just call the method from the class like this even when I use the arrow function?
                                // this.deleteToDo(data.__id);
                                fetch("/deleteListing/" + data._id, {
                                    method: 'delete'
                                })
                                    .then(function (response) { return response.json(); });
                            });
                            button.innerHTML = 'Delete this listing';
                            // Set its contents:
                            item.appendChild(document.createTextNode(data.text));
                            // Add it to the list:
                            list.appendChild(item);
                            list.appendChild(button);
                        });
                        listTarget = document.getElementById('listTarget');
                        listTarget.appendChild(list);
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
    ToDoList.prototype.getToDoLocal = function () {
        return __awaiter(this, void 0, void 0, function () {
            var body, keys, list, listTarget;
            return __generator(this, function (_a) {
                try {
                    body = [];
                    keys = Object.keys(localStorage);
                    // I should make an intermediate array and append the key data to each thing so that I have access to all my data in one thing
                    keys.forEach(function (key) {
                        // this ! operator just solves everything I guess
                        var item = localStorage.getItem(key);
                        var parsed = JSON.parse(item);
                        parsed.key = key;
                        body.push(parsed);
                    });
                    console.log('These my keys');
                    console.log(body);
                    list = document.createElement('ul');
                    body.forEach(function (data) {
                        // Create the list item:
                        var item = document.createElement('li');
                        var button = document.createElement('button');
                        // give it an id from the db
                        button.setAttribute('id', data._id);
                        button.addEventListener('click', function (event) {
                            // This isn't the optimal pattern, you should just add the document listener because it's more performant apparently
                            event.preventDefault();
                            console.log('Say some shit');
                            console.log(data);
                            // Why can't I just call the method from the class like this even when I use the arrow function?
                            // this.deleteToDo(data.__id);
                            // Am I going to have to query local storage again?
                            // I need to get an array of the keys in there and have the right one so that I can delete the right thing from storage. I have an array of keys but I need to first verify that each one is correct ... ?
                            // any saving me again man jeez... no bueno
                            // I guess theres no way or reason to use generic types with this
                            localStorage.removeItem(data.key);
                        });
                        button.innerHTML = 'Delete this listing';
                        // Set its contents:
                        item.appendChild(document.createTextNode(data.text));
                        // Add it to the list:
                        list.appendChild(item);
                        list.appendChild(button);
                    });
                    listTarget = document.getElementById('listTarget');
                    listTarget.appendChild(list);
                    console.log(body);
                }
                catch (e) {
                    console.log(e);
                }
                return [2 /*return*/];
            });
        });
    };
    return ToDoList;
}());
var sentItem = new ToDoList();
sentItem.getToDo();
// sentItem.getToDoLocal()
// Add the contents of options[0] to #foo:
// FOR MONGODB
function MongoClick() {
    var sendButton = document.getElementById('sendText');
    sendButton.onclick = function (event) {
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
    var i = 1;
    var sendButton = document.getElementById('sendText');
    sendButton.onclick = function (event) {
        event.preventDefault();
        // Why does this work???
        var inputValue = document.getElementById('textBox').value;
        // document.getElementById("myTextarea").value = "Fifth Avenue, New York City";
        var textData = {
            time: sentItem.getcurrentDate(),
            text: inputValue
        };
        i++;
        window.localStorage.setItem('listing' + i, JSON.stringify(textData));
        // sentItem.sendToDo(textData);
    };
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
