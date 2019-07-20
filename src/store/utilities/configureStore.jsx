//npm dependencies
import { createStore, applyMiddleware, compose }       from 'redux'

//reducer imports
import rootReducer                                     from '../reducer/rootReducer';

//service imports
import UserMiddleware                                  from '../middleware/allCategoriesService';

/**
 * Configure the store with reducers and middlewares.
 */
export default function configureStore() {
    return createStore(
      rootReducer,
      compose(applyMiddleware(
        UserMiddleware
      ))
    );
  };
  