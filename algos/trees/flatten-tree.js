/**
 * Flatten Binary Tree to Linked List
 * 
 * Given the root of a binary tree, the task is to flatten the tree into a
 * linked list using the same TreeNode class. The left child pointer of
 * each node in the linked list should always be NULL, and the right
 * child pointer should point to the next node in the linked list.
 * The nodes in the linked list should be in the same order as
 * that of the preorder traversal of the given binary tree.
 */


// Time-complexity: O(n)
// Space-complexity: O(1)
function flattenTreeOptimal(root) { 
  if (!root) { 
    return;
  }

  let curr = root;

  while (curr) { 

    // if there's a left child, let's look at its children
    if (curr.left) {

      // last is the left child of current node
      let last = curr.left;

      // go to the right-most child of last
      // find the right-most leaf node
      while (last.right) { 
        last = last.right;
      }

      // point the right-most leaf node to the
      // current node's right child
      last.right = curr.right;

      // point the current node's right pointer
      // to the current node's left child
      curr.right = curr.left;

      // set the current node's left pointer to null
      curr.left = null;
    }

    // move on to the next right child
    curr = curr.right;
  }

  return root;
}

// Time-complexity: O(n)
// Space-complexity: O(log n) for balanced binary tree, O(n) for skewed tree
function flattenTree(root) { 
  if (!root) { 
    return;
  }

  const dummy = new Node();

  let linkedNodePtr = dummy;

  const stack = [root];

  while (stack.length) { 
    const curr = stack.pop();
    const newNode = new Node(curr.data);

    linkedNodePtr.right = newNode;
    linkedNodePtr = linkedNodePtr.right;

    if (curr.right) { 
      stack.push(curr.right);
    }

    if (curr.left) { 
      stack.push(curr.left);
    }
  }

  return dummy.right;
}