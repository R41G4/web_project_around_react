// src/components/Main/Main.jsx
import { useState, useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import Profile from "./Profile/Profile";
import Card from "./Card/Card";
import ImagePopup from "./ImagePopup/ImagePopup";
import Popup from "./Popup/Popup";
import NewCard from "./NewCard/NewCard";
import RemoveCard from "./RemoveCard/RemoveCard";
import EditProfile from "./Form/EditProfile/EditProfile";
import EditAvatar from "./Form/EditAvatar/EditAvatar";

const Main = ({ 
    cards, 
    onCardLike, 
    onCardDelete, 
    onAddPlaceSubmit,
    activePopup, 
    onOpenPopup, 
    onClosePopup 
}) => {
    const { currentUser } = useContext(CurrentUserContext);

    const [selectedImage, setSelectedImage] = useState(null);
    const [cardToRemove, setCardToRemove] = useState(null);

    // ===== HANDLERS =====
    const handleImageClick = (image) => {
        setSelectedImage(image);
        onOpenPopup('image');
    };

    const handleAddCardClick = () => onOpenPopup('newCard');
    const handleEditProfileClick = () => onOpenPopup('editProfile');
    const handleEditAvatarClick = () => onOpenPopup('editAvatar');
    
    // PASO 1: Al hacer clic en eliminar, guardamos la tarjeta y abrimos confirmación
    const handleDeleteClick = (card) => {
        setCardToRemove(card);
        onOpenPopup('removeCard');
    };

    // PASO 2: Al confirmar, ejecutamos la eliminación
    const handleConfirmDelete = () => {
        if (cardToRemove) {
            onCardDelete(cardToRemove);
            closeAllPopups();
        }
    };

    const closeAllPopups = () => {
        onClosePopup();
        setSelectedImage(null);
        setCardToRemove(null);
    };

    // No renderizar hasta que currentUser exista
    if (!currentUser) return null;

    return (
        <main className="content">
            <Profile 
                user={currentUser}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddCard={handleAddCardClick}
            />
            
            <ul className="cards__list">
                {cards.map((card) => (
                    <Card 
                        key={card._id}
                        card={card}
                        onImageClick={() => handleImageClick(card)}
                        // PASO 0: Card llama a handleDeleteClick, NO directamente a onCardDelete
                        onDeleteClick={() => handleDeleteClick(card)}
                        onCardLike={onCardLike}
                    />
                ))}
            </ul>

            {/* POPUP: Nueva Tarjeta */}
            {activePopup === 'newCard' && (
                <Popup isOpen={true} onClose={closeAllPopups}>
                    <NewCard onSubmit={onAddPlaceSubmit} onClose={closeAllPopups} />
                </Popup>
            )}

            {/* POPUP: Editar Perfil */}
            {activePopup === 'editProfile' && (
                <Popup isOpen={true} onClose={closeAllPopups}>
                    <EditProfile />
                </Popup>
            )}

            {/* POPUP: Editar Avatar */}
            {activePopup === 'editAvatar' && (
                <Popup isOpen={true} onClose={closeAllPopups}>
                    <EditAvatar />
                </Popup>
            )}

            {/* POPUP: Confirmar Eliminación */}
            {activePopup === 'removeCard' && (
                <Popup isOpen={true} onClose={closeAllPopups}>
                    <RemoveCard 
                        onConfirm={handleConfirmDelete}
                        onClose={closeAllPopups}
                    />
                </Popup>
            )}

            {/* POPUP: Ver Imagen */}
            <ImagePopup
                card={selectedImage}
                isOpen={activePopup === 'image'}
                onClose={closeAllPopups}
            />
        </main>
    );
};

export default Main;