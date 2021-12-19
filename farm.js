const getYieldForPlant = (vegetable, environment) => {
    if (environment) {
        let index = 1;
        if (environment.sun) {
            if (vegetable.factor.sun) {
                index = index * (1 + vegetable.factor.sun[environment.sun] / 100);
            }
        }
        if (environment.wind) {
            if (vegetable.factor.wind) {
                index = index * (1 + vegetable.factor.wind[environment.wind] / 100);
            }
        }

        if (environment.temp) {
            if (vegetable.factor.temp) {
                index = index * (1 + vegetable.factor.temp[environment.temp] / 100);
            }
        }

        return vegetable.yield * index;
    } else return vegetable.yield;
};

const getYieldForCrop = (input, environment) => {
    if (environment) {
        let index = 1;
        if (environment.sun) {
            if (input.crop.factor.sun) {
                const percentageSun = input.crop.factor.sun[environment.sun];
                index = index * (1 + percentageSun / 100);
            }
        }
        if (environment.wind) {
            if (input.crop.factor.wind) {
                const percentageWind = input.crop.factor.wind[environment.wind];
                index = index * (1 + percentageWind / 100);
            }
        }
        if (environment.temp) {
            if (input.crop.factor.temp) {
                const percentageTemp = input.crop.factor.temp[environment.temp];
                index = index * (1 + percentageTemp / 100);
            }
        }
        return input.numCrops * input.crop.yield * index;
    } else return input.numCrops * input.crop.yield;
};

const getTotalYield = (object_veg, environment) => {
    let sum = 0;
    let i = 0;

    for (i = 0; i < object_veg.crops.length; i++) {
        if (environment) {
            let index = 1;
            if (environment.sun) {
                const valueSun = environment.sun;

                if (object_veg.crops[i].crop.factor.sun) {
                    const percentageSun = object_veg.crops[i].crop.factor.sun[valueSun];

                    index = index * (1 + percentageSun / 100);
                }
            }
            if (environment.wind) {
                const valueWind = environment.wind;
                if (object_veg.crops[i].crop.factor.wind) {
                    const percentageWind = object_veg.crops[i].crop.factor.wind[valueWind];

                    index = index * (1 + percentageWind / 100);
                }
            }
            if (environment.temp) {
                const valueTemp = environment.temp;
                if (object_veg.crops[i].crop.factor.temp) {
                    const percentageTemp = object_veg.crops[i].crop.factor.temp[valueTemp];

                    index = index * (1 + percentageTemp / 100);
                }
            }

            sum +=
                object_veg.crops[i].crop.yield *
                index *
                object_veg.crops[i].numCrops;
        }
    }
    return sum;
};

const getCostsForCrop = (input) => {
    return input.numCrops * input.crop.cost;
};

const getRevenueForCrop = (input, environment) => {
    if (environment) {
        let index = 1;
        if (environment.sun) {
            const valueSun = environment.sun;
            if (input.crop.factor.sun) {
                const percentageSun = input.crop.factor.sun[valueSun];
                index = index * (1 + percentageSun / 100);
            }
        }
        if (environment.wind) {
            const valueWind = environment.wind;
            if (input.crop.factor.wind) {
                const percentageWind = input.crop.factor.wind[valueWind];
                index = index * (1 + percentageWind / 100);
            }
        }
        if (environment.temp) {
            const valueTemp = environment.temp;
            if (input.crop.factor.temp) {
                const percentageTemp = input.crop.factor.temp[valueTemp];
                index = index * (1 + percentageTemp / 100);
            }
        }
        return input.numCrops * input.crop.yield * index * input.price;
    } else return input.numCrops * input.crop.yield;
};

const getProfitForCrop = (input, environment) => {
    return getRevenueForCrop(input, environment) - getCostsForCrop(input);
};

const getTotalProfit = (object_veg, environment) => {
    let sum = 0;
    let i = 0;
    for (i = 0; i < object_veg.crops.length; i++) {
        if (environment) {
            let index = 1;
            if (environment.sun) {
                const valueSun = environment.sun;

                if (object_veg.crops[i].crop.factor.sun) {
                    const percentageSun = object_veg.crops[i].crop.factor.sun[valueSun];

                    index = index * (1 + percentageSun / 100);
                }
            }
            if (environment.wind) {
                const valueWind = environment.wind;
                if (object_veg.crops[i].crop.factor.wind) {
                    const percentageWind = object_veg.crops[i].crop.factor.wind[valueWind];

                    index = index * (1 + percentageWind / 100);
                }
            }
            if (environment.temp) {
                const valueTemp = environment.temp;
                if (object_veg.crops[i].crop.factor.temp) {
                    const percentageTemp = object_veg.crops[i].crop.factor.temp[valueTemp];

                    index = index * (1 + percentageTemp / 100);
                }

                sum +=
                    object_veg.crops[i].crop.yield *
                    index *
                    object_veg.crops[i].numCrops *
                    object_veg.crops[i].price -
                    object_veg.crops[i].numCrops * object_veg.crops[i].crop.cost;
            }
        }
    }
    return sum;
};

module.exports = {
    getYieldForPlant,
    getYieldForCrop,
    getTotalYield,
    getCostsForCrop,
    getRevenueForCrop,
    getProfitForCrop,
    getTotalProfit,
};