// Object.defineProperty(Array.prototype, 'chunk', {
//   value: function (chunkSize) {
//     const that = this;
//     return Array(Math.ceil(that.length / chunkSize))
//       .fill()
//       .map(function (_, i) {
//         return that.slice(i * chunkSize, i * chunkSize + chunkSize);
//       });
//   },
// });

export default function chunkArray(myArray, chunk_size) {
  const results = [];

  while (myArray.length) {
    results.push(myArray.splice(0, chunk_size));
  }

  return results;
}
