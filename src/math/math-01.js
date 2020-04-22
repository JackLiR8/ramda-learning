/**
 * @file
 * 
 * 1. add
 * 2. dec
 * 3. inc
 * 4. divide
 * 5. multiply
 * 6. mathMod
 * 7. modulo
 * 8. mean
 * 9. median
 * 10. negate
 * 11. product
 * 12. subtract
 * 13. sum
 */

// ======================= add =======================
// 两数相加
R.add(2, 3) // 5
R.add(4)(5) // 9

// ===================== dec ================
// 参数减 1
R.dec(3)  // 2

// ===================== inc =================
// 参数加 1
R.inc(3)  // 4

// ===================== divide ==================
// 两数相除， a/b
R.divide(6, 3)  // 2

const half = R.divide(R.__, 2)
half(4) // 2

const reciprocal = R.divide(1)
reciprocal(4) // 0.25

// ==================== multiply =====================
// 两数相乘 a*b
const double = R.multiply(2)
const triple = R.multiply(3)
double(1) // 2
triple(1) // 3
R.multiply(2)(3)  // 6

// ======================== mathMod ========================
// 和 modulo 类似，但是更 mathematically
// -17 % 5 = -2
// R.mathMod(-17, 5) = 3
// mathMod 参数都是整数, 模量是0或者负数时返回NaN

R.mathMod(-17, 5);  //=> 3
R.mathMod(17, 5);   //=> 2
R.mathMod(17, -5);  //=> NaN
R.mathMod(17, 0);   //=> NaN
R.mathMod(17.2, 5); //=> NaN
R.mathMod(17, 5.3); //=> NaN

const clock = R.mathMod(R.__, 12);
clock(15); //=> 3
clock(24); //=> 0

const seventeenMod = R.mathMod(17);
seventeenMod(3);  //=> 2
seventeenMod(4);  //=> 1
seventeenMod(10); //=> 7

// ========================= modulo ===========================
// 参数 1 除以参数 2， 返回余数； 保留了js行为
R.modulo(17, 5) // 2

// js behavior:
R.modulo(-17, 5)  // -2
R.modulo(-17, -5) // -2
R.modulo(17, -5) // 2

// ========================= mean ============================
// 返回数字列表的平均数
R.mean([3, 6, 12])  // 7
R.mean([])  // NaN

// ========================= median ===========================
// 返回数字列表的中位数
R.median([2, 9, 7]) // 7
R.median([1, 4, 6, 10]) // 5

// ================== negate ==========================
// 返回一个值的负数
R.negate(3)   // -3
R.negate(-3)  // 3
R.negate(0)   // -0
R.negate(-0)  // 0

// =================== product =======================
// 把一个列表中的所有元素相乘
R.product([1, 2, 3, 4]) // 24

// ================== subtract ======================
// 返回第一个参数减第二个参数的差
R.subtract(10)(4)  // 6

const minus5 = R.subtract(R.__, 5)
minus5(17)  // 12

const complementaryAngle = R.subtract(90)
complementaryAngle(60)  // 30

// ================== sum ======================
// 返回一个列表所有元素之和
R.sum([1, 2, 3, 4]) // 10
