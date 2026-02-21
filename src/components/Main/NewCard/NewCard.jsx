// components/Main/Form/NewCard/NewCard.jsx
import { useState, useEffect } from "react";
import { isValidUrl } from "../../../utils/validators";

function NewCard({ onTitleChange, onLinkChange, onValidationChange }) {
    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");
    const [titleError, setTitleError] = useState({ show: false, message: '' });
    const [linkError, setLinkError] = useState({ show: false, message: '' });

    // Validar cuando cambian los valores
    useEffect(() => {
        // Validar título
        if (title.trim() === "") {
            setTitleError({ show: true, message: 'Campo requerido' });
        } else if (title.length < 3) {
            setTitleError({ show: true, message: 'Mínimo 3 carácter' });
        } else if (title.length > 30) {
            setTitleError({ show: true, message: 'Máximo 30 caracteres' });
        } else {
            setTitleError({ show: false, message: '' });
        }

        // Validar link
        if (link.trim() === "") {
            setLinkError({ show: true, message: 'Campo requerido' });
        } else if (!isValidUrl(link)) {
            setLinkError({ show: true, message: 'URL no válida' });
        } else {
            setLinkError({ show: false, message: '' });
        }

        // Validar formulario completo
        const titleValid = title.trim() !== "" && title.length >= 1 && title.length <= 30;
        const linkValid = link.trim() !== "" && isValidUrl(link);
        const formValid = titleValid && linkValid;
        
        onValidationChange?.(formValid);
    }, [title, link, onValidationChange]);

    const handleTitleChange = (e) => {
        const newTitle = e.target.value;
        setTitle(newTitle);
        onTitleChange?.(e);
    };

    const handleLinkChange = (e) => {
        const newLink = e.target.value;
        setLink(newLink);
        onLinkChange?.(e);
    };

    return (
        <>
            <div className="popup__input-container">
                <input
                    className={`popup__input popup__input_type_card-name ${titleError.show ? 'popup__input_type_error' : ''}`}
                    placeholder="Título"
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                    minLength="1"
                    maxLength="30"
                    required
                />
                <span className={`popup__error ${titleError.show ? 'popup__error_visible' : ''}`}>
                    {titleError.message}
                </span>
            </div>
            <div className="popup__input-container">
                <input
                    className={`popup__input popup__input_type_url ${linkError.show ? 'popup__input_type_error' : ''}`}
                    placeholder="Enlace a la imagen"
                    type="url"
                    value={link}
                    onChange={handleLinkChange}
                    required
                />
                <span className={`popup__error ${linkError.show ? 'popup__error_visible' : ''}`}>
                    {linkError.message}
                </span>
            </div>
        </>
    );
}

export default NewCard;