/**
 * @file Object
 * 
 * 1. assoc
 * 2. assocPath
 * 3. dissoc
 * 4. dissocPath
 * 5. clone
 * 6. project
 * 7. where
 * 8. whereEq
 * 9. propSatisfies
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

// ======================== project ==============================
// 模拟 SQL 中的 select 语句
const abby = {name: 'Abby', age: 7, hair: 'blond', grade: 2};
const fred = {name: 'Fred', age: 12, hair: 'brown', grade: 7};
const kids = [abby, fred];
R.project(['name', 'grade'], kids); 
//=> [{name: 'Abby', grade: 2}, {name: 'Fred', grade: 7}]

// ======================== where ==============================
// 接受一个测试规范对象和一个待检测对象，如果测试满足规范，则返回 true，否则返回 false。
// 测试规范对象的每个属性值都必须是 predicate 。每个 predicate 作用于待检测对象对应的
// 属性值，如果所有 predicate 都返回 true，则 where 返回 true，否则返回 false 。
// where 非常适合于需要声明式表示约束的函数，比如 filter 和 find 

// pred :: Object -> Boolean
const pred = R.where({
  a: R.equals('foo'),
  b: R.complement(R.equals('bar')),
  x: R.gt(R.__, 10),
  y: R.lt(R.__, 20)
});

pred({a: 'foo', b: 'xxx', x: 11, y: 19}); //=> true
pred({a: 'xxx', b: 'xxx', x: 11, y: 19}); //=> false
pred({a: 'foo', b: 'bar', x: 11, y: 19}); //=> false
pred({a: 'foo', b: 'xxx', x: 10, y: 19}); //=> false
pred({a: 'foo', b: 'xxx', x: 11, y: 20}); //=> false

// ======================== whereEq ==============================
// 接受一个测试规范对象和一个待检测对象，如果测试满足规范，则返回 true，否则返回 false。
// whereEq 是 where 的一种特殊形式。
// pred :: Object -> Boolean
const pred = R.whereEq({a: 1, b: 2});

pred({a: 1});              //=> false
pred({a: 1, b: 2});        //=> true
pred({a: 1, b: 2, c: 3});  //=> true
pred({a: 1, b: 1});        //=> false

// ======================= propSatisfies ========================
// 如果指定的对象属性满足 predicate，返回 true；否则返回 false。
// 可以使用 R.where 进行多个属性的判断。
R.propSatisfies(x => x > 0, 'x', {x: 1, y: 2}); //=> true
