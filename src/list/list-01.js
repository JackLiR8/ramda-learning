/**
 * @file List
 * 
 * 1. adjust
 * 2. update
 * 3. all
 * 4. any
 * 5. none
 * 6. transduce
 * 7. reduce
 * 8. into
 * 9. reduced
 */

// ======================= adjust =======================
// 将数组中指定索引处的值替换为经函数变换的值, 返回新数组
R.adjust(1, R.toUpper, ['a', 'b', 'c', 'd'])  // ['a', 'B', 'c', 'd']
R.adjust(-1, R.toUpper, ['a', 'b', 'c', 'd'])  // ['a', 'B', 'c', 'D']
R.adjust(-2, R.toUpper, ['a', 'b', 'c', 'd'])  // ['a', 'B', 'C', 'd']

// ======================= update ========================
// 替换数组指定索引的值
R.update(1, '_', ['a', 'b', 'c', 'd'])  // ['a', '_', 'c', 'd']
R.update(-1, '_', ['a', 'b', 'c', 'd'])  // ['a', 'b', 'c', '_']

// ======================= all ============================
// 如果列表里所有的元素都满足 predicate, 返回 true; 否则返回false
// 若第二个参数自身存在 all 方法，则调用自身的 all 方法
// Acts as a transducer if a transformer is given in list position
const equals3 = R.equals(3);
R.all(equals3)([3, 3, 3, 3]); //=> true
R.all(equals3)([3, 3, 1, 3]); //=> false

// ======================= any ===========================
// 如果列表里有一个元素满足 predicate, 返回true; 否则返回 false
// 若第二个参数自身存在 any 方法，则调用自身的 any 方法
// Acts as a transducer if a transformer is given in list position
const lessThan0 = R.flip(R.lt)(0);
const lessThan2 = R.flip(R.lt)(2);
R.any(lessThan0)([1, 2]); //=> false
R.any(lessThan2)([1, 2]); //=> true

// ====================== none ===========================
// 如果列表里没有元素满足 predicate, 返回true; 否则返回 false
// 若第二个参数自身存在 none 方法，则调用自身的 none 方法
// Acts as a transducer if a transformer is given in list position
const isEven = n => n % 2 === 0;
const isOdd = n => n % 2 === 1;
R.none(isEven, [1, 3, 5, 7, 9, 11]); //=> true
R.none(isOdd, [1, 3, 5, 7, 8, 11]); //=> false

// ====================== transduce ======================
// transduce(transducer, iteratorFunction, initialValue, target)
// 用 iterator function 初始化 transducer ，生成一个 transformed iterator 
// function。然后顺次遍历列表，对每个列表元素先进行转换，然后与累积值进行归约，返回值
// 作为下一轮迭代的累积值。最终返回与初始累积值类型相同的一个累积值
// 1.  iterator function 接收两个参数： (acc, value) 
// 2.  在 transducer 初始化之后，使用 R.reduce 进行迭代操作。
const numbers = [1, 2, 3, 4];
const transducer = R.compose(R.map(R.add(1)), R.take(2));
R.transduce(transducer, R.flip(R.append), [], numbers); //=> [2, 3]

const isOdd = (x) => x % 2 === 1;
const firstOddTransducer = R.compose(R.filter(isOdd), R.take(1));
R.transduce(firstOddTransducer, R.flip(R.append), [], R.range(0, 100)); //=> [1]

// ======================= reduce ==========================
// 左折叠操作。遍历列表，相继调用二元迭代函数（参数为累积值和从数组中取出的当前元素），
// 将本次迭代结果作为下次迭代的累积值。返回最终累积值
// 1.  reduce 的迭代函数接收两个参数 (acc, value)，
//     reduceRight 的迭代函数的参数顺序为 (value, acc)
// 2.  R.reduce 与原生 Array.prototype.reduce 方法不同，它不会跳过删除或未分配的索引项
// 3.  如果第三个参数自身有 reduce 方法，则调用自身的 reduce 方法。
R.reduce(R.subtract, 0, [1, 2, 3, 4]) // => ((((0 - 1) - 2) - 3) - 4) = -10

// ======================= into ============================
// 使用 transducer 对 list 中的元素进行转换，然后使用基于 accumulator 的类型的
// 迭代器函数将转换后的元素依次添加到 accumulator 上
// 1.  accumulator 的类型可以是：array、string、object 或者 transformer 。
//     如果accumulator类型是 array 或 string，则迭代元素将被添加到数组或连接到字符串上；
//     如果是对象，迭代元素将会被直接合并；
//     如果是二元素数组，迭代元素会以键值对形式进行合并。
// 2.  在 transducer 初始化之后，使用 R.reduce 进行迭代操作。
const numbers1 = [1, 2, 3, 4];
const transducer = R.compose(R.map(R.add(1)), R.take(2));

R.into([], transducer, numbers1); //=> [2, 3]

const intoArray = R.into([]);
intoArray(transducer, numbers1); //=> [2, 3]

// ======================== reduced ==========================
// 返回一个封装的值，该值代表 reduce 或 transduce 操作的最终结果。
// 返回值是一个黑盒：不保证其内部结构的稳定性
// 只支持 reduce，reduceWhile，transduce
R.reduce(
  (acc, item) => item > 3 ? R.reduced(acc) : acc.concat(item),
  [],
  [1, 2, 3, 4, 5]) // [1, 2, 3]
