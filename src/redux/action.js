export const ADD_CATEGORIES = 'ADD_CATEGORIES'

export const changeTheme = categories => {
  return {
    type: ADD_CATEGORIES,
    payload: categories
  }
}