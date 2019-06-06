'use strict';

import {
  GRANULE_CSV,
  GRANULE_CSV_INFLIGHT,
  GRANULE_CSV_ERROR
} from '../actions/types';

export const initialState = {
  list: {
    data: [],
    meta: {},
    params: {}
  },
  csvData: {},
  dropdowns: {},
  map: {},
  meta: {},
  reprocessed: {},
  removed: {},
  reingested: {},
  recovered: {},
  executed: {},
  deleted: {},
  recent: {}
};

export default function reducer (state = initialState, action) {
  state = Object.assign({}, state);
  let csvData, nextState;

  switch (action.type) {
    case GRANULE_CSV:
      console.log('in reducer for csv file');
      console.log(action.data);
      csvData = { data: action.data, inflight: false, error: null };
      nextState = Object.assign(state, csvData);
      break;
    case GRANULE_CSV_INFLIGHT:
      csvData = { data: state.data, inflight: true, error: state.error };
      nextState = Object.assign(state, csvData);
      break;
    case GRANULE_CSV_ERROR:
      csvData = { data: state.data, inflight: false, error: action.error };
      nextState = Object.assign(state, csvData);
      break;
  }
  return nextState || state;
}
