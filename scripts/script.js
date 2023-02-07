const firstName = document.getElementById('firstName')
const lastName = document.getElementById('lastName')
const email = document.getElementById('email')
const password = document.getElementById('password')
const passwordCheck = document.getElementById('passwordCheck')
const agreed = document.getElementById('agreed')

const btn = document.getElementById('form__btn')

const formValid = { firstName: false, lastName: false, email: false, password: false, passwordCheck: false, agreed: false }

const alertedFields = [firstName, lastName, email]

const formErrorsBlock = document.getElementById('box__errors')

alertedFields.forEach((elem) => {
    elem.addEventListener('blur', notFilled)
    elem.addEventListener('input', setValid)
})

password.addEventListener('blur', wrongPassword)
password.addEventListener('input', setValid)

passwordCheck.addEventListener('blur', equalPassword)
passwordCheck.addEventListener('input', setValid)

agreed.addEventListener('click', isAgreed)

function isAgreed(event) {
    if (event.target.checked === false) {
        formValid[event.target.id] = false
    } else {
        formValid[event.target.id] = true
    }
}

function equalPassword(event) {
    if (password.value !== passwordCheck.value) {
        setFieldInvalid(event)
    }
}

function wrongPassword(event) {
    const splitedPassword = event.target.value.split('')

    let hasNumber = false
    let hasUpperLetter = false
    let hasLowerLetter = false
    let hasEightSymbols = splitedPassword.length >= 8

    splitedPassword.forEach((item) => {
        if (item !== " ") {
            if (item == parseInt(item)) {
                hasNumber = true
            } else {
                if (item === item.toUpperCase()) {
                    hasUpperLetter = true
                }
                if (item === item.toLowerCase()) {
                    hasLowerLetter = true
                }
            }

        }

    })

    if (!(hasNumber && hasEightSymbols && hasLowerLetter && hasUpperLetter)) {
        setFieldInvalid(event)
    }
}

function notFilled(event) {
    if (!event.target.value) {
        setFieldInvalid(event)
    }
    console.log(formValid);
}

function setValid(event) {
    formValid[event.target.id] = true
    event.target.parentNode.classList.remove('box__item--warning')
}


function submitForm() {
    checkFieldsFilled()
    checkPasswordFields()
    checkChecboxField()

    if (!Object.values(formValid).includes(false)) {
        alert('Sucess')
    }
}


function checkFieldsFilled() {
    if (!(formValid.firstName && formValid.lastName && formValid.email)) {
        formErrorsBlock.classList.add('box__errors--not-filled')
    } else {
        formErrorsBlock.classList.remove('box__errors--not-filled')
    }
}

function checkPasswordFields() {
    if (!(formValid.password && formValid.passwordCheck)) {
        formErrorsBlock.classList.add('box__errors--password-error')
    } else {
        formErrorsBlock.classList.remove('box__errors--password-error')
    }
}

function checkChecboxField() {
    if (!formValid.agreed) {
        formErrorsBlock.classList.add('box__errors--checkbox-error')
    } else {
        formErrorsBlock.classList.remove('box__errors--checkbox-error')
    }
}

function setFieldInvalid(event) {
    formValid[event.target.id] = false
    event.target.parentNode.classList.add('box__item--warning')
}

btn.addEventListener('click', submitForm)