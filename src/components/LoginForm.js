import React, { useState } from 'react';

function LoginForm(props) {
    const userDefault = {
        login: {
            value: '',
            error: '',
        },
        password: {
            value: '',
            error: '',
        }
    }

    const [user, setUser] = useState(userDefault);
    const [error, setError] = useState(false)

    function checkValue(value) {
        if(value.length <= 3)  {
            throw new Error('The field is too short!');
        }
    }

    function handleChange(e) {
        const {name: field, value} = e.target;
        if(typeof user[field] !== 'undefined') {
            try {
                checkValue(value);
                setUser({...user, [field]: {value, error: ''} });
            } catch (err) {
                // console.log(err)
                setUser({...user, [field]: {error: err.message} });
            }
        }
    }

    // function throwError() {
    //     throw new Error('Incorrect data!');
    // }

    function handleSubmit(e) {
        e.preventDefault();

        const {tryAuth} = props;
        const {login, password} = e.target.elements;

        const authResp = tryAuth(login.value, password.value);
        if(typeof authResp.then === 'function') { // if return Promise
            authResp.catch(() => setError(true) );
        } else if(!authResp) {
            // throwError()
            setError(true)
        } else {
            console.log('Poprawne dane')
        }
    }

    if(error) {
        throw Error('Error apeared')
    }

    const {login, password} = user;
    // console.log(login)
    return (
        <form onSubmit={ handleSubmit }>
            <p>
                <label>
                    login: <input name="login" value={ login.value } 
                        onChange={e => handleChange(e)} 
                    />
                    { login.error && <strong>{ login.error }</strong> }
                </label>
            </p>
            <p>
                <label>
                    password: <input name="password" value={ password.value } 
                        onChange={e => handleChange(e)} 
                    />
                    { password.error && <strong>{ password.error }</strong> }
                </label>
            </p>
            <p><button>send</button></p>
        </form>
    );
}

export default LoginForm;
