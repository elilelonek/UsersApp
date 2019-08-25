class httpresponse {
    constructor() {
        this.success = true;
        this.redirect = "";
        this.error = false;
        this.message = "";
        this.spinnertext = ""
        this.data = [];
    }
}

module.exports = httpresponse;