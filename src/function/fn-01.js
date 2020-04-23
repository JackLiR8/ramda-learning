/**
 * @file Function
 * 
 * 1. identity
 * 2. always
 * 3. compose
 * 4. pipe
 * 5. converge
 * 6. useWith
 * 7. T
 * 8. F
 */

// ========================== identity ============================
// 一个不做任何事，只把参数原封不动的返回的函数。可用作默认或占位函数
R.identity(1); //=> 1

// ========================= always ============================
// 返回一个函数，此函数总是返回给定的值；对于非基本数据类型，返回的是对原始数据的引用
const fA = R.always(1)
fA()  //=>1

const obj = {};
R.identity(obj) === obj; //=> true

// =========================== compose =============================
// 组合多个函数，从右向左执行
// The last argument may have any arity; the remaining arguments must be unary.
// 注意：compose不自动柯里化
R.compose(Math.abs, R.add(1), R.multiply(2))(-4) //=> 7

// ========================= pipe ================================
// 组合多个函数，从左向右执行
// The first argument may have any arity; the remaining arguments must be unary
// 注意：pipe不自动柯里化
const fPipe = R.pipe(Math.pow, R.negate, R.inc)
fPipe(2, 3) // -(2^3) + 1

// ======================== converge ==========================
// 接受两个参数，第一个参数是函数，第二个参数是函数数组。传入的值先使用第二个参数
// 包含的函数分别处理以后，再用第一个参数处理前一步生成的结果。
const average = R.converge(R.divide, [R.sum, R.length])
average([1, 2, 3, 4]) // 2.5

const strangeConcat = R.converge(R.concat, [R.toUpper, R.toLower])
strangeConcat('HeLlo')  // 'HELLOhello'

// ========================== useWith ===========================
// 接受一个函数fn和一个函数数组，并返回一个新函数 g
// 当 g 调用时， g的参数会先用函数数组里的函数按顺序一对一处理，然后传入fn
// 如果传入g的参数比函数数组的成员多，那么多余的参数会被当作附加参数直接传入fn
// 如果你想要传入不被转换的附加参数，尽管你可以直接忽略它们，但最好还是传入 identity函数
// 这样新函数可以得到正确的“元”
R.useWith(R.multiply, [R.identity, R.identity])(2, 4) // 8
R.useWith(R.multiply, [R.dec, R.inc])(2, 3) // 4
console.log(
  R.useWith(R.multiply, [R.dec, R.inc])(2, 3) // 4
)

// ======================== T =====================
// 一个函数，永远返回 true. 忽略传参
R.T() // true

// ======================== F =====================
// 一个函数，永远返回 false, 忽略传参
R.F() // false
