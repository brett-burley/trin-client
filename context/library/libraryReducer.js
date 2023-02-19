import { library_t } from '../types';
import _ from 'lodash';

export default (state, action) => {
  const { type, payload } = action

  switch (type) {
    case library_t.LIBRARY_SUCCESS:
      return {
        ...state,
        ...payload
      }
    case library_t.LIBRARY_ERROR:
    default:
      return state
  }
}
