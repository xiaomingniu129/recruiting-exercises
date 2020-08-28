/** 
 * InventoryAllocator is class that compute the best way an order of shipments given inventory distribution. 
 */
class InventoryAllocator {
    /**
     * Constructor of InventoryAllocator.
     * @param {Map<string, number>} orderItemMap 
     * @param {Array<object>} warehouseArr 
     */
    constructor(orderItemMap, warehouseArr) {
        /** @private A map of items that are being ordered and how many of them are ordered */
        this.orderItemMap_ = orderItemMap;
        /** @private A list of object with warehouse name and inventory amounts */
        this.warehouseArr_ = warehouseArr;
    }
    /**
     * Operates on an instance of InventoryAllocator and returns the best way of an order of shipments.
     * @return {Array<Map>} Return an array of the best way of shippments.
     */
    allocate() {
        /** Map<string, Map<string, number>> */
        let allocationMap = new Map();
        /** Map<string, number> */ 
        let orderItemMap = this.orderItemMap_;
        /** Array<object> */ 
        let warehouseArr = this.warehouseArr_;
        /** Array<Map<string, Map<string, number>>> */
        let allocationArr = [];

        // check if the order can be completely shipped from one warehouse
        let canShipByOne = false;
        for (let warehouse of warehouseArr) {
            let name = warehouse.name;
            let inventoryMap = warehouse.inventory;
            canShipByOne = this.checkCanShipByOne(inventoryMap, orderItemMap);

            if (canShipByOne) {
                allocationArr.push(new Map([[name, new Map()]]));
                orderItemMap.forEach((amount, item) => {
                    allocationArr[0].get(name).set(item, amount);
                })
                break;
            }
        }
        if (!canShipByOne) {
            warehouseArr.forEach(warehouse => {
                let name = warehouse.name;
                let inventoryMap = warehouse.inventory;
                if (!allocationMap.has(name)) {
                    allocationMap.set(name, new Map());
                }
                
                inventoryMap.forEach((amount, item) => {
                    if (orderItemMap.has(item) && orderItemMap.get(item) != 0) { // check if the current item needs more shippment
                        if (!allocationMap.get(name).has(item)) {
                            allocationMap.get(name).set(item, 0);
                        }
            
                        let curAmount = allocationMap.get(name).get(item); // amount of current item has set to be shipped
                        if (amount >= orderItemMap.get(item)) { // current warehouse supply is great than or equal to need
                            allocationMap.get(name).set(item, curAmount + orderItemMap.get(item));
                            amount -= orderItemMap.get(item);
                            orderItemMap.set(item, 0);
                        } else { // current warehouse supply is less than need
                            allocationMap.get(name).set(item, curAmount + amount);
                            orderItemMap.set(item, orderItemMap.get(item) - amount);
                            amount = 0;
                        }
                    }
                }); 
            });
            // check if there is enough inventory
            let isEnough = true; 
            orderItemMap.forEach(amount => {
                if (amount != 0) {
                    isEnough = false;
                }
            });
            allocationArr = isEnough ? this.getAllocationArr(allocationMap) : [];
        }

        return allocationArr;
    }

    /**
     * Check if an order can be completely shipped from one warehouse.
     * @param {Map<string, number>} inventoryMap 
     * @param {Map<string, number>} orderItemMap 
     */
    checkCanShipByOne(inventoryMap, orderItemMap) {
        let canShipByOne = true;
        orderItemMap.forEach((amount, item) => {
            if (!inventoryMap.has(item) || inventoryMap.get(item) < amount) {
                canShipByOne = false;
            }
        });
        return canShipByOne;
    }

    /**
     * Create an array of shippments and sort it by the warehouse's name in alphabetical order.
     * @param {Map<string, Map<string, number>>} allocationMap 
     * @return {Array<Map<string, Map<string, number>>>} Return an array of shippments, which is sorted by the warehouse's name in alphabetical order.
     */
    getAllocationArr(allocationMap) {
        let keys = [];
        let allocationArr = [];
        allocationMap.forEach((value, key, map) => {
            if (value.size != 0) {
                keys.push(key);
            }
        });
        keys.sort();
        keys.forEach(key => {
            allocationArr.push(new Map([[key, allocationMap.get(key)]]));
        });
        return allocationArr;
    }
}

module.exports = InventoryAllocator;