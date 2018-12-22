import _ from "lodash";
import {LOGIN_USER} from "../actions/login";

//Reducer listening to different action types
//initial state is {}
export default function(state = {}, action) {
    switch (action.type) {
      //target 
    //   case LOGIN_USER:
    //     return _.mapKeys(action.payload.data, "user_id");
      default:
        return state;
    }
  }