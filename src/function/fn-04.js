/**
 * @file Function
 * 
 * 1. ascend
 * 2. descend
 * 3. construct
 * 4. invoker
 * 5. flip
 */

// ======================== ascend ============================
// 接受一个函数，此返回值可以 > 和 < 进行比较。 基于此函数生成一个升序排列的比较函数
const byAge = R.ascend(R.prop('age'))
const people = [
  { name: 'Emma', age: 70 },
  { name: 'Peter', age: 78 },
  { name: 'Mikhail', age: 62 },
]

R.sort(byAge, people)
// [
//   { name: 'Mikhail', age: 62 },
//   { name: 'Emma', age: 70 }, 
//   { name: 'Peter', age: 78 }
// ]

// ========================== descend ==========================
// 接受一个函数，此返回值可以 > 和 < 进行比较。 基于此函数生成一个降序排列的比较函数
const byAgeDesc = R.descend(R.prop('age'))
R.sort(byAgeDesc, people)
// [
//   { name: 'Peter', age: 78 },
//   { name: 'Emma', age: 70 }, 
//   { name: 'Mikhail', age: 62 },
// ]

// ========================== construct =========================
// 将构造函数封装进柯里化函数，新函数与原构造函数的传入参数类型及返回值类型相同。
// Constructor function
function Animal(kind) {
  this.kind = kind;
};
Animal.prototype.sighting = function() {
  return "It's a " + this.kind + "!";
}

const AnimalConstructor = R.construct(Animal)

// Notice we no longer need the 'new' keyword:
AnimalConstructor('Pig'); //=> {"kind": "Pig", "sighting": function (){...}};

const animalTypes = ["Lion", "Tiger", "Bear"];
const animalSighting = R.invoker(0, 'sighting');
const sightNewAnimal = R.compose(animalSighting, AnimalConstructor);
R.map(sightNewAnimal, animalTypes); 
//=> ["It's a Lion!", "It's a Tiger!", "It's a Bear!"]

// ========================== invoker ===============================
// 将一个具名函数用一个特定“元”转换成一个函数，此函数可用提供的参数和一个目标对象直接调用
// 转换后的函数已被柯里化，接受 n + 1 个参数
// 最后一个参数即为目标对象，其余参数传入invoker接受的具名函数
const sliceFrom = R.invoker(1, 'slice');
sliceFrom(6, 'abcdefghijklm'); //=> 'ghijklm'
const sliceFrom6 = R.invoker(2, 'slice')(6);
sliceFrom6(8, 'abcdefghijklm'); //=> 'gh'

const dog = {
  speak: async () => 'Woof!'
};
const speak = R.invoker(0, 'speak');
speak(dog).then(console.log) //~> 'Woof!'

// ========================= flip ==============================
// 交换给定函数前两个参数的位置
const mergeThree = (a, b, c) => [].concat(a, b, c);
mergeThree(1, 2, 3); //=> [1, 2, 3]
R.flip(mergeThree)(1, 2, 3); //=> [2, 1, 3]
