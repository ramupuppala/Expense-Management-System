// npm dependencies
import { combineReducers }          from 'redux';

//reducers imports
import CategoryReducer from './categoriesReducer';
import BudgetReducer from './budgetReducer';
/**
 * Combine all reducers into root reducer
 */
const rootReducer = combineReducers({
  CategoryReducer,
  BudgetReducer
  });
  
  export default rootReducer;