/* eslint-disable no-restricted-imports */
import { Complain, Grievance } from '../types/Enum.types';

export const getFormatText = (text: string): Grievance | Complain => {

  const textWIthoutSpaces = text.split(' ');

  //join all word capitalized
  for (let i = 0; i < textWIthoutSpaces.length; i++) {
    textWIthoutSpaces[i] =
      textWIthoutSpaces[i].charAt(0).toUpperCase() +
      textWIthoutSpaces[i].slice(1);
  }

  //join all word
  const textJoin = textWIthoutSpaces.join('');

  return textJoin as Grievance | Complain;
};
