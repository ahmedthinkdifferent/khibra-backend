const translations = require('../../localization/en');

class LocalizationHelper {


    static translate(key, language = 'en') {
        return translations[key] || key;
    }


}

module.exports = LocalizationHelper;