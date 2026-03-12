import { fetchAllCharacters } from './characters.model';

export function getAllCharactersService() {
  return fetchAllCharacters().then((characters) => {
    return characters;
  });
}
