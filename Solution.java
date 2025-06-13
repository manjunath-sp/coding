import java.util.PriorityQueue;
import java.util.Collections;

class Solution {

  public int solution(int[] A) {
    // Use a long for the balance to prevent potential integer overflow, given the constraints.
    long currentBalance = 0;
    int relocations = 0;

    // A max-priority queue to store the absolute values of expenses encountered so far.
    // We use Collections.reverseOrder() to make the PriorityQueue function as a max-heap.
    PriorityQueue<Integer> pastExpenses = new PriorityQueue<>(Collections.reverseOrder());

    // Iterate through each transaction in the given array.
    for (int transaction : A) {
      // Add the current transaction to the running balance.
      currentBalance += transaction;

      // If the transaction is an expense (a negative number),
      // add its absolute value to our max-heap of past expenses.
      if (transaction < 0) {
        pastExpenses.add(-transaction);
      }

      // If the balance drops below zero, we must relocate an expense.
      while (currentBalance < 0) {
        // The problem guarantees the total sum is non-negative,
        // so the priority queue will not be empty when the balance is negative.

        // To correct the balance with the minimum number of moves,
        // we greedily choose the largest expense encountered so far.
        int largestExpenseToMove = pastExpenses.poll();

        // "Move" the expense by adding its value back to the balance.
        currentBalance += largestExpenseToMove;

        // Increment the count of relocations.
        relocations++;
      }
    }

    return relocations;
  }


  public static void main(String[] args) {
    Solution sol = new Solution();

    System.out.println(sol.solution(new int[]{10, -10, -1, 1, 10})); // Expected: 1
    System.out.println(sol.solution(new int[]{-1, -1, -1, 1, 1, 1, 1})); // Expected: 3
    System.out.println(sol.solution(new int[]{5, -2, -3, 1})); // Expected: 0
  }
}
