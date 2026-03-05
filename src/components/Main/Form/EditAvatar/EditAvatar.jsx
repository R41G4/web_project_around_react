import { useContext, useRef, useState, useEffect } from "react";
import { CurrentUserContext } from "../../../../contexts/CurrentUserContext";
import { isValidUrl } from "../../../../utils/validators";

const EditAvatar = () => {
    const { handleUpdateAvatar } = useContext(CurrentUserContext);
    
    const avatarRef = useRef();
    const [urlError, setUrlError] = useState(false);

    // Validar cuando cambia el input
    useEffect(() => {
        const checkUrl = () => {
            const value = avatarRef.current?.value || "";
            if (value.trim() === "") {
                setUrlError(false);
            } else {
                setUrlError(!isValidUrl(value));
            }
        };

        // Escuchar cambios en el input manualmente
        const input = avatarRef.current;
        if (input) {
            input.addEventListener('input', checkUrl);
            return () => input.removeEventListener('input', checkUrl);
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const avatar = avatarRef.current?.value || "";
        
        if (avatar && !urlError && isValidUrl(avatar)) {
            handleUpdateAvatar({ avatar });
            avatarRef.current.value = ""; // Limpiar después de enviar
            setUrlError(false);
        }
    };

    return (
        <form 
            className="popup__form" 
            id="avatar-form" 
            noValidate
            onSubmit={handleSubmit}
        >
            <div className="popup__input-container">
                <input
                    className={`popup__input popup__input_type_avatar-url ${urlError ? 'popup__input_type_error' : ''}`}
                    placeholder="Ingresa un enlace de imagen válido para tu avatar"
                    type="url"
                    ref={avatarRef}
                    required
                />
                <span className={`popup__error ${urlError ? 'popup__error_visible' : ''}`}>
                    {urlError ? 'URL no válida' : ''}
                </span>
            </div>
            
            <button 
                className="popup__button" 
                type="submit"
                disabled={urlError}
            >
                Guardar
            </button>
        </form>
    );
};

export default EditAvatar;