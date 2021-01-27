class DateFormat {

    constructor(format) {
     //   let year = null, month, day, hours, minutes, seconds, amPm, dateSplitter, hourSplitter;
        if (format.year != null) {
            if (format.year !== false) {
                this.year = format.year;
            }
        } else {
            this.year = "YYYY";
        }

        if (format.month != null) {
            if (format.month !== false) {
                this.month = format.month;
            }
        } else {
            this.month = "MM";
        }
        if (format.day != null) {
            if (format.day !== false) {
                this.day = format.day;
            }
        } else {
            this.day = "DD";
        }
        if (format.hours != null) {
            if (format.hours !== false) {
                this.hours = format.hours;
            }
        } else {
            this.hours = "h";
        }
        if (format.minutes != null) {
            if (format.minutes !== false) {
                this.minutes = format.minutes;
            }
        } else {
            this.minutes = "mm";
        }
        if (format.seconds != null) {
            if (format.seconds !== false) {
                this.seconds = format.seconds;
            }
        } else {
            this.seconds = "ss";
        }
        if (format.amPm != null) {
            if (format.amPm !== false) {
                this.amPm = format.amPm;
            }
        } else {
            this.amPm = "a";
        }
        if (format.dateSplitter != null) {
            if (format.dateSplitter !== false) {
                this.dateSplitter = format.dateSplitter;
            }
        } else {
            this.dateSplitter = "-";
        }
        if (format.hourSplitter != null) {
            if (format.hourSplitter !== false) {
                this.hourSplitter = format.hourSplitter;
            }
        } else {
            this.hourSplitter = ":";
        }

    }

    getFormat() {
        let format = "";
        if (this.year) {
            format += this.year;
        }
        if (this.month) {
            if (!format.endsWith(this.dateSplitter)) {
                format += this.dateSplitter;
            }
            format += this.month;
        }
        if (this.day) {
            if (!format.endsWith(this.dateSplitter)) {
                format += this.dateSplitter;
            }
            format += this.day;
        }
        if (this.hours) {
            if (!format.endsWith(" ")) {
                format += " ";
            }
            format += this.hours;
        }
        if (this.minutes) {
            if (!format.endsWith(this.hourSplitter)) {
                format += this.hourSplitter;
            }
            format += this.minutes;
        }
        if (this.seconds) {
            if (!format.endsWith(this.hourSplitter)) {
                format += this.hourSplitter;
            }
            format += this.seconds;
        }
        if (this.amPm) {
            if (!format.endsWith(" ")) {
                format += " ";
            }
            format += this.amPm;
        }
        return format;
    }
}

module.exports = DateFormat;