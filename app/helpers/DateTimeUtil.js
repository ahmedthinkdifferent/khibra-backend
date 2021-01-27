const moment = require('moment');
const DateFormat = require('./model/DateFormat');

class DateTimeUtil {

    /**
     *
     * @param {DateFormat} dateFormat
     * @returns {string}
     */
    static getCurrentDate(dateFormat = new DateFormat()) {
        return DateTimeUtil.getDateFormated(new Date(), dateFormat.getFormat());
    }

    /**
     * format date
     * @param date
     * @param {DateFormat} dateFormat
     */
    static formatDate(date, dateFormat = new DateFormat()) {
        return DateTimeUtil.getDateFormated(date, dateFormat.getFormat());
    }


    static getDateFormated(date, format) {
        return new moment(date).format(format);
    }

}

module.exports = DateTimeUtil;