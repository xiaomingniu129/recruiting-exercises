# Assumption
#### 1. For the second input, assume that inventory is a map since it has the same structure as the first input, which is declared as a map in the problem.</br>
    Input: { apple: 1 }, [{ name: owd, inventory: { apple: 1 } }]

#### 2. Assume that the output array should be sorted by the warehouse's name in alphabetical order according to the second example's output.</br>
    Input: { apple: 10 }, [{ name: owd, inventory: { apple: 5 } }, { name: dm, inventory: { apple: 5 }}]</br>
    Output: [{ dm: { apple: 5 }}, { owd: { apple: 5 } }]

# Test
In the src directory, you can run:
#### `npm test`
    Launches the test runner.
