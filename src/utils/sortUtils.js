const sortByPopularity = (books) => {
    return books.sort((a, b) => b.popularity - a.popularity);
  };
  
  const sortByAvailability = (books) => {
    return books.sort((a, b) => {
      if (a.available === b.available) return 0;
      return a.available ? -1 : 1;
    });
  };
  
  module.exports = {
    sortByPopularity,
    sortByAvailability
  };