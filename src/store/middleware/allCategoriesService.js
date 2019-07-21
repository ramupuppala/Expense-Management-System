//superagent dependencies
import request from 'superagent';
//Action imports
import * as allActions from '../actions/actions.const';
import * as CategoryActions from '../actions/categoryAction';

import * as urlConstants           from '../utilities/configConstant'
/**
 * Communication for frontend and backend(ARTICLES)
 */
const userService = (store) => next => action => {
    next(action)
    switch (action.type) {
     
      case allActions.FETCH_CATEGORIES:
        request.get(urlConstants.url  + "/categories" )
          .then(res => {
            const data = JSON.parse(res.text);
            next(CategoryActions.receiveCategories(data))
          })
          .catch(err => {
            next({ type: "FETCH_CATEGORIES_DATA_ERROR", err });
          });
        break;
      case allActions.FETCH_CATEGORIES_BY_ID:
        request.get(urlConstants.url  + "/categories/"  + `${action.payload}` )
          .then(res => {
            const data = JSON.parse(res.text);
            next(CategoryActions.receiveCategoryById(data))
          })
          .catch(err => {
            next({ type: "FETCH_CATEGORIES_DATA_ERROR", err });
          });
        break;
      case allActions.FETCH_EDIT_CATEGORY:
        console.log(action.payload)
        request.put(urlConstants.url  + "/categories/"  + `${action.payload.id}` )
        .send(action.payload)
          .then(res => {
            const data = JSON.parse(res.text);    
            console.log(data)        
            window.location.href="/"
            // next(CategoryActions.receiveUpdateUser(data))
          })
          .catch(err => {
            next({ type: "FETCH_CATEGORIES_DATA_ERROR", err });
          });
        break;
      case allActions.FETCH_CREATE_CATEGORY:
 
        request.post(urlConstants.url  + "/categories/")
        .send(action.payload)
          .then(res => {
            const data = JSON.parse(res.text);
            console.log(data)
            // next(CategoryActions.receiveCreateUser(data))
          })
          .catch(err => {
            next({ type: "FETCH_CATEGORIES_DATA_ERROR", err });
          });
        break;
      case allActions.FETCH_DELETE_CATEGORY:
        request.delete(urlConstants.url  + "/categories/"  + `${action.payload}`)
          .then(res => {
            // const data = JSON.parse(res.text);
            window.location.href="/"
            // next(CategoryActions.receiveDeleteUser(data))
          })
          .catch(err => {
            next({ type: "FETCH_CATEGORIES_DATA_ERROR", err });
          });
        break;

        default:
         break;
    }
};

export default userService;