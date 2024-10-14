
function findMinWindowSub(str1, str2) {
    const str1Length = str1.length;
    const str2Length = str2.length;

    let minSubLength = Infinity;
    let minSubsequence = "";

    let str1Idx = 0;
    let str2Idx = 0;
    
    while (str1Idx < str1Length) {
        if (str1[str1Idx] === str2[str2Idx]) {
            
            str2Idx++;

            if (str2Idx === str2Length) {
                let start = str1Idx;
                let end = str1Idx;

                str2Idx--;

                while (str2Idx >= 0) {
                    if (str1[start] === str2[str2Idx]) {
                        str2Idx--;
                    }

                    start--;
                }

                start++;

                const length = end - start + 1;

                if (length < minSubLength) {
                    minSubLength = length;
                    minSubsequence = str1.substring(start, end + 1);
                }

                str1Idx = start;
                str2Idx = 0;
            }
        }

        str1Idx++;
    }

    return minSubsequence;
}

const testCases = [
    ["abbcb", "ac", "abbc"],
    ["abcdebdde", "bde", "bcde"], 
    ["abcdebdde", "bdf", ""],
    ["abcdbebe" , "bbe", "bebe"],
    ["afgegrwgwga" , "aa", "afgegrwgwga"],
];

testCases.forEach(([str1, str2, expectedOutput]) => {
    // const result = findMinWindowSubsBrute(str1, str2);
    const result = findMinWindowSub(str1, str2);
    const passes = result === expectedOutput;

    console.log({ str1, str2, expectedOutput, result, passes });
});