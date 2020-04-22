/**
 * @file Logic
 * 
 * 1. defaultTo
 * 2. isEmpty
 * 3. ifElse
 * 4. unless
 * 5. when
 * 6. cond
 * 7. until
 * 8. pathSatisfies
 * 9. propSatisfies
 */

// ====================== defaultTo ==========================
// 如果第二个参数不是null, undefined 或 NaN, 则返回第二个参数
// 否则返回第一个参数
const defaultTo42 = R.defaultTo(42);

defaultTo42(null);  //=> 42
defaultTo42(undefined);  //=> 42
defaultTo42(false);  //=> false
defaultTo42('Ramda');  //=> 'Ramda'

// ====================== isEmpty ========================
// 如果给定值是其类型的“空”值，返回 true
R.isEmpty([1, 2, 3]);   //=> false
R.isEmpty([]);          //=> true
R.isEmpty('');          //=> true
R.isEmpty(null);        //=> false
R.isEmpty({});          //=> true
R.isEmpty({length: 0}); //=> false

// ==================== ifElse =========================
// Creates a function that will process either the onTrue or the
// onFalse function depending upon the result of the condition predicate.
const incCount = R.ifElse(
  R.has('count'),
  R.over(R.lensProp('count'), R.inc),
  R.assoc('count', 1)
);
incCount({});           //=> { count: 1 }
incCount({ count: 1 }); //=> { count: 2 }

// ===================== unless ====================
// 接受两个函数，如果最终传入的值满足第一个函数的推测（返回true）， 
// 则直接返回传入的值；否则返回以相同的值调用第二个函数得到的结果
let safeInc = R.unless(R.isNil, R.inc);
safeInc(null); //=> null
safeInc(1); //=> 2

let positiveDec = R.unless(R.lte(R.__, 0), R.dec)


// ===================== when ======================
// 接受两个函数，如果最终传入的值满足第一个函数的推测（返回true）， 
// 则把值传入第二个函数并返回结果； 否则直接返回值本身
// truncate :: String -> String
const truncate = R.when(
  R.propSatisfies(R.gt(R.__, 10), 'length'),
  R.pipe(R.take(10), R.append('…'), R.join(''))
);
truncate('12345');         //=> '12345'
truncate('0123456789ABC'); //=> '0123456789…'

// ======================= cond =======================
// 返回一个函数fn
// cond 接受一个由[predicate, transformer]组成的数组，fn的参数会依次应用到
// predicate, 直到一个返回 "真"， fn返回把参数传入对应transformer返回的结果
// 如果所有的 predicate 都不匹配，fn返回undefined
const fn = R.cond([
  [R.equals(0),   R.always('water freezes at 0°C')],
  [R.equals(100), R.always('water boils at 100°C')],
  [R.T,           temp => 'nothing special happens at ' + temp + '°C']
]);
fn(0); //=> 'water freezes at 0°C'
fn(50); //=> 'nothing special happens at 50°C'
fn(100); //=> 'water boils at 100°C'

// ====================== until ======================
// 接受一个推断，一个转变函数 和一个初始值
// 初始值一直调用转变函数直到满足推断，则返回此满足推断的值
R.until(R.gt(R.__, 100), R.multiply(2))(1) // => 128

// ===================== pathSatisfies ================
// 如果某个对象在给定路径的属性满足 predicate, 返回true
// Returns true if the specified object property at given path 
// satisfies the given predicate; false otherwise.

R.pathSatisfies(y => y > 0, ['x', 'y'], {x: {y: 2}}); //=> true
R.pathSatisfies(R.is(Object), [], {x: {y: 2}}); //=> true

// ==================== propSatisfies ===================
// 如果特定的对象属性满足 predicate, 返回true
// Returns true if the specified object property satisfies the given
// predicate; false otherwise. You can test multiple properties with R.where.
R.propSatisfies(x => x > 0, 'x', {x: 1, y: 2}); //=> true
