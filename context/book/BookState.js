import React, { useReducer } from "react";
import BookContext from "./bookContext";
import bookReducer from "./bookReducer";
import _ from 'lodash';
import { book } from '../../assets/books/book';
import net from '../../lib/net/'
import { initState, book_t} from './init.js';
import storage from '../../lib/storage/storage';
import { lineToChars } from '../../lib/text/typography';


const BookState = (props) =>
{
  const [state, dispatch] = useReducer(bookReducer, initState);


  async function translateText(line)
  {
    try {
      const saved = await net.post('speech/text', { line })
      if(!saved) {
        throw new Error('Could not translate text');
      }
      return true;
    } catch(err) {
      return false;
    }
  }

/**
 Send API character to check / create audio file
 RETURNS true
**/
  async function translateChar(character)
  {
    try {
      const exists = await net.post('speech/charExists', { character });
      if(!exists) {
        const saved = await net.post('speech/char', { character });
        if(!saved)
          throw new Error('character could not be translated');
        return true;
      }
      return true;
    } catch(err) {
      console.error(err);
      return false;
    }
  }


  function prevSentence()
  {
    try {
      const { cIndex, sIndex, chapter } = state;
      const length = chapter.length;

      if(!length || sIndex < 1)
        return false;

      const index = sIndex - 1;
      const sentence = chapter[index];
      const line = chapter[index][0];
      const characters = lineToChars(line.chinese);
      const payload = {
        sentence,
        line,
        characters,
        sIndex: index,
        lIndex: 0
      };

      storage.saveData('positions', { cIndex, sIndex: index, lIndex: 0 });

      dispatch({ type: book_t.BOOK_SUCCESS, payload });
      return true;
    } catch(err) {
      dispatch({ type: book_t.BOOK_ERROR, payload: err });
      return false;
    }
  }



  function nextSentence()
  {
    try {
      const { cIndex, sIndex, chapter } = state;
      const length = chapter.length;

      if(!length || sIndex >= length)
        return false;

      const index = sIndex + 1;
      const sentence = chapter[index];
      const line = chapter[index][0];
      const characters = lineToChars(line.chinese);
      const payload = {
        sentence,
        line,
        characters,
        sIndex: index,
        lIndex: 0
      };


      storage.saveData('positions', { cIndex, sIndex: index, lIndex: 0 });
      
      dispatch({ type: book_t.BOOK_SUCCESS, payload });
      return true;

    } catch(err) {
      dispatch({ type: book_t.BOOK_ERROR, payload: err });
      return false;
    }
  }


  function changeLine(amount)
  {
    try {
      const { sentence, cIndex, sIndex, lIndex} = state;
      const length = sentence.length;
      const index = lIndex + amount;

      if(!length || (index >= length && index < 1))
        return false;

      const line = sentence[index];
      const characters = lineToChars(line.chinese);
      const payload = {
        line,
        characters,
        lIndex: index
      };

      
      storage.saveData('positions', {cIndex, sIndex, lIndex: index });
      
      dispatch({ type: book_t.BOOK_SUCCESS, payload });
      return true;

    } catch(err) {
      dispatch({ type: book_t.BOOK_ERROR, payload: err });
      return false;
    }
  }


  function nextLine()
  {
    try {
      const { sentence, cIndex, sIndex, lIndex } = state;
      const length = sentece.length;

      if(!length || lIndex >= length)
        return false;

      const index = lIndex + 1;
      const payload = {
        line: sentence[index],
        lIndex: index
      };


      storage.saveData('positions', { cIndex, sIndex, lIndex: index });
      
      dispatch({ type: book_t.BOOK_SUCCESS, payload });
      return true;

    } catch(err) {
      dispatch({ type: book_t.BOOK_ERROR, payload: err });
      return false;
    }
  }


  function prevLine()
  {
    try {
      const { cIndex, sIndex, lIndex, sentence } = state;
      const length = sentence.length;

      if(!length || lIndex < 1)
        return false;

      const index = sIndex - 1;
      const payload = {
        line: sentence[index],
        lIndex: index
      };

      storage.saveData('positions', { cIndex, sIndex, lIndex: index });

      dispatch({ type: book_t.BOOK_SUCCESS, payload });
      return true;
    } catch(err) {
      dispatch({ type: book_t.BOOK_ERROR, payload: err });
      return false;
    }
  }


  async function loadBook(id)
  {
    try {
      let positions = { cIndex: 0, sIndex: 0, lIndex: 0 };
      const saved = await storage.getData('positions');
      if(saved)
        positions = saved;

      const { cIndex, sIndex, lIndex } = positions;
      const chapter = book[cIndex];
      const sentence = chapter[sIndex];
      const line = sentence[lIndex];
      const characters = lineToChars(line.chinese);
      const payload = { chapter, sentence, line, characters, cIndex, sIndex, lIndex };

      dispatch({ type: book_t.BOOK_LOADED, payload });
      return true;
    } catch(err) {
      dispatch({ type: book_t.BOOK_ERROR, payload: err});
      return false;
    }
  }

  function jumpSentence(index)
  {
    try {
      const { cIndex, sIndex, chapter } = state;
      const length = chapter.length;

      if(!length || index < 0 || index >= length)
        return false;
     
      const payload = {
        sentence: chapter[index],
        line: chapter[index][0],
        sIndex: index,
        lIndex: 0
      }  
      
      storage.savePositions({ cIndex, sIndex: index, lIndex: 0 });

        dispatch({ type: book_t.BOOK_SUCCESS, payload });
        return true;
      } catch(err) {
        dispatch({ type: book_t.BOOK_ERROR, payload: err });
        return false;
      }
  }

  
  function getPosition()
  {
    const position = {
      cIndex: '',
      sIndex: '',
      lIndex: '',
      sStart: true,
      sEnd: true,
      lStart: true,
      lEnd: true,
    };

    try {
      const { chapter, sentence, cIndex, sIndex, lIndex } = state;
      position.cIndex = cIndex;
      position.sIndex = sIndex;
      position.lIndex = lIndex;
      position.sStart = sIndex === 0;
      position.sEnd = sIndex >= (chapter.length-1);
      position.lStart = lIndex === 0;
      position.lEnd = lIndex >= (sentence.length-1);

      return position;
    } catch(err) {
      console.error(err);
      return position;
    }
  }


  return (
    <BookContext.Provider
      value={{
        cIndex: state.cIndex,
        sIndex: state.sIndex,
        lIndex: state.lIndex,
        sentence: state.sentence,
        line: state.line,
        characters: state.characters,
        loadBook,
        nextSentence,
        prevSentence,
        changeLine,
        getPosition,
        translateText,
        translateChar,
      }}
    >
      {props.children}
    </BookContext.Provider>
  );
};

export default BookState;
