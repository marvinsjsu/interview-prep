/**
 * Depth-First Search (DFS)
 * 
 * - tree traversal in O(n) time.
 * - 3 main methods: preorder, inorder, and postorder
 * - preorder: root, left, right
 * - inorder: left, root, right
 * - postorder: left, right, root
 */

function preorderDFS(root) { 
  const output = [];
  const stack = [root];

  while (stack.length) { 
    const curr = stack.pop();
        
    output.push(curr.data);

    if (curr.right) { 
      stack.push(curr.right);
    }

    if (curr.left) { 
      stack.push(curr.left);
    }
  }

  return output;
}

