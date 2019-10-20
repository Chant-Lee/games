class ProductMap {
    constructor(n, game) {
        this.n = n
        this.map = []
    }
    init() {
        this.productMap(this.n)
        while (!this.judgeCanRemoveByOneStep(this.map)) {
            this.productMap(this.n)
        }
    }
    productMap(n) {
        for (let y = 0; y < n; y++) {
            for (let x = 0; x < n; x++) {
                let value = this.random()
                if (!this.map[y]) {
                    this.map[y] = []
                }
                //  x方向判断有没有连续两个同色
                if (x > 1 && this.judgeSameColor(this.map[y], value)) {
                    value = this.getExceptRandom(value)
                }
                if (
                    y > 1 &&
                    this.judgeSameColor(this.getTwoArrColumnByIndex(this.map, y), value)
                ) {
                    value = this.getExceptRandom(value)
                }
                this.map[y].push(value)
            }
        }
    }
    /**
     * 判断是否是死图
     * @param  map 
     */
    judgeCanRemoveByOneStep(map) {
        const resultStep = []
        let len = map.length
        for (let y = 0; y < len; y++) {
            for (let x = 0; x < len; x++) {
                const currentValue = map[y][x]
                // 考虑横轴方向
                if (x + 1 < len) {
                    // 第一种情况
                    if (map[y][x] === map[y][x + 1]) {

                        if (x - 2 >= 0) {
                            if (map[y][x - 2] === currentValue) {
                                resultStep.push({ y, x })
                                resultStep.push({ y, x: x + 1 })
                                resultStep.push({ y, x: x - 2 })
                                return resultStep
                            }
                        }
                        if (x - 1 >= 0 && y - 1 >= 0 && map[y - 1][x - 1] === currentValue) {
                            resultStep.push({ y, x })
                            resultStep.push({ y, x: x + 1 })
                            resultStep.push({ y: y - 1, x: x - 1 })
                            return resultStep
                        }
                        if (x + 2 < len && y - 1 > 0 && map[y - 1][x + 2] === currentValue) {
                            resultStep.push({ y, x })
                            resultStep.push({ y, x: x + 1 })
                            resultStep.push({ y: y - 1, x: x + 2 })
                            return resultStep
                        }
                        if (x + 3 < len && map[y][x + 3] === currentValue) {
                            resultStep.push({ y, x })
                            resultStep.push({ y, x: x + 1 })
                            resultStep.push({ y, x: x + 3 })
                            return resultStep
                        }
                        if (x + 2 < len && y + 1 < len && map[y + 1][x + 2] === currentValue) {
                            resultStep.push({ y, x })
                            resultStep.push({ y, x: x + 1 })
                            resultStep.push({ y: y + 1, x: x + 2 })
                            return resultStep

                        }
                        if (x - 1 > 0 && y + 1 < len && map[y + 1][x - 1] === currentValue) {
                            resultStep.push({ y, x })
                            resultStep.push({ y, x: x + 1 })
                            resultStep.push({ y: y + 1, x: x - 1 })
                            return resultStep
                        }
                    }
                }
                // 纵向
                if (y + 1 < len) {
                    if (map[y + 1][x] === currentValue) {
                        if (y - 2 >= 0 && map[y - 2][x] === currentValue) {
                            resultStep.push({ y, x })
                            resultStep.push({ y: y + 1, x })
                            resultStep.push({ y: y - 2, x })
                            return resultStep
                        }
                        if (x + 1 < len && y - 1 > 0 && map[y - 1][x + 1] === currentValue) {
                            resultStep.push({ y, x })
                            resultStep.push({ y: y - 1, x })
                            resultStep.push({ y: y - 1, x: x + 1 })
                            return resultStep
                        }
                        if (x + 1 < len && y + 2 < len && map[y + 2][x + 1] === currentValue) {
                            resultStep.push({ y, x })
                            resultStep.push({ y: y + 1, x })
                            resultStep.push({ y: y + 2, x: x + 1 })
                            return resultStep
                        }
                        if (y + 3 < len && map[y + 3][x] === currentValue) {
                            resultStep.push({ y, x })
                            resultStep.push({ y: y + 1, x })
                            resultStep.push({ y: y + 3, x: x })
                            return resultStep
                        }
                        if (x - 1 >= 0 && y + 2 < len && map[y + 2][x - 1] === currentValue) {
                            resultStep.push({ y, x })
                            resultStep.push({ y: y + 1, x })
                            resultStep.push({ y: y + 2, x: x - 1 })
                            return resultStep
                        }
                        if (x - 1 >= 0 && y - 1 >= 0 && map[y + 11][x - 1] === currentValue) {
                            resultStep.push({ y, x })
                            resultStep.push({ y: y + 1, x })
                            resultStep.push({ y: y - 1, x: x - 1 })
                            return resultStep
                        }
                    }
                }
            }
        }
    }
    // 判断是否是一样的值
    judgeSameColor(arr, value) {
        return arr.find(
            (item, index) =>
                arr[index - 1] && item === value && arr[index - 1] === value
        )
    }
    /**
   * 获取二维数组某一列的值
   * @param {Array} arr
   * @param {number} n
   */
    getTwoArrColumnByIndex(arr, n) {
        return arr.map(item => item[n])
    }
    /**
     * 获取其他的值
     * @param exceptNum 
     */
    getExceptRandom(exceptNum) {
        let value = this.random()
        while (value === exceptNum) {
            value = this.random()
        }
        return value
    }

    random() {
        return parseInt(Math.random() * 5 + 1)
    }
}

Window.ProductMap = ProductMap

