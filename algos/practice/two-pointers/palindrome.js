

function isPalindrome(str) {
  if (!str) { 
    return false;
  }

  if (str.length === 0) { 
    return true;
  }

  let ptr1 = 0;
  let ptr2 = str.length - 1;

  while (ptr1 < ptr2) { 
    if (str[ptr1] !== str[ptr2]) { 
      return false;
    }
        
    ptr1++;
    ptr2--;
  }

  return true;
}

