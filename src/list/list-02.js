/**
 * @file List
 * 
 * 1. includes
 * 2. head
 * 3. last
 * 4. init
 * 5. tail
 * 6. take
 * 7. drop
 * 8. takeLast
 * 9. dropLast
 */

// ======================== includes =========================
// 只要列表中有一个元素等于指定值，则返回 true；否则返回 false。也可用于字符串
// 通过 R.equals 函数进行相等性判断。
R.includes(3, [1, 2, 3]); //=> true
R.includes(4, [1, 2, 3]); //=> false
R.includes({ name: 'Fred' }, [{ name: 'Fred' }]); //=> true
R.includes([42], [[42]]); //=> true
R.includes('ba', 'banana'); //=>true

// ======================== head ============================
// 返回数组或字符串的第一个元素
R.head(['fi', 'fo', 'fum']); //=> 'fi'
R.head([]); //=> undefined

R.head('abc'); //=> 'a'
R.head(''); //=> ''

// ====================== last =========================
// 返回数组或字符串的最后一个元素
R.last(['fi', 'fo', 'fum']); //=> 'fum'
R.last([]); //=> undefined

R.last('abc'); //=> 'c'
R.last(''); //=> ''

// ==================== init ===========================
// 返回 list 或 string 删除最后一个元素后的部分
R.init([1, 2, 3]);  //=> [1, 2]
R.init([1, 2]);     //=> [1]
R.init([1]);        //=> []
R.init([]);         //=> []

R.init('abc');  //=> 'ab'
R.init('ab');   //=> 'a'
R.init('a');    //=> ''
R.init('');     //=> ''

// ==================== tail ==========================
// 返回数组或字符串(或有tail方法的对象)删除第一个元素后的部分
// 如果第一个参数自身存在 slice 方法，则调用自身的 slice 方法
R.tail([1, 2, 3]);  //=> [2, 3]
R.tail([1, 2]);     //=> [2]
R.tail([1]);        //=> []
R.tail([]);         //=> []

R.tail('abc');  //=> 'bc'
R.tail('ab');   //=> 'b'
R.tail('a');    //=> ''
R.tail('');     //=> ''

// ==================== take =====================
// Returns the first n elements of the given list, string, 
// or transducer/transformer (or object with a take method).
// 如果第二个参数自身存在 take 方法，则调用自身的 take 方法
R.take(1, ['foo', 'bar', 'baz']); //=> ['foo']
R.take(2, ['foo', 'bar', 'baz']); //=> ['foo', 'bar']
R.take(3, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']
R.take(4, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']
R.take(3, 'ramda');               //=> 'ram'

// =================== drop =====================
// Returns all but the first n elements of the given list, string,
// or transducer/transformer (or object with a drop method).
// Dispatches to the drop method of the second argument, if present
R.drop(1, ['foo', 'bar', 'baz']); //=> ['bar', 'baz']
R.drop(2, ['foo', 'bar', 'baz']); //=> ['baz']
R.drop(3, ['foo', 'bar', 'baz']); //=> []
R.drop(4, ['foo', 'bar', 'baz']); //=> []
R.drop(3, 'ramda');               //=> 'da'

// ==================== takeLast ======================
// Returns a new list containing the last n elements of the given list.
// If n > list.length, returns a list of list.length elements.
R.takeLast(1, ['foo', 'bar', 'baz']); //=> ['baz']
R.takeLast(2, ['foo', 'bar', 'baz']); //=> ['bar', 'baz']
R.takeLast(3, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']
R.takeLast(4, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']
R.takeLast(3, 'ramda');               //=> 'mda'

// ====================== dropLast ====================
// Returns a list containing all but the last n elements of the given list.
// Acts as a transducer if a transformer is given in list position.
R.dropLast(1, ['foo', 'bar', 'baz']); //=> ['foo', 'bar']
R.dropLast(2, ['foo', 'bar', 'baz']); //=> ['foo']
R.dropLast(3, ['foo', 'bar', 'baz']); //=> []
R.dropLast(4, ['foo', 'bar', 'baz']); //=> []
R.dropLast(3, 'ramda');               //=> 'ra'
