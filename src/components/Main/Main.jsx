import { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import api from "../../utils/api";

import Profile from "./Profile/Profile";
import Card from "./Card/Card";
import ImagePopup from "./ImagePopup/ImagePopup";
import Form from "./Form/Form";
import Popup from "./Popup/Popup";
import NewCard from "./NewCard/NewCard";
import RemoveCard from "./RemoveCard/RemoveCard";
import EditProfile from "./Form/EditProfile/EditProfile";
import EditAvatar from "./Form/EditAvatar/EditAvatar";

const Main = ({ activePopup, onOpenPopup, onClosePopup }) => {
    const { currentUser } = useContext(CurrentUserContext);

    // ===== ESTADO DE TARJETAS =====
    const [cards, setCards] = useState([]);

    // ===== ESTADO PARA IMAGEN =====
    const [selectedImage, setSelectedImage] = useState(null);

    // ===== ESTADO PARA ELIMINACIÓN =====
    const [cardToRemove, setCardToRemove] = useState(null);

    // ===== ESTADO PARA FORMULARIOS =====
    const [newCardTitle, setNewCardTitle] = useState("");
    const [newCardLink, setNewCardLink] = useState("");
    const [isNewCardValid, setIsNewCardValid] = useState(false);

    const [editName, setEditName] = useState("");
    const [editAbout, setEditAbout] = useState("");
    const [isEditProfileValid, setIsEditProfileValid] = useState(false);

    // ===== CARGAR TARJETAS DESDE API =====
    useEffect(() => {
        const fetchCards = async () => {
            try {
                const cardsData = await api.getInitialCards();
                const cardsWithIsLiked = cardsData.map(card => ({
                    ...card,
                    isLiked: card.isLiked || false
                }));
                setCards(cardsWithIsLiked);
                
                if (currentUser) {
                    setEditName(currentUser.name);
                    setEditAbout(currentUser.about);
                }
                
                //console.log("Tarjetas cargadas:", cardsWithIsLiked);
            } catch (error) {
                console.error("Error al cargar tarjetas:", error);
            }
        };

        if (currentUser) {
            fetchCards();
        }
    }, [currentUser]);

    // ===== HANDLERS DE APERTURA =====
    const handleImageClick = (image) => {
        setSelectedImage(image);
        onOpenPopup('image');
    };

    const handleAddCardClick = () => {
        setNewCardTitle("");
        setNewCardLink("");
        setIsNewCardValid(false);
        onOpenPopup('newCard');
    };

    const handleEditProfileClick = () => {
        setEditName(currentUser?.name || "");
        setEditAbout(currentUser?.about || "");
        setIsEditProfileValid(true);
        onOpenPopup('editProfile');
    };

    const handleEditAvatarClick = () => {
        onOpenPopup('editAvatar');
    };

    const handleDeleteClick = (card) => {
        setCardToRemove(card);
        onOpenPopup('removeCard');
    };

    // ===== HANDLER PARA ELIMINAR TARJETAS =====
    async function handleCardDelete(card) {
        try {
            await api.deleteCard(card._id);
            setCards((state) => state.filter((currentCard) => 
                currentCard._id !== card._id
            ));
            onClosePopup();
        } catch (error) {
            console.error("Error al eliminar tarjeta:", error);
        }
    }

    // ===== HANDLER DE CIERRE =====
    const closeAllPopups = () => {
        onClosePopup();
        setSelectedImage(null);
        setCardToRemove(null);
        setNewCardTitle("");
        setNewCardLink("");
        setIsNewCardValid(false);
    };

    // ===== HANDLER PARA NUEVA TARJETA =====
    const handleNewCardSubmit = (e) => {
        e.preventDefault();
        if (!isNewCardValid) return;

        const newCard = {
            _id: Date.now().toString(),
            name: newCardTitle,
            link: newCardLink,
            owner: currentUser?._id,
            isLiked: false
        };

        setCards([newCard, ...cards]);
        closeAllPopups();
    };

    // ===== HANDLER PARA LIKES =====
    async function handleCardLike(card) {
        try {
            const newCard = await api.changeLikeCardStatus(card._id, card.isLiked);
            setCards((state) => state.map((currentCard) => 
                currentCard._id === card._id ? newCard : currentCard
            ));
        } catch (error) {
            console.error("Error al dar like:", error);
        }
    }

    // ===== HANDLER PARA CONFIRMAR ELIMINACIÓN =====
    const handleConfirmDelete = () => {
        if (!cardToRemove) return;
        handleCardDelete(cardToRemove);
    };

    // Si no hay usuario, mostrar carga
    if (!currentUser) {
        return <div className="loading">Cargando...</div>;
    }

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
                        onDeleteClick={() => handleCardDelete(card)}
                        onCardLike={handleCardLike}
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
                    <EditProfile />
                </Popup>
            )}

            {/* ===== POPUP: Editar Avatar ===== */}
            {activePopup === 'editAvatar' && (
                <Popup isOpen={true} onClose={closeAllPopups}>
                    <EditAvatar />
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