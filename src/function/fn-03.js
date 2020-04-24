/**
 * @file Function
 * 
 * 1. unary
 * 2. binary
 * 3. nAry
 * 4. tap
 * 5. call
 * 6. apply
 * 7. unapply
 * 8. applySpec
 * 9. juxt
 * 10. applyTo
 */

// ====================== unary =======================
// 把一个任意元的函数包裹成一元函数， 多余参数不会传入原函数
const unF = (a, b) => [a, b]
const take1 = R.unary(unF)
take1(1, 2) // [ 1, undefined ]

// ====================== binary =======================
// 把一个任意元的函数包裹成二元函数，多余的参数不会传入原函数
const take3Args = (a, b, c) => [a, b, c]
const take2 = R.binary(take3Args)
take2(1, 2, 3)  // [ 1, 2, undefined ]

// ===================== nAry ===========================
// 把一个任意元的函数包裹成一个 n 元函数，多余的函数不会传入原函数
const takeN = R.nAry(1, take3Args)
takeN(1, 2, 3)  // [ 1, undefined, undefined ]

// ===================== tap =============================
// 把一个值传入给定函数， 然后返回该值
// Acts as a transducer if a transformer is given as second parameter.
const sayX = x => console.log(`x is ${x}`)
R.tap(sayX, 100)  //=> 100
// 打印: x is 100

// ====================  call ==========================
// 提取第一个参数作为函数，其余参数传入提取的函数，返回结果
// This is occasionally useful as a converging function for 
// R.converge: the first branch can produce a function while 
// the remaining branches produce values to be passed to that 
// function as its arguments.
R.call(R.add, 1, 2) // 3

const indentN = R.pipe(
  R.repeat(' '),
  R.join(''),
  R.replace(/^(?!$)/gm));

const format = R.converge(
  R.call, 
  [
    R.pipe(R.prop('indent'), indentN),
    R.prop('value')
  ]);

format({indent: 2, value: 'foo\nbar\nbaz\n'}); //=> '  foo\n  bar\n  baz\n'

// ======================== apply ===========================
// 将参数列表变成参数序列，传入fn
const nums = [1, 2, 3, -99, 42, 6, 7];
R.apply(Math.max, nums); //=> 42

// ======================= unapply =========================
// apply 的逆函数
// 接受一个函数 fn, fn 接受一个参数数组，返回一个具有以下特征的函数
//  1. 接受任意个参数
//  2. 将所有参数以数组形式传入 fn
//  3. 返回结果
R.unapply(R.sum)(1, 2, 3) // 6

// ======================= applySpec =======================
// 给定一个特殊的对象，此对象把属性映射为函数。 返回一个函数
// 此函数返回一个相同结构的对象， 对象的属性值都是把参数传入属性对应的函数得到的
const getMetrics = R.applySpec({
  sum: R.add,
  nested: { mul: R.multiply }
})

getMetrics(2, 4)  // => { sum: 6, nested: { mul: 8 } }

// ======================== juxt ====================
// 将函数列表作用于值列表
const getRange = R.juxt([Math.min, Math.max]);
getRange(3, 4, 9, -3); //=> [-3, 9]

// ======================= applyTo =======================
// 接受一个值，并将一个函数作用于它
const t42 = R.applyTo(42)
t42(R.identity) // 42
t42(R.inc)  // 43
