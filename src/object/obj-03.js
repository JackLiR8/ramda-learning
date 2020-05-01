/**
 * @file Object
 * 
 * 1. lens
 * 2. lensIndex
 * 3. lensProp
 * 4. lensPath
 * 5. view
 * 6. set
 * 7. over
 * 8. invertObj
 * 9. invert
 */

// ======================== lens ==========================
// Returns a lens for the given getter and setter functions. 
// The getter "gets" the value of the focus; the setter "sets" 
// the value of the focus. 
// The setter should not mutate the data structure.
const xLens = R.lens(R.prop('x'), R.assoc('x'));

R.view(xLens, {x: 1, y: 2});            //=> 1
R.set(xLens, 4, {x: 1, y: 2});          //=> {x: 4, y: 2}
R.over(xLens, R.negate, {x: 1, y: 2});  //=> {x: -1, y: 2}

// ======================== lensIndex ==========================
// Returns a lens whose focus is the specified index.
const headLens = R.lensIndex(0);

R.view(headLens, ['a', 'b', 'c']);            //=> 'a'
R.set(headLens, 'x', ['a', 'b', 'c']);        //=> ['x', 'b', 'c']
R.over(headLens, R.toUpper, ['a', 'b', 'c']); //=> ['A', 'b', 'c']


// ======================== lensProp ==========================
// Returns a lens whose focus is the specified property.
const xLens1 = R.lensProp('x');

R.view(xLens1, {x: 1, y: 2});            //=> 1
R.set(xLens1, 4, {x: 1, y: 2});          //=> {x: 4, y: 2}
R.over(xLens1, R.negate, {x: 1, y: 2});  //=> {x: -1, y: 2}

// ======================= lensPath ===========================
// Returns a lens whose focus is the specified path.
const xHeadYLens = R.lensPath(['x', 0, 'y']);

R.view(xHeadYLens, {x: [{y: 2, z: 3}, {y: 4, z: 5}]});
//=> 2
R.set(xHeadYLens, 1, {x: [{y: 2, z: 3}, {y: 4, z: 5}]});
//=> {x: [{y: 1, z: 3}, {y: 4, z: 5}]}
R.over(xHeadYLens, R.negate, {x: [{y: 2, z: 3}, {y: 4, z: 5}]});
//=> {x: [{y: -2, z: 3}, {y: 4, z: 5}]}

// ======================== view ===============================
// 返回数据结构中，lens 聚焦的部分。lens 的焦点决定了数据结构中的哪部分是可见的

// const xLens = R.lensProp('x');
R.view(xLens, {x: 1, y: 2});  //=> 1
R.view(xLens, {x: 4, y: 2});  //=> 4

// ======================== set ===============================
// 通过 lens 对数据结构聚焦的部分进行设置

// const xLens = R.lensProp('x');
R.set(xLens, 4, {x: 1, y: 2});  //=> {x: 4, y: 2}
R.set(xLens, 8, {x: 1, y: 2});  //=> {x: 8, y: 2}

// ======================== over ===============================
// 对数据结构中被 lens 聚焦的部分进行函数变换。

// const headLens = R.lensIndex(0);
R.over(headLens, R.toUpper, ['foo', 'bar', 'baz']); //=> ['FOO', 'bar', 'baz']

// ======================= invertObj =========================
// 将对象的键、值交换位置：值作为键，对应的键作为值。交换后的键会被强制转换为字符串。
// 注意，如果原对象同一值对应多个键，采用最后遍历到的键。
const raceResults = {
  first: 'alice',
  second: 'jake'
};
R.invertObj(raceResults);
//=> { 'alice': 'first', 'jake':'second' }

// Alternatively:
const raceResults1 = ['alice', 'jake'];
R.invertObj(raceResults1);
//=> { 'alice': '0', 'jake':'1' }

// ======================= invert =========================
// 与 R.invertObj 类似，但会将值放入数组中，来处理一个键对应多个值的情况。
const raceResultsByFirstName = {
  first: 'alice',
  second: 'jake',
  third: 'alice',
};
R.invert(raceResultsByFirstName);
//=> { 'alice': ['first', 'third'], 'jake':['second'] }