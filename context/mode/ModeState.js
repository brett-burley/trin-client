import React, { useReducer } from "react";
import ModeContext from "./modeContext";
import modeReducer from "./modeReducer";
import { initState, initModes, mode_t } from './init.js';
import storage from '../../lib/storage/storage';
import _ from 'lodash';


const ModeState = (props) =>
{
  const [state, dispatch] = useReducer(modeReducer, initState);

  const modes = {
    read: state.read,
    listen: state.listen,
    learn: state.learn,
  };


  function getMode()
  {
    try {
      const { read, listen, learn } = state;

      if(read)
        return 'Read';
      else if(listen)
        return 'Listen';
      else
        return 'Learn';
    } catch(err) {
      return '';
    }
  }


  function changeMode(mode)
  {
    try {
      const payload = {read: false, listen: false, learn: false};

      switch(mode) {
        case 'read':
          payload.read = true;
          break;
        case 'listen':
          payload.listen = true;
          break;
        default:
          payload.learn = true;
      }          
      
      storage.saveData('modes', payload);

      dispatch({ type: mode_t.MODE_SUCCESS, payload});
      return true;
    } catch(err) {
      console.error(err);
      return false;
    }
  }
 
  async function loadMode()
  {
    try {
      const mode = await storage.getData('modes');
      const payload = {...mode};

      dispatch({ type: mode_t.MODE_LOADED, payload });
    } catch(err) {
      console.error(err);
      return false;
    }
  }
  return (
    <ModeContext.Provider
      value={{
        modes,
        read: state.read,
        listen: state.listen,
        learn: state.learn,
        loadMode,
        changeMode,
        getMode,
      }}
    >
      {props.children}
    </ModeContext.Provider>
  );
};


async function loadInit()
{
  return storage.getData('modes');
}

export default ModeState;
