class Node{
    constructor(d){
        this.data = [d];
        this.parent = null;
        this.left = null;
        this.right = null;
        this.depth = 0;
    }
}

class AVLTree{

    constructor(){
        this._root = null;
        this.orderCallback = null;
    }

    insert(data){
        if(this._root){
            this._root = this._insert(this._root,data);
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
                node.right = this._insert(node.right,data);
                if(this.getDepth(node.right) - this.getDepth(node.left) > 1){
                    if(this.getDepth(node.right.left) > this.getDepth(node.right.right)){
                        node.right = this._rotateLL(node.right);
                    }

                    node = this._rotateRR(node);
                }
            }
        }else if(node.data[0] > data){
            if(node.left == null){
                var newNode = new Node(data);
                node.left = newNode;
                newNode.parent = node;
            }else{
                node.left = this._insert(node.left,data);
                if(this.getDepth(node.left) - this.getDepth(node.right) > 1){
                    if(this.getDepth(node.left.left) < this.getDepth(node.left.right)){
                        node.left = this._rotateRR(node.left);
                    }
                    node = this._rotateLL(node);
                }
            }
        }else{
            node.data.push(data);
        }

        node.depth = Math.max(this.getDepth(node.left),this.getDepth(node.right)) + 1;
        return node;
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
                node.right.parent = node.parent;
                node = node.right;              
                return node;
            }else if(node.right == null){
                node.left.parent = node.parent;
                node = node.left;                
                return node;
            }

            // Find min node
            var minNode = this._getMinNode(node.right);
            node.data = minNode.data;
            node.right = this._remove(node.right,minNode.data[0]);

            return node;
        }else if(node.data[0] < data){
            node.right = this._remove(node.right,data);
            if(this.getDepth(node.left) - this.getDepth(node.right) > 1){
                if(this.getDepth(node.left.left) < this.getDepth(node.left.right)){
                    node.left = this._rotateRR(node.left);
                }
                node = this._rotateLL(node);
            }
            return node;
        }else{
            node.left = this._remove(node.left,data);
             //Balance
            if(this.getDepth(node.right) - this.getDepth(node.left) > 1){
                if(this.getDepth(node.right.left) > this.getDepth(node.right.right)){
                    node.right = this._rotateLL(node.right);
                }

                node = this._rotateRR(node);
            }
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

    _rotateLL(node){
        var k2 = node,
            tmp = k2,
            k1 = k2.left;
        k2.left = k1.right;
        k1.right = k2;

        k2.depth = Math.max(this.getDepth(k2.left),this.getDepth(k2.right)) + 1;
        k1.depth = Math.max(this.getDepth(k1.left),this.getDepth(k2)) + 1;

        k2 = k1;
        k1 = tmp;
        return k2;
    }

    _rotateRR(node){
        var k2 = node,
            tmp = k2,
            k1 = k2.right;
        k2.right = k1.left;
        k1.left = k2;
        k2.depth = Math.max(this.getDepth(k2.left),this.getDepth(k2.right)) + 1;
        k1.depth = Math.max(this.getDepth(k1.right),this.getDepth(k2)) + 1;
        k2 = k1;
        k1 = tmp;
        return k2;
    }

    getDepth(node){
        if(node!=null)
            return node.depth;
        return -1;
    }

    get root(){
        return this._root;
    }
}

var bTree = new AVLTree();
bTree.orderCallback = function(node){
    console.log(node.data[0] + ", depth: "+node.depth);
}

// for(var i = 0;i < 2000;i++){
//     bTree.insert(Math.random()*2000);
// }
bTree.insert(1);
bTree.insert(2);
bTree.insert(3);
bTree.insert(4);
bTree.insert(5);
bTree.insert(6);
bTree.insert(7);
bTree.insert(8);
bTree.insert(9);
bTree.insert(10);

bTree.inOrder(bTree.root);
console.log(bTree.root.depth);
bTree.remove(8);

bTree.inOrder(bTree.root);
console.log(bTree.root.depth);
// console.log(bTree.root.depth);