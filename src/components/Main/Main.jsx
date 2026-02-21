import { useState } from "react";

import Profile from "./Profile/Profile";
import Card from "./Card/Card";
import ImagePopup from "./ImagePopup/ImagePopup";
import Form from "./Form/Form";
import Popup from "./Popup/Popup";
import NewCard from "./NewCard/NewCard";
import RemoveCard from "./RemoveCard/RemoveCard";
import EditProfile from "./Form/EditProfile/EditProfile";
import EditAvatar from "./Form/EditAvatar/EditAvatar";


const Main = () => {
    // ===== ESTADO DE USUARIO =====
    const [currentUser, setCurrentUser] = useState({
        name: "Luis García",
        about: "Explorador",
        avatar: "./images/avatar.jpg",
        _id: "5d1f0611d321eb4bdcd707dd"
    });

    // ===== ESTADO DE TARJETAS =====
    const [cards, setCards] = useState([
        {
            _id: "5d1f0611d321eb4bdcd707dd",
            name: "Yosemite Valley",
            link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
            owner: "5d1f0611d321eb4bdcd707dd"
        },
        {
            _id: "5d1f064ed321eb4bdcd707de",
            name: "Lake Louise",
            link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
            owner: "5d1f0611d321eb4bdcd707dd"
        }
    ]);

    // ===== ESTADO PARA IMAGEN =====
    const [selectedImage, setSelectedImage] = useState(null);

    // ===== ESTADO PARA POPUPS =====
    const [activePopup, setActivePopup] = useState(null); // 'newCard', 'editProfile', 'editAvatar', 'removeCard', 'image'
    const [cardToRemove, setCardToRemove] = useState(null);

    // ===== ESTADO PARA FORMULARIOS =====
    const [newCardTitle, setNewCardTitle] = useState("");
    const [newCardLink, setNewCardLink] = useState("");
    const [isNewCardValid, setIsNewCardValid] = useState(false);

    const [editName, setEditName] = useState(currentUser.name);
    const [editAbout, setEditAbout] = useState(currentUser.about);
    const [isEditProfileValid, setIsEditProfileValid] = useState(false);

    const [editAvatar, setEditAvatar] = useState(currentUser.avatar);
    const [isEditAvatarValid, setIsEditAvatarValid] = useState(false);

    // ===== HANDLERS DE APERTURA =====
    const handleImageClick = (image) => {
        setSelectedImage(image);
        setActivePopup('image');
    };

    const handleAddCardClick = () => {
        setNewCardTitle("");
        setNewCardLink("");
        setIsNewCardValid(false);
        setActivePopup('newCard');
    };

    const handleEditProfileClick = () => {
        setEditName(currentUser.name);
        setEditAbout(currentUser.about);
        setIsEditProfileValid(true);
        setActivePopup('editProfile');
    };

    const handleEditAvatarClick = () => {
        setEditAvatar(currentUser.avatar);
        setIsEditAvatarValid(false);
        setActivePopup('editAvatar');
    };

    const handleDeleteClick = (card) => {
        setCardToRemove(card);
        setActivePopup('removeCard');
    };

    // ===== HANDLER DE CIERRE =====
    const closeAllPopups = () => {
        setActivePopup(null);
        setSelectedImage(null);
        setCardToRemove(null);
        setNewCardTitle("");
        setNewCardLink("");
        setIsNewCardValid(false);
    };

    // ===== HANDLERS DE ENVÍO =====
    const handleNewCardSubmit = (e) => {
        e.preventDefault();
        if (!isNewCardValid) return;
        
        const newCard = {
            _id: Date.now().toString(),
            name: newCardTitle,
            link: newCardLink,
            owner: currentUser._id
        };

        setCards([newCard, ...cards]);
        closeAllPopups();
    };

    const handleEditProfileSubmit = (e) => {
        e.preventDefault();
        if (!isEditProfileValid) return;
        
        setCurrentUser({
            ...currentUser,
            name: editName,
            about: editAbout
        });
        
        closeAllPopups();
    };

    const handleEditAvatarSubmit = (e) => {
        e.preventDefault();
        if (!isEditAvatarValid) return;
        
        setCurrentUser({
            ...currentUser,
            avatar: editAvatar
        });
        
        closeAllPopups();
    };

    const handleConfirmDelete = () => {
        if (!cardToRemove) return;
        
        const updatedCards = cards.filter(c => c._id !== cardToRemove._id);
        setCards(updatedCards);
        closeAllPopups();
    };

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
                        onDeleteClick={() => handleDeleteClick(card)}
                    />
                ))}
            </ul>

            {/* ===== POPUP: Nueva Tarjeta ===== */}
            {activePopup === 'newCard' && (
                <Popup isOpen={true} onClose={closeAllPopups}>
                    <Form
                        title="Nuevo lugar"
                        name="card-form"
                        id="new-card-form"
                        onSubmit={handleNewCardSubmit}
                        buttonText="Crear"
                        isValid={isNewCardValid}
                    >
                        <NewCard 
                            onTitleChange={(e) => setNewCardTitle(e.target.value)}
                            onLinkChange={(e) => setNewCardLink(e.target.value)}
                            onValidationChange={setIsNewCardValid}
                        />
                    </Form>
                </Popup>
            )}

            {/* ===== POPUP: Editar Perfil ===== */}
            {activePopup === 'editProfile' && (
                <Popup isOpen={true} onClose={closeAllPopups}>
                    <Form
                        title="Editar perfil"
                        name="profile-form"
                        id="edit-profile-form"
                        onSubmit={handleEditProfileSubmit}
                        buttonText="Guardar"
                        isValid={isEditProfileValid}
                    >
                        <EditProfile 
                            name={editName}
                            about={editAbout}
                            onNameChange={(e) => setEditName(e.target.value)}
                            onAboutChange={(e) => setEditAbout(e.target.value)}
                            onValidationChange={setIsEditProfileValid}
                        />
                    </Form>
                </Popup>
            )}

            {/* ===== POPUP: Editar Avatar ===== */}
            {activePopup === 'editAvatar' && (
                <Popup isOpen={true} onClose={closeAllPopups}>
                    <Form
                        title="Actualizar foto de perfil"
                        name="avatar-form"
                        id="avatar-popup-form"
                        onSubmit={handleEditAvatarSubmit}
                        buttonText="Guardar"
                        isValid={isEditAvatarValid}
                    >
                        <EditAvatar 
                            avatar={editAvatar}
                            onAvatarChange={(e) => setEditAvatar(e.target.value)}
                            onValidationChange={setIsEditAvatarValid}
                        />
                    </Form>
                </Popup>
            )}

            {/* ===== POPUP: Confirmar Eliminación ===== */}
            {activePopup === 'removeCard' && (
                <Popup isOpen={true} onClose={closeAllPopups}>
                    <RemoveCard 
                        onConfirm={handleConfirmDelete}
                        onClose={closeAllPopups}
                    />
                </Popup>
            )}

            {/* ===== POPUP: Ver Imagen ===== */}
            <ImagePopup
                card={selectedImage}
                isOpen={activePopup === 'image'}
                onClose={closeAllPopups}
            />
        </main>
    );
};

export default Main;