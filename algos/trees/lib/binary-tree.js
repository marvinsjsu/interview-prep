
class BinaryTreeNode { 
  constructor(value, left = null, right = null) { 
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree { 
  constructor() { 
    this.data = [];
    this.compare = (a, b) => a - b;
    this.length = 0;
  }

  insert(value) { 
        
  }
}

module.exports = {
  BinaryTreeNode,
  BinaryTree,
};
