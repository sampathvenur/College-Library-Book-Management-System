const removeDuplicates = (arr) => {
    return Array.from(new Set(arr));
  };
  
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
  
  module.exports = {
    removeDuplicates,
    shuffleArray
  };