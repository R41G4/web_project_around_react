// components/Main/Form/EditProfile/EditProfile.jsx
/*
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
*/

// src/components/Main/Form/EditProfile/EditProfile.jsx
import { useContext, useRef, useEffect } from "react";
import { CurrentUserContext } from "../../../../contexts/CurrentUserContext";

const EditProfile = () => {
    const { currentUser, handleUpdateUser } = useContext(CurrentUserContext);
    
    const nameRef = useRef();
    const aboutRef = useRef();

    useEffect(() => {
        if (currentUser && nameRef.current && aboutRef.current) {
            nameRef.current.value = currentUser.name || "";
            aboutRef.current.value = currentUser.about || "";
        }
    }, [currentUser]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const name = nameRef.current?.value || "";
        const about = aboutRef.current?.value || "";
        
        handleUpdateUser({ name, about });
    };

    return (
        <form 
            className="popup__form" 
            id="edit-profile-form" 
            noValidate
            onSubmit={handleSubmit}
        >
            <div className="popup__input-container">
                <input 
                    className="popup__input popup__input_type_name" 
                    name="name" 
                    placeholder="Nombre" 
                    type="text" 
                    required 
                    minLength="2" 
                    maxLength="40" 
                    ref={nameRef}
                />
                <span className="popup__error" id="name-input-error"></span>
            </div>

            <div className="popup__input-container">
                <input 
                    className="popup__input popup__input_type_description" 
                    name="about" 
                    placeholder="Acerca de mí" 
                    type="text" 
                    required 
                    minLength="2" 
                    maxLength="200" 
                    ref={aboutRef}
                />
                <span className="popup__error" id="about-input-error"></span>
            </div>
            
            <button className="popup__button" type="submit">
                Guardar
            </button>
        </form>
    );
};

export default EditProfile;