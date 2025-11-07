// Utility functions for managing favorites in localStorage

export const getFavorites = () => {
  const favorites = localStorage.getItem('favorites');
  return favorites ? JSON.parse(favorites) : { ophold: [], aktiviteter: [] };
};

export const addToFavorites = (type, item) => {
  const favorites = getFavorites();
  
  // Check if item already exists
  const exists = favorites[type].some(fav => fav._id === item._id);
  
  if (!exists) {
    favorites[type].push(item);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    return true;
  }
  return false;
};

export const removeFromFavorites = (type, id) => {
  const favorites = getFavorites();
  favorites[type] = favorites[type].filter(item => item._id !== id);
  localStorage.setItem('favorites', JSON.stringify(favorites));
};

export const isFavorite = (type, id) => {
  const favorites = getFavorites();
  return favorites[type].some(item => item._id === id);
};
