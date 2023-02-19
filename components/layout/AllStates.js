import AlertState from '../../context/alert/AlertState';
import LibraryState from '../../context/library/LibraryState';
import ModeState from '../../context/mode/ModeState';
import BookState from '../../context/book/BookState';
import LineState from '../../context/line/LineState';
import CharactersState from '../../context/characters/CharactersState';

export default function AllStates({ children })
{
  return (
    <AlertState>
      <LibraryState>
        <ModeState>
          <BookState>
            <LineState>
              <CharactersState>
                { children }
              </CharactersState>
            </LineState>
          </BookState>
        </ModeState>
      </LibraryState>
    </AlertState>
  );
}
