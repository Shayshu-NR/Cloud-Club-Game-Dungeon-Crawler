class Items {
    
    constructor(src_file) {
        var jsonData;
        fetch('./src/Items/' + src_file).then(
            results => results.json())
            .then(data => jsonData = data)
            .then(data => this.itemData = data);
    }
}

/*
Read from a json file in the items folder with name src_file

Parse the items 

create attributes of the class based on src_file

*/