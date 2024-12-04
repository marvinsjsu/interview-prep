/**
 * Count Complete Tree Nodes Problem
 * 
 * Given the root of a complete binary tree, return the number of nodes in the tree. 
 * For this problem a binary tree is considered “complete” if every level besides 
 * the last level is completely filled in.
 * 
 * Use either DFS or BFS
 * - both can be done iteratively or recursively
 */

function iterativeDFS(root) { 
  let nodeCount = 0;

  const stack = [root];

  while (stack.length) { 
    const currNode = stack.pop();

    nodeCount++;

    if (currNode.right) { 
      stack.push(currNode.right);
    }

    if (currNode.left) { 
      stack.push(currNode.left);
    }
  }

  return nodeCount;
}

function recursiveDFS(root) { 
  if (!root) { 
    return 0;
  }

  return recursiveDFS(root.left) + recursiveDFS(root.right) + 1;
}
