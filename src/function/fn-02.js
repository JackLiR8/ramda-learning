/**
 * @file 
 * 
 * 1. curry
 * 2. partial
 * 3. partialRight
 * 4. memorizeWith
 * 5. composeWith
 * 6. pipeWith
 */

// ====================== curry ===================
// 返回给定函数的柯里化函数
const sum = (a, b, c) => a + b + c
const g = R.curry(sum)
// 以下调用方式都是等价的
g(1)(2)(3)
g(1)(2, 3)
g(1, 2)(3)
g(1, 2, 3)
g(1, 2, 3)

const _ = R.__
g(_, 2, 3)(1)
g(_, _, 3)(1)(2)
g(_, _, 3)(1, 2)
g(_, 2)(1)(3)
g(_, 2)(1, 3)
g(_, 2)(_, 3)(1)

// ================== partial ===========================
// 接受一个函数 f 和一个参数列表，返回函数 g; g调用时， 将 g 的参数跟在初始参数后，传入f
// 返回 f 的执行结果
const multiply = (a, b) => a * b
const double = R.partial(multiply, [2])
double(3)   // 6

// =================== partialRight ======================
// 和 partial 类似，从右侧参数开始
const cal = (a, b, c) => a + b * c
const parR = R.partialRight(cal, [3])
parR(1, 3)  // 10

// =================== memorizeWith ========================
// 接受两个函数， 第二个函数是需要缓存结果的函数；
// 返回一个函数，调用此函数会缓存结果，
// 再次调用时如果传参相同，则直接返回缓存值，不会调用原函数

let count = 0
const factorial = R.memoizeWith(R.identity, (a, b) => {
  count += 1;
  return a + b;
});

factorial(2, 3)
factorial(2, 3)
factorial(2, 3)
// console.log(count)  // 1
factorial(3, 2)
// console.log(count)  // 2

// ======================= composeWith =============================
// 利用转换函数从右向左执行函数组合，最后一个函数可以是多元函数，其他函数必须是一元函数
// composeWith 不自动柯里化，转换函数不应用于最后一个参数
const composeWhileNotNil = R.composeWith(
  (f, res) => R.isNil(res) ? res : f(res)
)

composeWhileNotNil([R.inc, R.prop('age')])({age: 1}) //=> 2
composeWhileNotNil([R.inc, R.prop('age')])({}) //=> undefined

// ====================== pipeWith ============================
// 利用转换函数从左往右执行函数组合。第一个函数可以是任意元函数（参数个数不限），
// 其余函数必须是一元函数。
// pipeWith 不自动柯里化， 转换函数不应用于第一个参数
const pipeWhileNotNil = R.pipeWith((f, res) => R.isNil(res) ? res : f(res));
const fpw = pipeWhileNotNil([Math.pow, R.negate, R.inc])

fpw(2, 3) // -7
pipeWhileNotNil([R.prop('age'), R.inc])({age: 1}) // 2
pipeWhileNotNil([R.prop('age'), R.inc])({}) // undefined

console.log(
)
