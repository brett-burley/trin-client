import storage from '../../lib/storage/storage';
import _ from 'lodash';

const modes = { read: false, listen: true, learn: false };

export const initModes = modes;

export const initState = {...modes};

export const mode_t = {
  MODE_SUCCESS: 'MODE_SUCCESS',
  MODE_LOADED: 'MODE_LOADED',
  MODE_ERROR: 'MODE_ERROR',
};
