/**
 * @file List
 * 
 * 1. append
 * 2. prepend
 * 3. insert
 * 4. insertAll
 * 5. nth
 * 6. remove
 * 7. without
 * 8. difference
 * 9. differenceWith
 */

// ======================== append ======================
// 数组末尾添加一个元素，返回的是新数组
R.append('tests', ['write', 'more']); //=> ['write', 'more', 'tests']
R.append('tests', []); //=> ['tests']
R.append(['tests'], ['write', 'more']); //=> ['write', 'more', ['tests']]

// ===================== prepend ========================
// 数组头部添加一个元素，返回的是新数组
R.prepend('fee', ['fi', 'fo', 'fum']); //=> ['fee', 'fi', 'fo', 'fum']

// ==================== insert =========================
// 将元素插入到 list 指定索引处，返回新数组，不破环原数组
R.insert(2, 'x', [1,2,3,4]); //=> [1,2,'x',3,4]

// ===================== insertAll ======================
// 将子 list 插入到 list 指定索引处。返回新数组，不破坏原数组
R.insertAll(2, ['x','y','z'], [1,2,3,4]); //=> [1,2,'x','y','z',3,4]

// ===================== nth ============================
// 返回列表或字符串的第 n 个元素。如果 n 为负数，则返回索引为 length + n 的元素。
const list = ['foo', 'bar', 'baz', 'quux'];
R.nth(1, list); //=> 'bar'
R.nth(-1, list); //=> 'quux'
R.nth(-99, list); //=> undefined

R.nth(2, 'abc'); //=> 'c'
R.nth(3, 'abc'); //=> ''

// ===================== remove ========================
// 删除列表中从 start 开始的 count 个元素.
// 不破坏原数组，返回新数组
R.remove(2, 3, [1,2,3,4,5,6,7,8]); //=> [1,2,6,7,8]

// ===================== without =========================
// 返回第一个列表里没有的第二个列表里的元素组成的列表
// Acts as a transducer if a transformer is given in list position.
R.without([1, 2], [1, 2, 1, 3, 3, 4]); //=> [3, 3, 4]

// ===================== difference ========================
// 返回第一个列表有，第二个列表没有的元素组成的列表(无重复元素)
// 数组和对象对比的是值，而不是引用
R.difference([1,2,3,4], [7,6,5,4,3]); //=> [1,2]
R.difference([7,6,5,4,3], [1,2,3,4]); //=> [7,6,5]
R.difference([7,7,5,4,3], [1,2,3,4]); //=> [7,5]
R.difference([{a: 1}, {b: 2}], [{a: 1}, {c: 3}]) //=> [{b: 2}]

// =================== differenceWith ======================
// 求第一个列表中未包含在第二个列表中的所有元素的集合（集合中没有重复元素）。
// 两列表中的元素通过 predicate 判断相应元素是否同时 “包含在” 两列表中。
const cmp = (x, y) => x.a === y.a;
const l1 = [{a: 1}, {a: 2}, {a: 3}];
const l2 = [{a: 3}, {a: 4}];
R.differenceWith(cmp, l1, l2); //=> [{a: 1}, {a: 2}]

R.differenceWith((x, y) => x === y, [7,7,5,4,3], [1,2,3,4]) //=> [7,5]
