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
    let curr = this.root;
    // find node with value
    // if it doesn't exist, return
    if (!this.find(value)) {
      return;
    }
    // if node to be deleted is the root, parent doesn't need to be considered, so just move the root to the left or right if it exists, and then attach the other side to the bottom of the new tree
    if (this.root.value === value) {
      if (this.root.left) {
        if (this.root.right) {
          // if left and right side exist, move the root to the left side and set the right as needs to be attached
          let nodeToBeAttached = this.root.right
          this.root = this.root.left
          // find right-most node of left side
          curr = this.root
          while (curr.right) {
            curr = curr.right
          }
          // attach the right side to that node's right
          curr.right = nodeToBeAttached;
        } else {
          // if no right side, just move the root down one
          this.root = this.root.left
        }
      } else if (this.root.right) {
        // if no left side, then just move the root down one
        this.root = this.root.right
      } else {
        // if no children, set root to null
        this.root = null
      }
    } else {
      let parent = curr;
      while (curr.value !== value) {
        parent = curr;
        if (value < curr.value) {
          curr = curr.left;
        } else if (value > curr.value) {
          curr = curr.right;
        }
      }
      // found node, need to attach its children somewhere on the parent
      if (parent.right === curr) {
        // attach parent's right to the deleted node's left
        parent.right = curr.left;
        // save a reference to the deleted node's right
        let nodeToBeAttached = curr.right;
        // traverse down to the parent's right-most node
        curr = parent.right; 
        while (curr.right) {
          curr = curr.right;
        }
        // attach the deleted node's right side
        curr.right = nodeToBeAttached;
      } else {
        // attach parent's left to the deleted node's right
        parent.left = curr.right;
        // save a reference to the deleted nodes' left
        let nodeToBeAttached = curr.left;
        // traverse down to the parent's left-most node
        curr = parent.left;
        while(curr.left) {
          curr = curr.left;
        }
        // attach the deleted node's left side
        curr.left = nodeToBeAttached;
      }
    }
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

  defaultFunction = (node) => node.value;

  levelOrder(root=this.root, fn = this.defaultFunction) { // set default function to return array of values
    // if root is null, return
    if (!root) {
      return null;
    }
    const outputArray = [];
    // enqueue root node
    const queue = [root];
    // while queue has elements in it
    while (queue.length) {
      // dequeue and act upon queued node
      let curr = queue.shift();
      outputArray.push(fn(curr));
      // enqueue left child if it exists
      if (curr.left) {
        queue.push(curr.left);
      }
      // enqueue right child if it exists
      if (curr.right) {
        queue.push(curr.right)
      }
    }
    // return
    return outputArray;
  }

  preOrder(root=this.root, fn = this.defaultFunction) { // set default function to return array of values
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

  inOrder(root=this.root, fn = this.defaultFunction) { // set default function to return array of values
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

  postOrder(root=this.root, fn = this.defaultFunction) { // set default function to return array of values
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

  height(root = this.root) {
    if (!root) {
      return -1;
    }
    const leftHeight = this.height(root.left);
    const rightHeight = this.height(root.right);
    return Math.max(leftHeight, rightHeight) + 1;
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

// test.insert(20)
// test.insert(13)
// test.prettyPrint(test.root);

// test.delete(6);
// test.delete(5);
// test.delete(3);
// test.prettyPrint(test.root);

// console.log(test.levelOrder());

console.log(test.height());