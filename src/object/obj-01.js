/**
 * @file Object
 * 
 * 1. pick
 * 2. pickAll
 * 3. omit
 * 4. prop
 * 5. propOr
 * 6. props
 * 7. path
 * 8. pathOr
 * 9. paths
 * 10. pickBy
 */

// ========================== pick ===========================
// 返回一个局部复制的对象，只包含特定的 key; 非基本类型是浅复制
// 如果给的 key 不存在，则忽略
R.pick(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1, d: 4}
R.pick(['a', 'e', 'f'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1}

// ========================== pickAll ========================
// 与 pick 类似，但 pickAll 会将不存在的属性以 key: undefined 键值对的形式返回。
R.pickAll(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1, d: 4}
R.pickAll(['a', 'e', 'f'], {a: 1, b: 2, c: 3, d: 4}); 
//=> {a: 1, e: undefined, f: undefined}

// ========================== omit ===========================
// 删除对象中给定的 keys 对应的属性。
R.omit(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, c: 3}

// ========================= prop ===========================
// 取出对象中指定属性的值。如果不存在，则返回 undefined。
R.prop('x', {x: 100}); //=> 100
R.prop('x', {}); //=> undefined
R.prop(0, [100]); //=> 100

// ======================== propOr =========================
// 对于给定的非空对象，如果指定属性存在，则返回该属性值；否则返回给定的默认值。
const alice = {
  name: 'ALICE',
  age: 101
};
const favorite = R.prop('favoriteLibrary');
const favoriteWithDefault = R.propOr('Ramda', 'favoriteLibrary');

favorite(alice);  //=> undefined
favoriteWithDefault(alice);  //=> 'Ramda'

// ========================= props =========================
// 返回 prop 的数组：输入为 keys 数组，输出为对应的 values 数组。
// values 数组的顺序与 keys 的相同
R.props(['x', 'y'], {x: 1, y: 2}); //=> [1, 2]
R.props(['c', 'a', 'b'], {b: 2, a: 1}); //=> [undefined, 1, 2]

const fullName = R.compose(R.join(' '), R.props(['first', 'last']));
fullName({last: 'Bullet-Tooth', age: 33, first: 'Tony'}); 
//=> 'Tony Bullet-Tooth'

// ======================== path ============================
// 取出给定路径上的值。
R.path(['a', 'b'], {a: {b: 2}}); //=> 2
R.path(['a', 'b'], {c: {b: 2}}); //=> undefined
R.path(['a', 'b', 0], {a: {b: [1, 2, 3]}}); //=> 1
R.path(['a', 'b', -2], {a: {b: [1, 2, 3]}}); //=> 2

// ======================== pathOr ============================
// 如果非空对象在给定路径上存在值，则将该值返回；否则返回给定的默认值
R.pathOr('N/A', ['a', 'b'], {a: {b: 2}}); //=> 2
R.pathOr('N/A', ['a', 'b'], {c: {b: 2}}); //=> "N/A"

// ======================== paths ============================
// 提取对象中指定路径数组（paths）上的对应的值（values）
R.paths(
  [['a', 'b'], ['p', 0, 'q']], 
  {
    a: {b: 2}, 
    p: [{q: 3}]
  }); //=> [2, 3]
R.paths([['a', 'b'], ['p', 'r']], {a: {b: 2}, p: [{q: 3}]}); //=> [2, undefined]

// =================== pickBy =========================
// 返回对象的部分拷贝，其中仅包含 key 满足 predicate 的属性
const isUpperCase = (val, key) => key.toUpperCase() === key;
R.pickBy(isUpperCase, {a: 1, b: 2, A: 3, B: 4}); //=> {A: 3, B: 4}
