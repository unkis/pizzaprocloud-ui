import ru from './ru';
import de from './de';

export type langType = 'ru' | 'de';

export type langMapType = {
  'ru': typeof ru,
  'de': typeof de
};

export const langMap: langMapType = {
  'ru': ru,
  'de': de
};
