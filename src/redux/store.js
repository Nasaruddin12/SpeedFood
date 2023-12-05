import { createStore, combineReducers } from 'redux';
import reducers from './reducers';

const rootReducer = combineReducers({
  categories: reducers
});
const categoriesStore = () => {
  return createStore(rootReducer);
}
export default categoriesStore;