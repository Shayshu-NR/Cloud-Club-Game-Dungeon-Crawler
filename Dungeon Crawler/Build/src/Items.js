
class Items {

    constructor(src_file) {
        var jsonData;
        fetch('./src/Items/' + src_file)
            .then(results => results.json())
            .then(data => jsonData = data)
            .then(data => this.itemData = data);
    }
}

class Coins {

    constructor(src_file) {
        var jsonData;
        fetch('./src/Items/' + src_file)
            .then(results => results.json())
            .then(data => jsonData = data)
            .then(data => this.itemData = data)
            .then(data => this.itemData.forEach(x => x.collected = false))
    }
}

class MerchantItems {

    constructor(src_file) {
        fetch('./src/Items/' + src_file)
            .then(results => results.json())
            .then(data => this.itemData = data)
            .then(data => this.genItems = getItemsToDisplay(this.itemData))
    }
}

class Enemies {
    constructor(src_file) {
        var jsonData;
        fetch('./src/Enemies/' + src_file)
            .then(results => results.json())
            .then(data => jsonData = data)
            .then(data => this.emeData = data)
            .then(data => this.emeData.forEach(x => x.dead = false));
    }
}
/*

Read from a json file in the items folder with name src_file

Parse the items

create attributes of the class based on src_file

*/