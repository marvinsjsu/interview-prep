/**
 * Serialize and Deserialize Binary Tree
 * 
 * Serialize a given binary tree to a file and deserialize it back to a tree. 
 * Make sure that the original and the deserialized trees are identical.
 * 
 * - Serialize: Write the tree to a file.
 * - Deserialize: Read from a file and reconstruct the tree in memory.
 * 
 * 
 */

class BinaryTreeNode { 
    constructor(value, left = null, right = null) { 
        this.value = value;
        this.left = left;
        this.right = right;
    }
}

function serialize(root) { 
    if (!root) { 
        return null;
    }

    const serializedValues = [];
    const stack = [root];

    while (stack.length) { 
        const curr = stack.pop();

        serializedValues.push(curr.value);

        if (curr.right) {
            stack.push(curr.right);
        } else { 
            serializedValues.push('NULL');
        }

        if (curr.left) {
            stack.push(curr.left);
        } else { 
            serializedValues.push('NULL');
        }
    }

    return serializedValues;
}

function deserialize(stream) { 
    if (!stream || stream.length === 0) { 
        return null;
    } 

    const root = new BinaryTreeNode(stream[0]);
    let curr = root;

    for (let i = 1; i < stream.length; i++) { 
        const currValue = stream[i];

        if (currValue !== "NULL") { 
            const newNode = new BinaryTreeNode(currValue);
            
            if (!curr.left) {
                curr.left = newNode;
                curr = curr.left;
            } else if (!curr.right) { 
                curr.right = newNode;
            }
        }
    }

    return root;
}