# Assumption
1. Assume in the second input, inventory is a map since it has the same structure as the first input, which is declared as a map in the problem.
    Input: { apple: 1 }, [{ name: owd, inventory: { apple: 1 } }]

2. According to the output of the second example, the output array should be sorted by the warehouse's name in alphabetical order.
    Input: { apple: 10 }, [{ name: owd, inventory: { apple: 5 } }, { name: dm, inventory: { apple: 5 }}]
    Output: [{ dm: { apple: 5 }}, { owd: { apple: 5 } }]

# Test
### `npm test`
    Launches the test runner.