exports.getCurrDateTime = () => {
    // https://stackoverflow.com/questions/5129624/convert-js-date-time-to-mysql-datetime
    var formatedMysqlString = (new Date ((new Date((new Date(new Date())).toISOString() )).getTime() - ((new Date()).getTimezoneOffset()*60000))).toISOString().slice(0, 19).replace('T', ' ');
    console.log( 'getCurrDateTime: ' + formatedMysqlString );
    return formatedMysqlString;
};
