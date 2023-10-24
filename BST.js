class Node {
  value = null;
  left = null;
  right = null;

  constructor(val=null, l=null, r=null) {
    this.value = val;
    this.left = l;
    this.right = r;
  }
}

class Tree {
  root = this.buildTree()

  hello() {
    return "hello world"
  }

  buildTree(arr = []) {
    // base case
    if (arr.length < 1) {
      return null;
    }
    // clean duplicates
    const cleanCopy = [...new Set(arr)];
    // sort copy of array
    cleanCopy.sort((a, b) => a - b);
    // find midpoint of array
    let mid = Math.floor(cleanCopy.length / 2);
    // set root as middle value
    const rootNode = new Node(cleanCopy[mid]);
    // if no children, return curr node
    if (cleanCopy.length <= 1) {
      return rootNode;
    };
    // set left and right children
    let left = cleanCopy.slice(0, mid);
    let right = cleanCopy.slice(mid + 1, cleanCopy.length);
    rootNode.left = this.buildTree(left);
    rootNode.right = this.buildTree(right);
    // return root node
    return rootNode;
  }

  insert(value) {
    // create a node with value
    const node = new Node(value);
    // set current node to root
    let curr = this.root;
    // insert node into appropriate place in the tree
    while (curr) {
      if (value > curr.value) {
        if (curr.right) {
          curr = curr.right;
        } else {
          curr.right = node;
          curr = null
        }
      } else if (value < curr.value) {
        if (curr.left) {
          curr = curr.left;
        } else {
          curr.left = node;
          curr = null
        }
      } else {
        return
      }
    }
    return
    // rebalance tree?
  }

  delete(value) {
    // find node with value
    // delete node from tree
    // rebalance tree?
  }

  find(value) {
    // return false if no root
    if (!this.root) {
      return null
    }
    // set current node to root
    let curr = this.root
    // traverse tree to find node
    while (curr) {
      if (value > curr.value) {
        curr = curr.right
      } else if (value < curr.value) {
        curr = curr.left
      } else {
        return curr
      }
    }
    return null
  }

  levelOrder(fn) { // set default function to return array of values
    // if root is null, return
    // enqueue root node
    // while queue has elements in it
    // act upon root node
    // enqueue left child if it exists
    // enqueue right child if it exists
    // dequeue root node
    // return
  }

  preOrder(root, fn = (node) => {
    return node.value
  }) { // set default function to return array of values
    // if root is null, return null
    if (root === null) {
      return null;
    };
    // initialize output array
    let outputArray = []
    // call fn on root
    outputArray.push(fn(root))
    // recurse left
    if (root.left) {
      outputArray = outputArray.concat(this.preOrder(root.left, fn))
    }
    // recurse right
    if (root.right) {
      outputArray = outputArray.concat(this.preOrder(root.right, fn))
    }
    return outputArray
  }

  inOrder(root, fn = (node) => {
    return node.value
  }) { // set default function to return array of values
    // if root is null, return null
    if (root === null) {
      return null;
    }
    // initialize output array
    let outputArray = [];
    // recurse left
    if (root.left) {
      outputArray = outputArray.concat(this.inOrder(root.left, fn));
    }
    // push root to array
    outputArray.push(fn(root));
    // recurse right
    if (root.right) {
      outputArray = outputArray.concat(this.inOrder(root.right, fn));
    }
    return outputArray;
  }

  postOrder(root, fn = (node) => {
    return node.value
  }) { // set default function to return array of values
    // if root is null, return null
    if (!root) {
      return null;
    }
    // initialize output array
    let outputArray = [];
    // recurse left
    if (root.left) {
      outputArray = outputArray.concat(this.postOrder(root.left, fn));
    }
    // recurse right
    if (root.right) {
      outputArray = outputArray.concat(this.postOrder(root.right, fn));
    }
    // push root to array
    outputArray.push(fn(root));
    return outputArray;
  }

  height(node) {
    // curr === node
    // while curr has children
    // curr === child
    // add to height
  }

  depth(node) {
    // curr === root
    // while curr !== node
    // curr === child
    // add to depth
  }

  isBalanced() {
    // if root is null, return true?
    // recurse down left subtree, call height on each leaf node
    // recurse down right subtree, call height on each leaf node
    // if 2 > left height - right height > -2
    // return true
    // else return false
  }

  reBalance() {
    // call inOrder() on curr tree
    // from that array, call buildTree()
  }

  prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`, false
      );
    }
    console.log(
      `${prefix}${isLeft ? "└── " : "┌── "}${node.value}`
    );
    if (node.left !== null) {
      this.prettyPrint(
        node.left,
        `${prefix}${isLeft ? "    " : "│   "}`, true
      );
    }
  };
}

function createRandomBST() {
  const arr = createRandomNumArray(20);
  const tree = new Tree;

  tree.buildTree(arr);

  if (!tree.isBalanced()) {
    tree.reBalance();
  }

  console.log("levelOrder: ", tree.levelOrder());
  console.log("preOrder: ", tree.preOrder());
  console.log("inOrder: ", tree.inOrder());
  console.log("postOrder: ", tree.postOrder());

  for (let i = 0; i < 10; i++) {
    tree.insert(Math.floor(Math.random() * 900) + 101);
  }

  while (tree.isBalanced()) {
    tree.insert(Math.floor(Math.random() * 900) + 101);
  }

  tree.reBalance();

  console.log("levelOrder: ", tree.levelOrder());
  console.log("preOrder: ", tree.preOrder());
  console.log("inOrder: ", tree.inOrder());
  console.log("postOrder: ", tree.postOrder());

  return
}

function createRandomNumArray(num) {
  arr = []
  for (let i = 0; i < num; i++) {
    arr.push(Math.floor(Math.random() * 100));
  }
  arr.sort()
  return arr
}

let test = new Tree();

test.root = test.buildTree([1, 3, 2, 4, 8, 6, 7, 5, 9, 10]);

test.prettyPrint(test.root);
// console.log(test.preOrder(test.root));
// console.log(test.inOrder(test.root));
// console.log(test.postOrder(test.root));
// console.log(test.find(3));

test.insert(20)
test.insert(13)
test.prettyPrint(test.root);

