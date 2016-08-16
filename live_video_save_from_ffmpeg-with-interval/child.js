/**
 * Created by Administrator on 2/13/2015.
 */
var specialNumber = process.env.specialNumber;

console.log(typeof(specialNumber));
// -> "string"
console.log(typeof(parseInt(specialNumber, 10)));
// -> "numb