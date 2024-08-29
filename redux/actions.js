// src/redux/actions.js

export const ADD_FAVORITE = 'ADD_FAVORITE';
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE';

export const addFavorite = (character) => ({
  type: ADD_FAVORITE,
  payload: character,
});

export const removeFavorite = (characterId) => ({
  type: REMOVE_FAVORITE,
  payload: characterId,
});
