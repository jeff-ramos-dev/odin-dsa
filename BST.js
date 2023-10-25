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
    if (arr.length < 1) {
      return null;
    }

    const cleanCopy = [...new Set(arr)];
    cleanCopy.sort((a, b) => a - b);

    let mid = Math.floor(cleanCopy.length / 2);

    const rootNode = new Node(cleanCopy[mid]);

    if (cleanCopy.length <= 1) {
      return rootNode;
    };

    let left = cleanCopy.slice(0, mid);
    let right = cleanCopy.slice(mid + 1, cleanCopy.length);

    rootNode.left = this.buildTree(left);
    rootNode.right = this.buildTree(right);

  }

  insert(value) {
    const node = new Node(value);
    let curr = this.root;

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
  }

  delete(value) {
    let curr = this.root;
    if (!this.find(value)) {
      return;
    }

    if (this.root.value === value) {
      if (this.root.left) {
        if (this.root.right) {
          let nodeToBeAttached = this.root.right;
          this.root = this.root.left;
          curr = this.root;
          while (curr.right) {
            curr = curr.right;
          }
          curr.right = nodeToBeAttached;
        } else {
          this.root = this.root.left;
        }
      } else if (this.root.right) {
        this.root = this.root.right;
      } else {
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
      if (parent.right === curr) {
        if (!curr.left && !curr.right) {
          parent.right = null;
        } else {
          if (curr.left) {
            parent.right = curr.left;
          }
          let nodeToBeAttached = curr.right;
          curr = parent.right; 
          while (curr && curr.right) {
            curr = curr.right;
          }
          curr.right = nodeToBeAttached;
        }
      } else if (parent.left === curr) {
        if (!curr.left && !curr.right) {
          parent.left = null;
        } else {
          if (curr.right) {
            parent.left = curr.right;
          }
          let nodeToBeAttached = curr.left;
          curr = parent.left;
          while (curr && curr.left) {
            curr = curr.left;
          }
          curr.left = nodeToBeAttached;
        }
      }
    }
  }

  find(value) {
    if (!this.root) {
      return null
    }

    let curr = this.root

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

  levelOrder(root = this.root, fn = this.defaultFunction) { 
    if (!root) {
      return null;
    }

    const outputArray = [];
    const queue = [root];

    while (queue.length) {
      let curr = queue.shift();
      outputArray.push(fn(curr));

      if (curr.left) {
        queue.push(curr.left);
      }

      if (curr.right) {
        queue.push(curr.right)
      }
    }

    return outputArray;
  }

  preOrder(root = this.root, fn = this.defaultFunction) { 
    if (root === null) {
      return null;
    };

    let outputArray = []
    outputArray.push(fn(root))

    if (root.left) {
      outputArray = outputArray.concat(this.preOrder(root.left, fn))
    }

    if (root.right) {
      outputArray = outputArray.concat(this.preOrder(root.right, fn))
    }

    return outputArray
  }

  inOrder(root = this.root, fn = this.defaultFunction) { 
    if (root === null) {
      return null;
    }

    let outputArray = [];

    if (root.left) {
      outputArray = outputArray.concat(this.inOrder(root.left, fn));
    }

    outputArray.push(fn(root));

    if (root.right) {
      outputArray = outputArray.concat(this.inOrder(root.right, fn));
    }

    return outputArray;
  }

  postOrder(root = this.root, fn = this.defaultFunction) { 
    if (!root) {
      return null;
    }

    let outputArray = [];

    if (root.left) {
      outputArray = outputArray.concat(this.postOrder(root.left, fn));
    }

    if (root.right) {
      outputArray = outputArray.concat(this.postOrder(root.right, fn));
    }

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
    if (!this.find(node.value)) {
      return -1;
    }

    let curr = this.root
    let depth = 0

    while (curr !== node) {
      if (node.value < curr.value) {
        curr = curr.left;
      } else {
        curr = curr.right
      }
      depth++
    }

    return depth;
  }

  isBalanced(root = this.root) {
    if (!root) {
      return true;
    }

    const leftHeight = this.height(root.left);
    const rightHeight = this.height(root.right);

    if (Math.abs(leftHeight - rightHeight) <= 1) {
      if (this.isBalanced(root.left) && this.isBalanced(root.right)) {
        return true
      }
    } else {
      return false
    }
  }

  reBalance() {
    const inOrderArray = this.inOrder();

    this.root = this.buildTree(inOrderArray);
  }

  prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) {
      console.log('root is null')
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
  const tree = new Tree();

  tree.root = tree.buildTree(arr);

  tree.prettyPrint(tree.root);

  while (!tree.isBalanced()) {
    tree.reBalance();
  }
  console.log('tree is balanced');

  console.log("levelOrder: ", tree.levelOrder());
  console.log("preOrder: ", tree.preOrder());
  console.log("inOrder: ", tree.inOrder());
  console.log("postOrder: ", tree.postOrder());

  for (let i = 0; i < 10; i++) {
    let newNum = Math.floor(Math.random() * 900) + 101;
    console.log('inserting', newNum, 'into tree');
    tree.insert(newNum);
  }
  while (tree.isBalanced()) {
    let newNum = Math.floor(Math.random() * 900) + 101
    console.log('inserting', newNum, 'into tree');
    tree.insert(newNum);
  }

  if (!tree.isBalanced()) {
    console.log('tree is unbalanced');
    tree.prettyPrint(tree.root);
  }

  tree.reBalance();

  if (tree.isBalanced()) {
    console.log('tree is balanced');
    tree.prettyPrint(tree.root);
  }

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

createRandomBST();