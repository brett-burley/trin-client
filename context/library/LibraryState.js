import React, { useReducer } from "react";
import LibraryContext from "./libraryContext";
import libraryReducer from "./libraryReducer";
import _ from 'lodash';

import { initState } from './init.js';
import { library_t } from '../types';
import titles from '../../assets/books/titles';

const LibraryState = (props) =>
{
  const [state, dispatch] = useReducer(libraryReducer, initState);

  return (
    <LibraryContext.Provider
      value={{
        titles: titles.all,
      }}
    >
      {props.children}
    </LibraryContext.Provider>
  );
};

export default LibraryState;
