function showServerErrors(errors) {
    for (key in errors) {
        if (errors[key] != "") {
            this.showError(key, errors[key])
        }
    }
}

function checkValidate(e) {
    let selector = e.target.name;
    let value = e.target.value;

    if (selector == 'name') {
        isName(selector, value)
    }

    if (selector == 'email') {
        isEmail(selector, value)
    }

    if (selector == 'password') {
        isPassword(selector, value)
    }

}

function isName(selector, value) {

    let name = new RegExp('^[a-zA-Z ]+$');

    if (!value) {
        this.showError(selector, 'Name is require !');
    }
    else if (!name.test(value)) {
        this.showError(selector, 'Only space, capital letter and small letter !');
    }
    else if (value.length > 30 || value.length < 5) {
        this.showError(selector, 'Name is between 5 char and 100 char !');
    }
    else {
        this.showValid(selector);
    }
}

function isEmail(selector, value) {

    let email = new RegExp('^[a-z0-9._+-]+@[a-z0-9.-]+\.[a-z]{2,4}$');

    if(!value){
        this.showError(selector, 'Email is require !');
    }
    else if (!email.test(value)) {
        this.showError(selector, 'Email is invalid !');
    }
    else if (value.length > 100 || value.length < 11) {
        this.showError(selector, 'Email is between 11 char and 100 char !');
    }
    else {
        this.showValid(selector);
    }
}

function isPassword(selector, value) {

    if (value.length > 30 || value.length < 8) {
        this.showError(selector, 'Password is between 8 char and 30 char !');
    }
    else {
        this.showValid(selector);
    }
}

function showError(selector, message = null) {
    $("[name='" + selector + "']").addClass('is-invalid');
    $("." + selector).text(message);
}

function showValid(selector) {
    $("[name='" + selector + "']").removeClass('is-invalid');
    $("[name='" + selector + "']").addClass('is-valid');
}