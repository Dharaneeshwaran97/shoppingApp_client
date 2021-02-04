const products = [
    { id: 1, name: "Samsung Galaxy F41", brandName: "Samsung", ram: 3, rating: 3, price: 10000 },
    { id: 2, name: "IPhone", brandName: "Apple", ram: 4.5, rating: 3, price: 50000 },
    { id: 3, name: "Realme 7i", brandName: "RealMe", ram: 4.5, rating: 3, price: 12000 }
];

//to sorting the values based on price field in array
function sorting(value1, value2) {
    if (value1.price < value2.price) {
        return -1;
    } else if (value1.price > value2.price) {
        return 1;
    } else {
        return 0;
    }
}

async function search(filters) {
    let results = products;
    console.log(filters.price);

    // if(Object.keys.length)
    var resultValues = [];
    if (Object.keys(filters).length != 0) {
        //to filter the values  based on brandName
        resultValues = products.filter(p => !filters.hasOwnProperty("brandName") || filters.brandName.length == 0 || filters.brandName.includes(p.brandName))
        // to filter the values based on ram
        resultValues = resultValues.filter(p => !filters.hasOwnProperty("ram") || filters.ram.length == 0 || filters.ram.includes(p.ram));
        // to filter the values based on price
        resultValues = resultValues.filter(r => !filters.hasOwnProperty("price") || filters.price.min <= r.price && filters.price.max >= r.price);
        //to sort the values based on price field
        resultValues.sort(sorting);
        // return the all condition matching array 
        return resultValues;
    }
    else {
        return products;
    }

    // if (!filters.hasOwnProperty("brandName")) {

    // }

    // let fileredValues = products.filter(p => !filters.hasOwnProperty("brandName") || filters.brandName.includes(p.brandName));
    // // console.table(fileredValues);
    // let ramFilered = products.filter(r => !filters.hasOwnProperty("ram") || filters.ram.includes(r.ram));
    // //todo:logic
    // // console.table(ramFilered);
    // var resultValues = products.filter(p => !filters.hasOwnProperty("brandName") || filters.brandName.includes(p.brandName)).filter(r => !filters.hasOwnProperty("ram") || filters.ram.includes(r.ram));
    // console.table(resultValues);

    // return results;
}

let filters = { brandName: ["Samsung", "Apple", "RealMe"], ram: [], price: { min: 1000, max: 60000 }, sortBy: 'price' };

// search(filters).then(function(response){

// });
search(filters).then((response) => {
    console.table(response);
});