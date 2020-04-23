/**
 * @file String
 * 
 * 1. match
 * 2. test
 * 3. replace
 * 4. split
 * 5. toLower
 * 6. toUpper
 * 7. toString
 * 8. trim
 */

// ======================== match ===========================
// 用一个字符串测试一个正则，如果没有匹配，返回空数组，这一点和 String.prototype.match
// 不同， 后者无匹配时会返回 null
R.match(/([a-z]a)/g, 'bananas'); //=> ['ba', 'na', 'na']
R.match(/a/, 'b'); //=> []
// R.match(/a/, null); //=> TypeError: null does not have a method named "match"


// ======================== test =========================
// 断定字符串是否匹配给定的正则
R.test(/^x/, 'xyz'); //=> true
R.test(/^y/, 'xyz'); //=> false

// ======================= replace =======================
// 替换一个字符串的子字符串或着正则匹配的子串
// 前两个参数和 String.prototype.replace 的参数相同，所以第二个参数可以是一个函数
R.replace('foo', 'bar', 'foo foo foo'); //=> 'bar foo foo'
R.replace(/foo/, 'bar', 'foo foo foo'); //=> 'bar foo foo'

// Use the "g" (global) flag to replace all occurrences:
R.replace(/foo/g, 'bar', 'foo foo foo'); //=> 'bar bar bar'

// ====================== split =====================
// 用给定的分隔符将字符串分割成数组
const pathComponents = R.split('/');
R.tail(pathComponents('/usr/local/bin/node')); 
//=> ['usr', 'local', 'bin', 'node']

R.split('.', 'a.b.c.xyz.d'); //=> ['a', 'b', 'c', 'xyz', 'd']

// ===================== toLower =======================
// 字符串转为小写
R.toLower('XYZ'); //=> 'xyz'

// ===================== toUpper =====================
// 字符串转为大写
R.toUpper('abc'); //=> 'ABC'

// ===================== toString =======================
// 返回一个给定值的字符串表达方式，输出的值用 eval 执行得到的结果和输入值相同
// 如果给定的值是一个对象类型，且有一个不是 Object.prototype.toString 的toString方法，
// 那么这个 toString 会被触发（不传入参数），并返回结果
// 这意味着用户定义的构造函数需要提供一个合适的 toString 方法
function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.toString = function() {
  return 'new Point(' + this.x + ', ' + this.y + ')';
};

R.toString(new Point(1, 2)); //=> 'new Point(1, 2)'
// 若原型上没定义toString：
// R.toString(new Point(1, 2)); //=> '{"x": 1, "y": 2}'

R.toString(42); //=> '42'
R.toString('abc'); //=> '"abc"'
R.toString([1, 2, 3]); //=> '[1, 2, 3]'
R.toString({foo: 1, bar: 2, baz: 3}); //=> '{"bar": 2, "baz": 3, "foo": 1}'
R.toString(new Date('2001-02-03T04:05:06Z')); 
//=> 'new Date("2001-02-03T04:05:06.000Z")'

// ===================== trim ===========================
// 去除字符串两边的空格
R.trim('   xyz  '); //=> 'xyz'
R.map(R.trim, R.split(',', 'x, y, z')); //=> ['x', 'y', 'z']
