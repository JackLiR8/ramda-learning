/**
 * @file Logic
 * 
 * 1. allPass
 * 2. anyPass
 * 3. and
 * 4. both
 * 5. xor
 * 6. or
 * 7. either
 * 8. not
 * 9. complement
 */

// ===================== allPass ==========================
// 接受一个函数数组，当它们都返回true时，返回true
const gt10 = R.gt(R.__, 10)
const isEven = x => R.equals(0, R.modulo(x)(2))

const evenAndGt10 = R.allPass([gt10, isEven])
evenAndGt10(15) // false
evenAndGt10(20) // true

const isQueen = R.propEq('rank', 'Q')
const isSpade = R.propEq('suit', '♠️')
const isQueenOfSpades = R.allPass([isQueen, isSpade])

isQueenOfSpades({ rank: 'Q', suit: '♣️'}) // false
isQueenOfSpades({ rank: 'Q', suit: '♠️'}) // true

// ======================== anyPass =========================
// 接受一个函数数组，任意函数返回true就返回true
const typeA = R.propEq('type', 'A')
const typeB = R.propEq('type', 'B')
const AOrB = R.anyPass([typeA, typeB])

AOrB({ type: 'A'})  // true
AOrB({ type: 'B'})  // true
AOrB({ type: 'C'})  // false

console.log(
)

// ========================= and ============================
// 两个参数都为true时，返回true
R.and(true, false)  // false
R.and(true, true) // true

// ========================= both ============================
// 接受两个函数，并返回两个函数返回值的 &&
const gt5 = R.gt(R.__, 5)
const lt10 = R.lt(R.__, 10)
const f = R.both(gt5, lt10)

f(6)  // true
f(4)  // false
f(11) // false

// ======================= xor =========================
// 两个参数一个是true, 一个是false时返回 true, 否则返回 false
R.xor(true, true) // false
R.xor(true, false)  // true
R.xor(false, false) // false

// ====================== or ==========================
// 接受两个参数，一个或两个参数为 true, 返回 true
// 两个参数都为 false, 返回 false
R.or(true, false) // true
R.or(true, true) // true
R.or(false, false)  // false

// ====================== either =====================
// 接受两个函数，只要有一个返回 true, 就返回 true, 否则返回false
const evenOrGt10 = R.either(gt10, isEven)
evenOrGt10(11)  // true
evenOrGt10(8)   // true
evenOrGt10(9)   // false

// ==================== not ======================
// 返回参数的“非”值， not(a) => !a
R.not(true); //=> false
R.not(false); //=> true
R.not(0); //=> true
R.not(1); //=> false

// =================== complement ==================
// 接受参数函数 f，返回函数 g. 
// f 和 g 传入同样参数:
// 若 f 返回 ‘真’ 值，g 返回 false
// 若 f 返回 '假' 值，g 返回 true
const isNotNil = R.complement(R.isNil);
isNil(null); //=> true
isNotNil(null); //=> false
isNil(7); //=> false
isNotNil(7); //=> true
