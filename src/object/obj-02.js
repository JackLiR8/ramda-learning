/**
 * @file Object
 * 
 * 1. has
 * 2. hasIn
 * 3. hasPath
 * 4. keys
 * 5. keysIn
 * 6. values
 * 7. valuesIn
 * 8. toPairs
 * 9. toPairsIn
 * 10. objOf
 */

// ========================= has ==========================
// 如果对象自身含有指定的属性，则返回 true；否则返回 false
const hasName = R.has('name');
hasName({name: 'alice'});   //=> true
hasName({name: 'bob'});     //=> true
hasName({});                //=> false

const point = {x: 0, y: 0};
const pointHas = R.has(R.__, point);
pointHas('x');  //=> true
pointHas('y');  //=> true
pointHas('z');  //=> false

// ======================= hasIn ===========================
// 如果对象自身或其原型链上含有指定的属性，则返回 true；否则返回 false
function Rectangle(width, height) {
  this.width = width;
  this.height = height;
}
Rectangle.prototype.area = function() {
  return this.width * this.height;
};

const square = new Rectangle(2, 2);
R.hasIn('width', square);  //=> true
R.hasIn('area', square);  //=> true

// ======================= hasPath =========================
// 检查对象中是否存在指定的路径。只检查对象自身的属性
R.hasPath(['a', 'b'], {a: {b: 2}});         // => true
R.hasPath(['a', 'b'], {a: {b: undefined}}); // => true
R.hasPath(['a', 'b'], {a: {c: 2}});         // => false
R.hasPath(['a', 'b'], {});                  // => false

// ====================== keys ==========================
// 返回给定对象所有可枚举的、自身属性的属性名组成的列表。
// 注意，不同 JS 运行环境输出数组的顺序可能不一致
R.keys({a: 1, b: 2, c: 3}); //=> ['a', 'b', 'c']

// ====================== keysIn ==========================
// 返回给定对象所有属性（包括 prototype 属性）的属性名组成的列表。
// 注意，不同 JS 运行环境输出数组的顺序可能不一致
const F = function() { this.x = 'X'; };
F.prototype.y = 'Y';
const f = new F();
R.keysIn(f); //=> ['x', 'y']

// ======================= values =======================
// 返回对象所有自身可枚举的属性的值。注意：不同 JS 运行环境输出数组的顺序可能不一致。
R.values({a: 1, b: 2, c: 3}); //=> [1, 2, 3]

// ======================= valuesIn =======================
// 返回对象所有属性的值，包括原型链上的属性。
// 注意：不同 JS 运行环境输出数组的顺序可能不一致。
const F1 = function() { this.x = 'X'; };
F1.prototype.y = 'Y';
const f1 = new F1();
R.valuesIn(f1); //=> ['X', 'Y']

// ===================== toPairs =========================
// 将一个对象的属性转换成键、值二元组类型的数组，只处理对象自身的属性。
// 注意：不同 JS 运行环境输出数组的顺序可能不一致。
R.toPairs({a: 1, b: 2, c: 3}); //=> [['a', 1], ['b', 2], ['c', 3]]

// =================== toPairsIn ==========================
// 将一个对象的属性转换成键、值二元组类型的数组，包括原型链上的属性。
// 注意，不同 JS 运行环境输出数组的顺序可能不一致。
const F2 = function() { this.x = 'X'; };
F2.prototype.y = 'Y';
const f2 = new F2();
R.toPairsIn(f2); //=> [['x','X'], ['y','Y']]

// ==================== objOf ===========================
// 创建一个包含单个键值对的对象
R.objOf('a', 1) //=> { a: 1 }
const matchPhrases = R.compose(
  R.objOf('must'),
  R.map(R.objOf('match_phrase'))
);
matchPhrases(['foo', 'bar', 'baz']); 
/* 
{
  must: [
    {match_phrase: 'foo'}, 
    {match_phrase: 'bar'}, 
    {match_phrase: 'baz'}
  ]
} */
