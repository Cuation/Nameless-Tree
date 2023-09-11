addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#0099FF",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    upgrades: {
        11: {
            title: "Double Time",
            description: "Doubles point gain.",
            cost: new Decimal(1),
        },
        12: {
            title: "Double Time 2",
            description: "Doubles point gain again, because it's still too slow.",
            cost: new Decimal(10),
        },
        13: {
            title: "Triple Time",
            description: "Triples point gain.",
            cost: new Decimal(20),
        },
        21: {
            title: "Prestige Points Are Useful Now!",
            description: "Multiplies point gain based on Prestige Points.",
            cost: new Decimal(50),
            effect() {
                return player[this.layer].points.add(1).pow(0.5)
            },
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        22: {
            title: "Almost Time To Move On",
            description: "Halves this layer's prestige requirement.",
            cost: new Decimal(500),
        }
    },
    layerShown(){return true}
})
