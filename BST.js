class Node {
  data = null;
  left = null;
  right = null;
}

class Tree {
  root = buildTree()

  buildTree(arr) {
    // build balanced binary tree of nodes from arr
    // return root node
  }

  insert(value) {
    // create a node with value
    // insert node into appropriate place in the tree
    // rebalance tree
  }

  delete(value) {
    // find node with value
    // delete node from tree
    // rebalance tree
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

  preOrder(fn) { // set default function to return array of values
    // if root is null, return null
    // push root to array
    // recurse left
    // recurse right
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
      prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`, false
      );
    }
    console.log(
      `${prefix}${isLeft ? "└── " : "┌── "}${node.data}`
    );
    if (node.left !== null) {
      prettyPrint(
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
    arr.push(Math.floor(Math.random() * 1000));
  }
  arr.sort()
  return arr
}

console.log(createRandomNumArray(100));