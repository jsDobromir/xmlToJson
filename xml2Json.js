const fs = require('fs');
const path = require('path');
const {v1: uuidv1} = require('uuid');
const XmlStream = require('xml-stream');

const inputXml = process.argv[2];
const outputJson = process.argv[3];

if(!inputXml || !outputJson){
    console.log('Please provide inputXml and outputJson file');
    process.exit(1);
}

const xmlReadStream = fs.createReadStream(path.resolve(__dirname, inputXml));
const xml = new XmlStream(xmlReadStream);

let output = {
    records: []
};

xml.on('endElement: record', function(item) {
    let newObj = {};
    newObj.recordId = uuidv1();
    newObj.onHand = item.allocation;
    newObj.sku = item['$']['product-id'];
    newObj.effectiveDate = new Date().toISOString();
    if(item['preorder-backorder-handling']==='none'){
        newObj.futures = [];
    }
    else
        newObj.futures = [{"quantity": item['preorder-backorder-allocation'], "expectedDate": item['in-stock-date']}];
    newObj.safetyStockCount = 0;
    output.records.push(newObj);
});

xml.on('end', function(){
    fs.writeFileSync(path.resolve(__dirname, outputJson), JSON.stringify(output, null, 4), 'utf-8');
    console.log('file converted successfully');
})