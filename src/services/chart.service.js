
export const chartService={
getAveragePricePerLabel,
getInStockPercentByLabel
}

function getAveragePricePerLabel(toys) {
    const totalPricesByLabel = toys.reduce((labelData, toy) => {
        if (toy.labels.length) {
            toy.labels.forEach(label => {
                if (labelData[label]) labelData[label].price += toy.price
                if (!labelData[label]) labelData[label] = {
                    count: 0,
                    price: toy.price
                }
                labelData[label].count++
            })
        }
        return labelData
    }, {})

    const avgPricePerLabel = []
    for (const label in totalPricesByLabel) {
        avgPricePerLabel.push(totalPricesByLabel[label].price / totalPricesByLabel[label].count)
    }
    const res = {
        labels: Object.keys(totalPricesByLabel),
        values: avgPricePerLabel
    }
    return res
}

function getToysByLabel(toys) {
    const toysByLabel = toys.reduce((acc, toy) => {
        if (toy.labels.length) {
            toy.labels.forEach(label => {
                if (!acc[label]) acc[label] = []
                acc[label].push(toy)
            })
        }
        return acc
    }, {})
    return toysByLabel
}

function getInStockPercentByLabel(toys) {
    const toysByLabel = getToysByLabel(toys)
    const inStockPercentages = []
    for (const label in toysByLabel) {
        const totalLength = toysByLabel[label].length
        const inStockLength = toysByLabel[label].filter(toy => toy.inStock).length
        const percentage = ((inStockLength / totalLength) * 100)
        inStockPercentages.push({percentage: +percentage, label})
    }
    return inStockPercentages
}
