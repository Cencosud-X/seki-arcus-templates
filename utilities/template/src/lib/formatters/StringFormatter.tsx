class StringFormatter {

    capFirstLetter(string: string): string {
      if (!string) return string;
      return string[0].toUpperCase() + string.substr(1).toLowerCase();
    }
  }
  
  export default new StringFormatter();