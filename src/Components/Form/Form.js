import styles from './Form.module.css';
import Button from '../UI/Button';
import FormAlert from './FormAlert';
import Card from '../UI/Card';
import { useState } from 'react';

const Form = props => {
    const [usernameInput, setUsernameInput] = useState('');
    const [ageInput, setAgeInput] = useState('');
    const [isValid, setIsValid] = useState(true);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertTitle, setAlertTitle] = useState('');

    const usernameHandler = e => {
        setUsernameInput(e.target.value);
    };

    const ageHandler = e => {
        setAgeInput(e.target.value);
    };

    const formHandler = e => {
        e.preventDefault();
        if (!usernameInput.trim() || !ageInput.trim()) {
            setIsValid(false);
            setAlertMessage('Please enter a valid name and age (non-empty values).');
            setAlertTitle('Missing inputs');
            return;
        }
        if (parseInt(ageInput) < 1) {
            setIsValid(false);
            setAlertMessage('Please enter a valid age (>0).');
            setAlertTitle('Invalid age input');
            return;
        }
        props.onSubmit(usernameInput, ageInput);
        setUsernameInput('');
        setAgeInput('');
    };

    const onCloseAlert = () => {
        setIsValid(true);
    };

    return (
        <>
            {!isValid && <FormAlert onClose={onCloseAlert} title={alertTitle} message={alertMessage} />}
            <Card className={styles.input}>
                <form onSubmit={formHandler}>
                    <label htmlFor="username">Username</label>
                    <input value={usernameInput} id="username" type="text" onChange={usernameHandler} />
                    <label htmlFor="age">Age (Years)</label>
                    <input value={ageInput} id="age" type="number" onChange={ageHandler} />
                    <Button type="submit">Add User</Button>
                </form>
            </Card>
        </>
    );
};

export default Form;
