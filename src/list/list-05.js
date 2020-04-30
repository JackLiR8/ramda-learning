/**
 * @file List
 * 
 * 1. range
 * 2. repeat
 * 3. times
 * 4. pluck
 * 5. groupBy
 * 6. groupWith
 * 7. find
 * 8. findIndex
 * 9. findLast
 * 10. findLastIndex
 */

// ======================= range ===========================
// 返回从 from 到 to 之间的所有数的升序列表。左闭右开
R.range(1, 5);    //=> [1, 2, 3, 4]
R.range(50, 53);  //=> [50, 51, 52]

// ======================= repeat ===========================
// 生成包含 n 个同一元素的数组。
R.repeat('hi', 5); //=> ['hi', 'hi', 'hi', 'hi', 'hi']

const obj = {};
const repeatedObjs = R.repeat(obj, 5); //=> [{}, {}, {}, {}, {}]
repeatedObjs[0] === repeatedObjs[1]; //=> true

// ======================= times ===========================
// 执行输入的函数 n 次，返回由函数执行结果组成的数组。
// fn 为一元函数，n 次调用接收的参数为：从 0 递增到 n-1
R.times(R.identity, 5); //=> [0, 1, 2, 3, 4]
R.times(R.multiply(2), 5); //=> [0, 2, 4, 6, 8]

// ======================= pluck ============================
// 从列表内的每个对象元素中取出特定名称的属性，组成一个新的列表。
// pluck 可以作用于任何 functor ，包括 Array，因为它等价于 R.map(R.prop(k), f)
var getAges = R.pluck('age');
getAges([{name: 'fred', age: 29}, {name: 'wilma', age: 27}]); //=> [29, 27]

R.pluck(0, [[1, 2], [3, 4]]);               //=> [1, 3]
R.pluck('val', {a: {val: 3}, b: {val: 5}}); //=> {a: 3, b: 5}

// ======================= groupBy ============================
// 将列表根据一定规则拆分成多组子列表，并存储在一个对象中
// 对列表中的每个元素调用函数，根据函数返回结果进行分组。函数返回字符串作为相等性判断，
// 返回的字符串作为存储对象的键，具有相同返回字符串的元素聚合为数组，作为该键的值。
// 若第二个参数自身存在 groupBy 方法，则调用自身的 groupBy 方法
const byGrade = R.groupBy(function(student) {
  const score = student.score;
  return score < 65 ? 'F' :
         score < 70 ? 'D' :
         score < 80 ? 'C' :
         score < 90 ? 'B' : 'A';
});
const students = [{name: 'Abby', score: 84},
                {name: 'Eddy', score: 58},
                // ...
                {name: 'Jack', score: 99}];
byGrade(students);
// {
//   'A': [{name: 'Jack', score: 99}],
//   'B': [{name: 'Abby', score: 84}]
//   // ...,
//   'F': [{name: 'Eddy', score: 58}]
// }

// ============================== groupWith =============================
// 通过给定的对比函数，将列表按顺序分割成多组子列表。
// 对比函数只比较相邻元素。
R.groupWith(R.equals, [0, 1, 1, 2, 3, 5, 8, 13, 21])
//=> [[0], [1, 1], [2], [3], [5], [8], [13], [21]]

R.groupWith((a, b) => a + 1 === b, [0, 1, 1, 2, 3, 5, 8, 13, 21])
//=> [[0, 1], [1, 2, 3], [5], [8], [13], [21]]

R.groupWith((a, b) => a % 2 === b % 2, [0, 1, 1, 2, 3, 5, 8, 13, 21])
//=> [[0], [1, 1], [2], [3, 5], [8], [13, 21]]

R.groupWith(R.eqBy(isVowel), 'aestiou')
//=> ['ae', 'st', 'iou']

// ========================== find ============================
// 查找并返回 list 中首个满足 predicate 的元素；
// 如果未找到满足条件的元素，则返回 undefined 。
// 若第二个参数自身存在 find 方法，则调用自身的 find 方法。
// Acts as a transducer if a transformer is given in list position.
const xs = [{a: 1}, {a: 2}, {a: 3}];
R.find(R.propEq('a', 2))(xs); //=> {a: 2}
R.find(R.propEq('a', 4))(xs); //=> undefined

// ========================== findIndex =======================
// 查找并返回 list 中首个满足 predicate 的元素的索引；
// 如果未找到满足条件的元素，则返回 -1
// const xs = [{a: 1}, {a: 2}, {a: 3}];
R.findIndex(R.propEq('a', 2))(xs); //=> 1
R.findIndex(R.propEq('a', 4))(xs); //=> -1

// ========================== findLast ========================
// 查找并返回 list 中最后一个满足 predicate 的元素；
// 如果未找到满足条件的元素，则返回 undefined
const xs1 = [{a: 1, b: 0}, {a:1, b: 1}];
R.findLast(R.propEq('a', 1))(xs1); //=> {a: 1, b: 1}
R.findLast(R.propEq('a', 4))(xs1); //=> undefined

// ========================== findLastIndex ===================
// 查找并返回 list 中最后一个满足 predicate 的元素的索引；
// 如果未找到满足条件的元素，则返回 -1 
// const xs1 = [{a: 1, b: 0}, {a:1, b: 1}];
R.findLastIndex(R.propEq('a', 1))(xs1); //=> 1
R.findLastIndex(R.propEq('a', 4))(xs1); //=> -1
