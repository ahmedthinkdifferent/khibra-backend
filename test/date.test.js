const assert = require('assert');
const DateTime = require('../app/helpers/DateTimeUtil');
const DateFormat=require('../app/helpers/model/DateFormat');

describe("test date", function () {
    it("should be able to add and complete TODOs", function() {
        const date = DateTime.getCurrentDate(new DateFormat({amPm:false}));
        assert.equal(date,"x","not equal" );
    });
});