export class LinkedList {
    constructor() {
        this.headNode = null;
    }

    append(value) {
        //add new node to end of list
        if (this.headNode === null) {
            this.headNode = new Node(value);
        } else {
            findEndToAppend(this.headNode);
        }

        function findEndToAppend(node) {
            if (node.nextNode === null) {
                node.nextNode = new Node(value);
                return;
            }
            findEndToAppend(node.nextNode);
        }
    }

    prepend(value) {
        //new node containing value to start of list
        this.headNode = new Node(value, this.headNode);
    }

    size() {
        //total number of nodes in list
        return findIndexTotal(this.headNode, 0);

        function findIndexTotal(node, index) {
            index += 1;
            if (node.nextNode === null) {
                return index;
            }
            return findIndexTotal(node.nextNode, index);
        }
    }

    head() {
        //return value of first node
        return this.headNode.value;
    }

    tail() {
        //return the value of the final node
        return getFinalNode(this.headNode);

        function getFinalNode(node) {
            if (node.nextNode === null) {
                return node.value;
            }
            return getFinalNode(node.nextNode);
        }
    }

    at(index) {
        //value at index. Return undefined if no node at index.
        return getValueAtIndex(this.headNode, 0);

        function getValueAtIndex(node, curIndex) {
            if (curIndex === index) {
                return node.value;
            }
            if (node.nextNode === null) {
                return undefined;
            }

            return getValueAtIndex(node.nextNode, (curIndex += 1));
        }
    }

    pop() {
        //remove the head node from the list and return it's value. Undefined on empty.
        if (this.headNode === null) {
            return undefined
        }
        
        const poppedValue = this.headNode.value;
        this.headNode = this.headNode.nextNode;
        return poppedValue;
    }

    contains(value) {
        return checkforValue(this.headNode);
        function checkforValue(node) {
            if (node.value === value) {
                return true;
            }
            if (node.value !== value && node.nextNode === null) {
                return false;
            }
            return checkforValue(node.nextNode);
        }
    }

    findIndex(value) {
        //return the index of the node with the given value. Return -1 if none.
        return getIndexFromNode(this.headNode, 0);
        
        function getIndexFromNode(node, index) {
            if (node.value === value) {
                return index;
            }
            if (node.value !== value && node.nextNode === null) {
                return -1;
            }
            index += 1;
            return getIndexFromNode(node.nextNode, index);
        }
    }

    toString() {
        //represents your linked list as a string
        return getNodeStr(this.headNode, "");

        function getNodeStr(node, nodeString) {
            if (node.nextNode === null) {
                const currentNodeString = nodeString + `(${node.value})`;
                return currentNodeString;
            }
            const currentNodeString = nodeString + `(${node.value}) -> `;
            return getNodeStr(node.nextNode, currentNodeString);
        }
    }

    //EXTRA CREDIT
    insertAt(index, ...values) {
        //if index too low throw error
        if (index < 0) {
            throw new RangeError("index must be 0 or above");
        }

        if (index === 0) {
            // if index is 0 then create a new headNode before loop through remaing values
            const endChainNode = this.headNode;
            const valuesArr = [...values];
            this.headNode = new Node(valuesArr.shift());
            insertionTool(this.headNode, endChainNode, valuesArr);
            return;
        }

        insertAtNode(this.headNode, 0);

        function insertAtNode(node, curIndex) {
            if (node === null) {
                throw new RangeError("index is too large");
            }
            if (curIndex === index - 1) {
                const endChainNode = node.nextNode;
                insertionTool(node, endChainNode, [...values]);
                return;
            }
            curIndex += 1;
            insertAtNode(node.nextNode, curIndex);
        }

        function insertionTool(startingNode, endChainNode, values) {
            const newNode = new Node(values.shift());
            startingNode.nextNode = newNode;

            if (values.length === 0) {
                newNode.nextNode = endChainNode;
                return;
            }

            insertionTool(newNode, endChainNode, values);
        }
    }

    removeAt(index) {
        //remove node at index

        //if index too low throw error
        if (index < 0) {
            throw new RangeError("index must be 0 or above");
        }

        //if the index is 0 then replace this.headNode with it's nextNode
        if (index === 0) {
            this.headNode = this.headNode.nextNode;
            return;
        }

        //else recursively loop through each node
        removeNodeAtIndex(this.headNode, 0);

        function removeNodeAtIndex(node, curIndex) {
            //if reached a node that's null then no index has been found, throw error
            if (node === null) {
                throw new RangeError("index is too large");
            }
            //find the index before the one you want to remove, and then link it with the next node in the chain (if end of chain this will be null)
            if (curIndex === index - 1) {
                //remove the child of this node
                node.nextNode = node.nextNode.nextNode;
                return;
            }
            curIndex += 1;
            removeNodeAtIndex(node.nextNode, curIndex);
        }
    }
}

class Node {
    constructor(value = null, nextNode = null) {
        this.value = value;
        this.nextNode = nextNode;
    }
}
