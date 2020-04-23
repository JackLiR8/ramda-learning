/**
 * @file Type
 * 
 * 1. is
 * 2. isNil
 * 3. propIs
 * 4. type
 */

// ======================== is ==========================
// 检查一个对象/值是否是给定构造函数的实例，此函数会检查继承链
R.is(Object, {}); //=> true
R.is(Number, 1); //=> true
R.is(Object, 1); //=> false
R.is(String, 's'); //=> true
R.is(String, new String('')); //=> true
R.is(Object, new String('')); //=> true
R.is(Object, 's'); //=> false
R.is(Number, {}); //=> false

// ======================== isNil ========================
// 检查传入的是否是 null 或 undefined
R.isNil(null); //=> true
R.isNil(undefined); //=> true
R.isNil(0); //=> false
R.isNil([]); //=> false

// ======================= propIs ========================
// 如果对象的指定的属性是给定的类型， 返回true
R.propIs(Number, 'x', {x: 1, y: 2});  //=> true
R.propIs(Number, 'x', {x: 'foo'});    //=> false
R.propIs(Number, 'x', {});            //=> false

// ======================= type ==========================
// 返回一个字符串，代表给定值的类型
R.type({}); //=> "Object"
R.type(1); //=> "Number"
R.type(false); //=> "Boolean"
R.type('s'); //=> "String"
R.type(null); //=> "Null"
R.type([]); //=> "Array"
R.type(/[A-z]/); //=> "RegExp"
R.type(() => {}); //=> "Function"
R.type(undefined); //=> "Undefined"
