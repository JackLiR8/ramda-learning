/**
 * @file List
 * 
 * 1. flatten
 * 2. chain
 * 3. unnest
 * 4. partition
 * 5. splitAt
 * 6. splitEvery
 * 7. splitWhen
 * 8. startWith
 * 9. endWith
 */

// ========================= flatten ==========================
// 获取list的所有元素（包含所有子数组中的元素），然后由这些元素组成一个新的数组。深度优先
R.flatten([1, 2, [3, 4], 5, [6, [7, 8, [9, [10, 11], 12]]]]);
//=> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

// ========================= chain ============================
// chain 将函数映射到列表中每个元素，并将结果连接起来。 
// chain 在一些库中也称为 flatMap（先 map 再 flatten ）。
// 1.  若第二个参数存在 chain 方法，则调用其自身的 chain方法。
//     该参数需符合 FantasyLand Chain 规范。
// 2.  如果第二个参数是函数，chain(f, g)(x) 等价于 f(g(x), x)。
// 3.  Acts as a transducer if a transformer is given in list position.
const duplicate = n => [n, n];
R.chain(duplicate, [1, 2, 3]); //=> [1, 1, 2, 2, 3, 3]

R.chain(R.append, R.head)([1, 2, 3]); //=> [1, 2, 3, 1]

// ========================= unnest ===========================
// R.chain(R.identity) 的简写, 对 Chain 类型的数据消除一层嵌套
R.unnest([1, [2], [[3]]]); //=> [1, 2, [3]]
R.unnest([[1, 2], [3, 4], [5, 6]]); //=> [1, 2, 3, 4, 5, 6]

// ========================= partition =======================
// 通过 predicate 将列表或 "Filterable" （可过滤的）对象分成两部分，分别为满足 
// predicate 的元素和不满足 predicate 的元素。元素类型保持不变。
// Filterable 类型包括 plain object 或者任何带有 filter 方法的类型，如 Array 。
R.partition(R.includes('s'), ['sss', 'ttt', 'foo', 'bars']);
// => [ [ 'sss', 'bars' ],  [ 'ttt', 'foo' ] ]

R.partition(R.includes('s'), { a: 'sss', b: 'ttt', foo: 'bars' });
// => [ { a: 'sss', foo: 'bars' }, { b: 'ttt' }  ]

// ========================= splitAt =======================
// 在指定的索引处拆分列表或者字符串
R.splitAt(1, [1, 2, 3]);          //=> [[1], [2, 3]]
R.splitAt(5, 'hello world');      //=> ['hello', ' world']
R.splitAt(-1, 'foobar');          //=> ['fooba', 'r']

// ========================= splitEvery =======================
// 将列表拆分成指定长度的子列表集
R.splitEvery(3, [1, 2, 3, 4, 5, 6, 7]); //=> [[1, 2, 3], [4, 5, 6], [7]]
R.splitEvery(3, 'foobarbaz'); //=> ['foo', 'bar', 'baz']

// ========================= splitWhen =======================
// 查找列表中首个满足 predicate 的元素，在该处将列表拆分为两部分。
// 首个满足 predicate 的元素包含在后一部分。
R.splitWhen(R.equals(2), [1, 2, 3, 1, 2, 3]);   //=> [[1], [2, 3, 1, 2, 3]]

// ========================= startsWith =======================
// 检查列表是否以给定的值开头
R.startsWith('a', 'abc')                //=> true
R.startsWith('b', 'abc')                //=> false
R.startsWith(['a'], ['a', 'b', 'c'])    //=> true
R.startsWith(['b'], ['a', 'b', 'c'])    //=> false

// ========================= endsWith =======================
// 检查列表是否以指定的子列表结尾。
// 同样的，检查字符串是否以指定的子字符串结尾
R.endsWith('c', 'abc')                //=> true
R.endsWith('b', 'abc')                //=> false
R.endsWith(['c'], ['a', 'b', 'c'])    //=> true
R.endsWith(['b'], ['a', 'b', 'c'])    //=> false