export const convertToEnglishDigits = (str) => {
    const persianDigits = '۰۱۲۳۴۵۶۷۸۹';
    const englishDigits = '0123456789';
    
    return str.replace(/[۰-۹]/g, (w) => englishDigits[persianDigits.indexOf(w)]);
  };
  