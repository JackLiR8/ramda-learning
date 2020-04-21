/**
 * @file
 * 
 * 1. gt/gte
 * 2. lt/lte
 * 3. equals
 * 4. eqBy
 * 5. pathEq
 * 6. propEq
 */

// ================= gt/gte ================
// gt(a, b): a > b 时返回true, 否则返回false
// gte(a, b): a >= b 时返回true, 否则返回false

let gt1 = R.gt(2)(1)  // true
let gt2 = R.gt(2, 2)  // false
let gt3 = R.gte(2, 2) // true
let gt4 = R.gt(1, 2)  // false

// ================== lt/lte ================
let lt1 = R.lt(1, 2)
let lt2 = R.lt(2, 2)
let lte1 = R.lte(2, 2)

// ================= equals =================
// 比较两个值是否相等（支持对象比较）
R.equals(1, '1')  // false
R.equals(2, 2)    // true
R.equals([1, 2])([1, 2])  // true

// ================== eqBy ==================
// 比较两个值传入指定函数返回的结果是否相等
R.eqBy(Math.abs)(5)(-5)   // true

// ================== pathEq =================
// 查看一个对象的列表某个嵌套路径是否有某个值， 常用于过滤
const user1 = { address: { zipCode: 90210 } }
const user2 = { address: { zipCode: 55555 } }
const user3 = { name: 'Bob' }
const users = [user1, user2, user3] 

const isFamous = R.pathEq(['address', 'zipCode'], 90210)
R.filter(isFamous, users)   // [ user1 ]

// ================== propEq =========================
// 如果对象的某个指定的属性等于给定值，返回true
const abby = {name: 'Abby', age: 7, hair: 'blond'};
const fred = {name: 'Fred', age: 12, hair: 'brown'};
const rusty = {name: 'Rusty', age: 10, hair: 'brown'};
const alois = {name: 'Alois', age: 15, disposition: 'surly'};
const kids = [abby, fred, rusty, alois];
const hasBrownHair = R.propEq('hair', 'brown');
R.filter(hasBrownHair, kids)  // [fred, rusty]

