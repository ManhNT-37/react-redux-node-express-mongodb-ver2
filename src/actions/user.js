import { SINGUP } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const createUser = (post) => async (dispatch) => {
    try {
      const { data } = await api.signUp(post);
  
      dispatch({ type: SINGUP, payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };