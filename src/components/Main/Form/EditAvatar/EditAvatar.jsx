// components/Main/Form/EditAvatar/EditAvatar.jsx
import { useState, useEffect } from "react";
import { isValidUrl } from "../../../../utils/validators";

function EditAvatar({ avatar, onAvatarChange, onValidationChange }) {
    const [localAvatar, setLocalAvatar] = useState("");
    const [urlError, setUrlError] = useState(false);
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    // Cuando el popup se abre, ignoramos el avatar inicial
    useEffect(() => {
        if (isInitialLoad) {
            setLocalAvatar("");
            setIsInitialLoad(false);
        }
    }, [isInitialLoad]);

    // Validar cuando cambia localAvatar y actualizar el estado de validación
    useEffect(() => {
        if (localAvatar.trim() === "") {
            setUrlError(false);
            onValidationChange?.(false);  // Campo vacío = no válido
        } else {
            const isValid = isValidUrl(localAvatar);
            setUrlError(!isValid);
            onValidationChange?.(isValid);  // ← Pasar true si es válido
        }
    }, [localAvatar, onValidationChange]);

    const handleChange = (e) => {
        const newValue = e.target.value;
        setLocalAvatar(newValue);
        
        // Crear evento sintético para el padre
        const syntheticEvent = {
            target: {
                value: newValue
            }
        };
        onAvatarChange(syntheticEvent);
    };

    return (
        <div className="popup__input-container">
            <input
                className={`popup__input popup__input_type_avatar-url ${urlError ? 'popup__input_type_error' : ''}`}
                placeholder="Ingresa un enlace de imagen válido para tu avatar"
                type="url"
                value={localAvatar}
                onChange={handleChange}
                required
            />
            <span className={`popup__error ${urlError ? 'popup__error_visible' : ''}`}>
                {urlError ? 'URL no válida' : ''}
            </span>
        </div>
    );
}

export default EditAvatar;