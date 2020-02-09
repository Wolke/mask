"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fetch = require('node-fetch');
let f = (cx = 0, cy = 0) => {
    let pa = [0, 0], pc = [0, 0];
    ;
    pa[0] = cx - 0.01;
    pc[0] = cx + 0.01;
    pa[1] = cy - 0.01;
    pc[1] = cy + 0.01;
    fetch('https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json')
        .then((res) => res.json())
        .then((json) => {
        // console.log(json.features[0]);
        let ary = [];
        let list = json.features;
        list.map((i) => {
            let c = i.geometry.coordinates;
            if (c[0] > pa[0]
                && c[0] < pc[0]
                &&
                    c[1] > pa[1] &&
                c[1] < pc[1]
                &&
                    i.properties.mask_adult > 0) {
                ary.push(Object.assign(Object.assign({}, i), { distance: Math.sqrt(Math.pow(c[0] - cx, 2) + Math.pow(c[1] - cy, 2)) }));
            }
        });
        ary.sort((a, b) => {
            // console.log(a)
            return (a.properties.mask_adult > b.properties.mask_adult) ? 0 : 1;
        });
        console.log(ary, ary.length);
    });
};
(() => {
    f(121.47647579, 25.0109273);
})();
// (() => {
//     MongoClient.connect(mongodb_url, async (err: MongoError, client: MongoClient) => {
//         if (err) {
//             console.log(err)
//             return;
//         }
//         console.log("success")
//         let db = client.db("test");
//         var tt: Collection = db.collection("tt");
//         let c = await tt.find({}).toArray();
//         console.log("c", c)
//         tt.updateOne({
//             id: 8461315444
//         }, {
//             $set: {
//                 name: "w",
//                 age: 40,
//                 id: 8461315444
//             }
//         }, { upsert: true },
//             (err, r) => {
//                 if (err) {
//                     console.log(err);
//                     return
//                 }
//                 console.log(`insert `)
//                 client.close()
//                 return;
//             })
//     })
// })()
//# sourceMappingURL=test.js.map