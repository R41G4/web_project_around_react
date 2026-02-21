// components/Main/Form/EditProfile/EditProfile.jsx
import { useState, useEffect } from "react";

function EditProfile({ name, about, onNameChange, onAboutChange, onValidationChange }) {
    const [nameError, setNameError] = useState({ show: false, message: '' });
    const [aboutError, setAboutError] = useState({ show: false, message: '' });
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        // Validar nombre
        if (!name?.trim()) {
            setNameError({ show: true, message: 'Campo requerido' });
        } else if (name.length < 3) {
            setNameError({ show: true, message: 'Mínimo 3 caracteres' });
        } else {
            setNameError({ show: false, message: '' });
        }

        // Validar about
        if (!about?.trim()) {
            setAboutError({ show: true, message: 'Campo requerido' });
        } else if (about.length < 3) {
            setAboutError({ show: true, message: 'Mínimo 3 caracteres' });
        } else {
            setAboutError({ show: false, message: '' });
        }

        // Validar formulario completo
        const nameValid = name?.trim().length >= 3;
        const aboutValid = about?.trim().length >= 3;
        const formValid = nameValid && aboutValid;
        
        setIsValid(formValid);
        onValidationChange?.(formValid);
    }, [name, about, onValidationChange]);

    return (
        <>
            <div className="popup__input-container">
                <input
                    className={`popup__input popup__input_type_name ${nameError.show ? 'popup__input_type_error' : ''}`}
                    placeholder="Nombre"
                    type="text"
                    value={name || ''}
                    onChange={onNameChange}
                    minLength="2"
                    maxLength="40"
                    required
                />
                <span className={`popup__error ${nameError.show ? 'popup__error_visible' : ''}`}>
                    {nameError.message}
                </span>
            </div>
            <div className="popup__input-container">
                <input
                    className={`popup__input popup__input_type_description ${aboutError.show ? 'popup__input_type_error' : ''}`}
                    placeholder="Acerca de mí"
                    type="text"
                    value={about || ''}
                    onChange={onAboutChange}
                    minLength="2"
                    maxLength="200"
                    required
                />
                <span className={`popup__error ${aboutError.show ? 'popup__error_visible' : ''}`}>
                    {aboutError.message}
                </span>
            </div>
        </>
    );
}

export default EditProfile;