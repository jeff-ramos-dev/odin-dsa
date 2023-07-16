class Node {
  value = null;
  left = null;
  right = null;
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
    // sort copy of array
    const copy = arr.slice();
    copy.sort((a, b) => a - b);
    // find midpoint of array
    let mid = Math.floor(copy.length / 2);
    // set root as middle value
    const rootNode = new Node();
    rootNode.value = copy[mid];
    // if no children, return curr node
    if (copy.length <= 1) {
      rootNode.left = null;
      rootNode.right = null;
      return rootNode;
    };
    // set left and right children
    let left = copy.slice(0, mid);
    let right = copy.slice(mid + 1, copy.length);
    rootNode.left = this.buildTree(left);
    rootNode.right = this.buildTree(right);
    // return root node
    return rootNode;
  }

  insert(value) {
    // create a node with value
    // insert node into appropriate place in the tree
    // rebalance tree?
  }

  delete(value) {
    // find node with value
    // delete node from tree
    // rebalance tree?
  }

  find(value) {
    // traverse tree to find node
    // return the node if it exists
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
    return node
  }) { // set default function to return array of values
    // if root is null, return null
    if (root === null) {
      return null;
    };
    // call fn on root
    console.log(fn(root).value);
    // recurse left
    if (root.left) {
      this.preOrder(root.left, fn)
    }
    // recurse right
    if (root.right) {
      this.preOrder(root.right, fn)
    }
    return // what, what do I return? lol
  }

  inOrder(fn) { // set default function to return array of values
    // if root is null, return null
    // recurse left
    // push root to array
    // recurse right
  }

  postOrder(fn) { // set default function to return array of values
    // if root is null, return null
    // recurse left
    // recurse right
    // push root to array
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
console.log(test.preOrder(test.root))