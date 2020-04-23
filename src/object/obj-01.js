/**
 * @file Object
 * 
 * 1. pick
 */

// ========================== pick ===========================
// 返回一个局部复制的对象，只包含特定的 key; 非基本类型是浅复制
// 如果给的 key 不存在，则忽略
R.pick(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1, d: 4}
R.pick(['a', 'e', 'f'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1}

console.log(
  pickUser({ user: 'Jack', nickName: 'Big K', height: 186 })
)