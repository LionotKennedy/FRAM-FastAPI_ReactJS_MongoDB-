function ValidationRegister(valeur) {
    // alert("")
    let error = {}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/

    if(valeur.name === "") {
        error.name = "Name should pory"
    }
    else {
        error.name = ""
    }
    


    if(valeur.email === "") {
        error.email = "Name should pory"
    }
    else if(!email_pattern.test(valeur.email)) {
        error.email = "Email Didn't match"
    }
    else {
        error.email = ""
    }
    



    if(valeur.pswd === "") {
        error.pswd = "Name should pass"
    }
    else if(!password_pattern.test(valeur.pswd)) {
        error.pswd = "password Didn't match"
    }
    else {
        error.pswd = ""
    }
    return error;
}

export default ValidationRegister