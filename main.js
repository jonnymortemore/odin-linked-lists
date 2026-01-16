import {LinkedList} from './classes.js'

const list = new LinkedList();

list.append("dog");
list.append("cat");
list.append("parrot");
list.append("hamster");
list.append("snake");
list.append("turtle");
list.prepend("bear")
console.log(list.toString())
console.log(list.size())
console.log(list.head())
console.log(list.tail())