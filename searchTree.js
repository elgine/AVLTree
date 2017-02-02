class Node{
    constructor(d){
        this.data = [d];
        this.parent = null;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree{
    constructor(){
        this._root = null;
        this.orderCallback = null;
    }

    insert(data){
        if(this._root){
            this._insert(this._root,data);
        }else{
            this._root = new Node(data);
        }
    }

    _insert(node,data){
        // New node is on the right of current node       
        if(node.data[0] < data){
            if(node.right == null){
                var newNode = new Node(data);
                node.right = newNode;
                newNode.parent = node;
            }else{
                this._insert(node.right,data);
            }
        }else if(node.data[0] > data){
            if(node.left == null){
                var newNode = new Node(data);
                node.left = newNode;
                newNode.parent = node;
            }else{
                this._insert(node.left,data);
            }
        }else{
            node.data.push(data);
        }
    }

    query(data){
        this._query(this._root,data);
    }

    _query(node,data){
        if(node == null)return null;
        
        if(node.data[0] == data){
            return node;
        }else if(node.data[0] < data){
            this._query(node.right,data);
        }else{
            this._query(node.left,data);
        }
    }

    remove(data){
        this._root = this._remove(this._root,data);
    }

    _remove(node,data){
        if(node == null)return null;
        if(node.data[0] == data){
            //todo
            if(node.left == null && node.right == null){
                node = null;
                return node;
            }
            
            if(node.left == null){
                node = node.right;
                node.right.parent = node.parent;
                return node;
            }else if(node.right == null){
                node = node.left;
                node.left.parent = node.parent;
                return node;
            }

            // Find min node
            var minNode = this._getMinNode(node.right);
            node.data = minNode.data;
            node.right = this._remove(node.right,minNode.data[0]);
            return node;
        }else if(node.data[0] < data){
            node.right = this._remove(node.right,data);
            return node;
        }else{
            node.left = this._remove(node.left,data);
            return node;
        }
    }

    _getMinNode(node){
        while(node && node.left != null){
            node = node.left;
        }
        return node;
    }

    inOrder(node){
        if(node != null){
            this.inOrder(node.left);
            if(this.orderCallback)
                this.orderCallback(node);
            this.inOrder(node.right);
        }      
    }
}

var bTree = new BinarySearchTree();
bTree.orderCallback = function(node){
    console.log(node.data[0]);
}
bTree.insert(6);
bTree.insert(3);
bTree.insert(8);
bTree.insert(1);
bTree.insert(4);
bTree.insert(9);

// bTree.inOrder(bTree.root);

bTree.remove(3);

bTree.inOrder(bTree._root);