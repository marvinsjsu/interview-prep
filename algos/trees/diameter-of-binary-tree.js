/**
 * Diameter of Binary Tree
 * 
 * Given a binary tree, you need to compute the length of the tree’s diameter.
 * The diameter of a binary tree is the length of the longest path between any
 * two nodes in a tree. This path may or may not pass through the root.
 */

function findDiameterOfBinaryTree(root) { 
  if (!root) { 
    return 0;
  }

  const [height, diameter] = findHeight(root);

  return diameter;
}

function findHeight(root) { 
  if (!node) { 
    return [0, 0];
  }

  const [leftHeight, leftDiameter] = findHeight(root.left);
  const [rightHeight, rightDiameter] = findHeight(root.right);

  const height = Math.max(leftHeight, rightHeight) + 1;
  const diameter = Math.max(leftDiameter, rightDiameter, leftHeight + rightHeight);

  return [height, diameter];
}