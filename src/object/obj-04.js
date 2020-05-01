/**
 * @file Object
 * 
 * 1. assoc
 * 2. assocPath
 * 3. dissoc
 * 4. dissocPath
 * 5. clone
 */

// ======================== assoc =========================
// 浅复制对象，然后设置或覆盖对象的指定属性。
// 注意，该函数也会将 prototype 属性复制到新的对象中。
// 所有 non-primitive 属性都通过引用复制。
R.assoc('c', 3, {a: 1, b: 2}); //=> {a: 1, b: 2, c: 3}

// ======================= assocPath =======================
// 浅复制对象，设置或覆盖即将创建的给定路径所需的节点，并将特定值放在该路径的末端。
// 注意，这也会将 prototype 属性复制到新对象上。
// 所有 non-primitive 属性都通过引用复制。
R.assocPath(['a', 'b', 'c'], 42, {a: {b: {c: 0}}}); //=> {a: {b: {c: 42}}}

// Any missing or non-object keys in path will be overridden
R.assocPath(['a', 'b', 'c'], 42, {a: 5}); //=> {a: {b: {c: 42}}}

// ====================== dissoc ===========================
// 删除对象中指定 prop 属性
R.dissoc('b', {a: 1, b: 2, c: 3}); //=> {a: 1, c: 3}

// ====================== dissocPath ===========================
// 浅复制对象，删除返回对象中指定路径上的属性。
// 注意，这也会将 prototype 属性复制到新对象上并展开。
// 所有 non-primitive 属性都通过引用复制。
R.dissocPath(['a', 'b', 'c'], {a: {b: {c: 42}}}); //=> {a: {b: {}}}

// ====================== clone ==============================
// 深复制。
// 其值可能（嵌套）包含 Array、Object、Number、String、Boolean、Date 类型的数据。
// Function 通过引用复制。
// 若自身存在 clone 方法，则调用自身的 clone 方法。
const objects = [{}, {}, {}];
const objectsClone = R.clone(objects);
objects === objectsClone; //=> false
objects[0] === objectsClone[0]; //=> false
