function Validation(values) {
    // alert("")
    let error = {}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/
    // const password_pattern = ""

    if(values.email === "") {
        error.email = "Name should pory"
    }
    else if(!email_pattern.test(values.email)) {
        error.email = "Email Didn't match"
    }
    else {
        error.email = ""
    }
    
    if(values.pswd === "") {
        error.pswd = "Name should pass"
    }
    else if(!password_pattern.test(values.pswd)) {
        error.pswd = "password Didn't match"
    }
    else {
        error.pswd = ""
    }
    return error;
}

export default Validation