/**
 * Best Time to Buy and Sell Stock
 * 
 * Given an array where the element at the index i represents the price
 * of a stock on day i, find the maximum profit that you can gain by
 * buying the stock once and then selling it.
 * 
 * Questions:
 * - So the index of the input array represents the day? yes
 * - Order matters, we have to buy before we can sell, what are we returning? maximum profit
 * - Do we ever return a negative value, representing profit loss? no
 * 
 * Test-cases:
 * - [7, 1, 5, 3, 6, 4], 5
 * - [10, 8, 6, 4, 2], 0 
 * - [10, 4, 11, 1, 5], 7
 * - [7, 7, 6, 6, 6], 0 
 * - [4, 10, 5, 1, 6, 7], 6
 * - [4, 4, 4, 3, 3, 4], 1 
 * 
 * Algos:
 * - use Two-Pointer approach:
 *      - set max profit at 0
 *      - set buy index to 0
 *      - set sell index to 1
 *      - use a loop to visit each value in the input array:
 *          - compute current profit based on prices[sell] - prices[buy]
 *          - if current profit is larger than max profit, set max profit to current profit
 *          - increment sell to the next day
 * 
 * - use Two-Pointer approach with Hash Map:
 *      - use Map to store price as key and value as max profit
 *      - set max profit at 0
 *      - set buy index at 0
 *      - set sell index at 1
 *      - set third index at 2
 *      - use a loop to visit each value in the input array:
 *          - 
 * 
 * Tradeoffs:
 * - use Two-Pointer approach:
 *      - time-complexity: O(n^2)
 *      - space-complexity: O(1)
 * 
 * 
 */

function findMaxProfitBrute (prices) {
    let maxProfit = 0;
    let buyIdx = 0;

    while (buyIdx < prices.length - 1) {
        const buyPrice = prices[buyIdx];
        
        let sellIdx = buyIdx + 1;

        while (sellIdx < prices.length) {
            const sellPrice = prices[sellIdx];

            if (buyPrice > sellPrice) {
                sellIdx++;
                break;
            }

            const currProfit = sellPrice - buyPrice;
            maxProfit = Math.max(maxProfit, currProfit);
            sellIdx++;
        }

        buyIdx++;
    }

    return maxProfit;
}

const testCases = [
    [[7, 1, 5, 3, 6, 4], 5],
    [[10, 8, 6, 4, 2], 0],
    [[10, 4, 11, 1, 5], 7],
    [[7, 7, 6, 6, 6], 0],
    [[4, 10, 5, 1, 6, 7], 6],
    [[4, 4, 4, 3, 3, 4], 1],
];

testCases.forEach(([ prices, expectedOutput ]) => {
    const result = findMaxProfitBrute(prices);
    const passes = result === expectedOutput;

    console.log({ prices, expectedOutput, result, passes });
});