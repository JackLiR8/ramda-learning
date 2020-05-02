/**
 * @file Object
 * 
 * 1. mergeLeft
 * 2. margeRight
 * 3. mergeWith
 * 4. mergeWithKey
 * 5. mergeDeepLeft
 * 6. margeDeepRight
 * 7. mergeDeepWith
 * 8. mergeDeepWithKey
 */

// ====================== mergeLeft =========================
// 合并两个对象的自身属性（不包括 prototype 属性）。
// 如果某个 key 在两个对象中都存在，使用前一个对象对应的属性值
R.mergeLeft({ 'age': 40 }, { 'name': 'fred', 'age': 10 });
//=> { 'name': 'fred', 'age': 40 }

const resetToDefault = R.mergeLeft({x: 0});
resetToDefault({x: 5, y: 2}); //=> {x: 0, y: 2}

// ====================== mergeRight =========================
// 合并两个对象的自身属性（不包括 prototype 属性）。
// 如果某个 key 在两个对象中都存在，使用后一个对象对应的属性值
R.mergeRight({ 'name': 'fred', 'age': 10 }, { 'age': 40 });
//=> { 'name': 'fred', 'age': 40 }

const withDefaults = R.mergeRight({x: 0, y: 0});
withDefaults({y: 2}); //=> {x: 0, y: 2}

// ====================== mergeWith =========================
// 使用给定的两个对象自身属性（不包括 prototype 属性）来创建一个新对象。
// 如果某个 key 在两个对象中都存在，则使用给定的函数对每个对象该 key 对应
// 的 value 进行处理，处理结果作为新对象该 key 对应的值
R.mergeWith(R.concat,
  { a: true, values: [10, 20] },
  { b: true, values: [15, 35] });
//=> { a: true, b: true, values: [10, 20, 15, 35] }

// ====================== mergeWithKey =========================
// 使用给定的两个对象自身属性（不包括 prototype 属性）来创建一个新对象。
// 如果某个 key 在两个对象中都存在，则使用给定的函数对该 key 和每个对象该 key
// 对应的 value 进行处理，处理结果作为新对象该 key 对应的值。
let concatValues = (k, l, r) => k == 'values' ? R.concat(l, r) : r
R.mergeWithKey(concatValues,
               { a: true, thing: 'foo', values: [10, 20] },
               { b: true, thing: 'bar', values: [15, 35] });
//=> { a: true, b: true, thing: 'bar', values: [10, 20, 15, 35] }

// ====================== mergeDeepLeft =========================
// 合并两个对象的自身属性（不包括 prototype 属性）。如果某个 key 在两个对象中都存在：
// 1.  两个值都是对象，则继续递归合并这两个值。
// 2.  否则，采用第一个对象的值。
R.mergeDeepLeft({ name: 'fred', age: 10, contact: { email: 'moo@example.com' }},
                { age: 40, contact: { email: 'baa@example.com' }});
//=> { name: 'fred', age: 10, contact: { email: 'moo@example.com' }}

// ====================== mergeDeepRight =========================
// 合并两个对象的自身属性（不包括 prototype 属性）。如果某个 key 在两个对象中都存在：
// 1.  两个值都是对象，则继续递归合并这两个值。
// 2.  否则，采用第二个对象的值。
R.mergeDeepRight({name: 'fred', age: 10, contact:{ email: 'moo@example.com'}},
                 { age: 40, contact: { email: 'baa@example.com' }});
//=> { name: 'fred', age: 40, contact: { email: 'baa@example.com' }}

// ====================== mergeDeepWith =========================
// 合并两个对象的自身属性（不包括 prototype 属性）。如果某个 key 在两个对象中都存在：
// 1.  两个关联的值都是对象，则继续递归合并这两个值。
// 2.  否则，使用给定函数对两个值进行处理，并将返回值作为该 key 的新值。
// 如果某 key 只存在于一个对象中，该键值对将作为结果对象的键值对。
R.mergeDeepWith(R.concat,
  { a: true, c: { values: [10, 20] }},
  { b: true, c: { values: [15, 35] }});
//=> { a: true, b: true, c: { values: [10, 20, 15, 35] }}

// ====================== mergeDeepWithKey =========================
// 合并两个对象的自身属性（不包括 prototype 属性）。如果某个 key 在两个对象中都存在：
// 1.  两个关联的值都是对象，则继续递归合并这两个值。
// 2.  否则，使用给定函数对该 key 和对应的两个值进行处理，并将返回值作为该 key 的新值。
// 如果某 key 只存在于一个对象中，该键值对将作为结果对象的键值对。
let concatValues = (k, l, r) => k == 'values' ? R.concat(l, r) : r
R.mergeDeepWithKey(concatValues,
                   { a: true, c: { thing: 'foo', values: [10, 20] }},
                   { b: true, c: { thing: 'bar', values: [15, 35] }});
//=> { a: true, b: true, c: { thing: 'bar', values: [10, 20, 15, 35] }}
