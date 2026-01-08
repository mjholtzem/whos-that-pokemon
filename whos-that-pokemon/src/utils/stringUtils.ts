 /**
  * Capitalizes the first letter of each word in the given string
  * @param str string to transform
  * @returns a copy of the original string with first letters capitalized
  */
 export function capitalizeWords (str: string): string {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };