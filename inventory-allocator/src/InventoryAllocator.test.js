/**
 * Unit Test for InventoryAllocator.js
 */
const InventoryAllocator = require('./InventoryAllocator');

test('InventoryAllocator class should exists.', () => {
    expect(InventoryAllocator).toBeDefined();
});

test('Order should not be shipped because there is not enough inventory.', () => {
    const orderItemMap = new Map([['apple', 5]]);
    const warehouseArr = [{ name: 'owd', inventory: new Map([['apple', 2]]) }];
    const inventoryAllocator = new InventoryAllocator(orderItemMap, warehouseArr);
    const allocationArr = inventoryAllocator.allocate();
    const expectedArr = [];
    expect(allocationArr).toEqual(expectedArr);
});

test('Order should be shipped when there is one item in the order.', () => {
    const orderItemMap = new Map([['apple', 5]]);
    const warehouseArr = [{ name: 'owd', inventory: new Map([['apple', 2]]) },
                          { name: 'dm', inventory: new Map([['apple', 4]]) }];
    const inventoryAllocator = new InventoryAllocator(orderItemMap, warehouseArr);
    const allocationArr = inventoryAllocator.allocate();
    const expectedArr = [
        new Map([['dm',
            new Map([
                ['apple', 3]
            ])
        ]]),
        new Map([['owd',
            new Map([
                ['apple', 2]
            ])
        ]])
    ];
    expect(allocationArr).toEqual(expectedArr);
});

test('Order should be shipped when there are multiple items in the order.', () => {
    const orderItemMap = new Map([['apple', 5], ['orange', 5]]);
    const warehouseArr = [{ name: 'owd', inventory: new Map([['apple', 5]]) },
                          { name: 'dm', inventory: new Map([['orange', 5]]) }];
    const inventoryAllocator = new InventoryAllocator(orderItemMap, warehouseArr);
    const allocationArr = inventoryAllocator.allocate();
    const expectedArr = [
        new Map([['dm',
            new Map([
                ['orange', 5]
            ])
        ]]),
        new Map([['owd',
            new Map([
                ['apple', 5]
            ])
        ]])
    ];
    expect(allocationArr).toEqual(expectedArr);
});

test('Order should be shipped when using one warehouse.', () => {
    const orderItemMap = new Map([['apple', 1]]);
    const warehouseArr = [{ name: 'owd', inventory: new Map([['apple', 1]]) }];
    const inventoryAllocator = new InventoryAllocator(orderItemMap, warehouseArr);
    const allocationArr = inventoryAllocator.allocate();
    const expectedArr = [
        new Map([['owd',
            new Map([
                ['apple', 1]
            ])
        ]])
    ];
    expect(allocationArr).toEqual(expectedArr);
});

test('Order should be shipped when using multiple warehouses.', () => {
    const orderItemMap = new Map([['apple', 10]]);
    const warehouseArr = [{ name: 'owd', inventory: new Map([['apple', 5]]) },
                          { name: 'dm', inventory: new Map([['apple', 5]]) }];
    const inventoryAllocator = new InventoryAllocator(orderItemMap, warehouseArr);
    const allocationArr = inventoryAllocator.allocate();
    const expectedArr = [
        new Map([['dm',
            new Map([
                ['apple', 5]
            ])
        ]]),
        new Map([['owd',
            new Map([
                ['apple', 5]
            ])
        ]])
    ];
    expect(allocationArr).toEqual(expectedArr);
});

test('Order should be shipped from one warehouse (if possible) instead of being shipped from multiple warehouses because the former one is cheaper.', () => {
    const orderItemMap = new Map([['apple', 5], ['orange', 10]]);
    const warehouseArr = [{ name: 'owd', inventory: new Map([['apple', 5], ['orange', 5]]) },
                          { name: 'dm', inventory: new Map([['apple', 5], ['orange', 10]]) }];
    const inventoryAllocator = new InventoryAllocator(orderItemMap, warehouseArr);
    const allocationArr = inventoryAllocator.allocate();
    const expectedArr = [
        new Map([['dm',
            new Map([
                ['apple', 5],
                ['orange', 10]
            ])
        ]])
    ];
    expect(allocationArr).toEqual(expectedArr);
});