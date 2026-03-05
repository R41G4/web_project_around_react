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