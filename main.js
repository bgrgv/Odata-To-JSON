var parser = require("odata-parser");

// input here
var query = parser.parse("");

// get top level objects here
var top = query["$top"];
var filter = query["$filter"];

global.retArray = [];
odataTreeTraverse(filter);
global.retArray.forEach((e) => {
    // to maintain key : operation : value structure
    if (e.length > 2) {
        global.retArray.push(e.splice(3));
    }
});

//remove empty arrays from retArray
var result = global.retArray.filter((e) => e.length);

//final output
console.log({ top: top, filter: result });

function odataTreeTraverse(tree) {
    var tempArr = new Array();
    for (var i in tree) {
        if (!!tree[i] && typeof tree[i] == "object") {
            var temp = eval(tree[i]);
            try {
                // check if we're in a leaf node
                if (!(temp.left.name === undefined) &&
                    !(temp.right.value === undefined) &&
                    !(temp.type === undefined)
                )
                    tempArr.push(temp.left.name, temp.type, temp.right.value);
            } catch (e) {
                // ignore non-leaf nodes
            }
            // recurse
            odataTreeTraverse(tree[i]);
        }
    }
    if (tempArr.length > 0) global.retArray.push(tempArr);
}