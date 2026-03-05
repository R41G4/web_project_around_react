import { useState, useEffect } from "react";
import Header from "./Header/Header"
import Main from "./Main/Main"
import Footer from "./Footer/Footer"
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/api";

function App() {
    const [currentUser, setCurrentUser] = useState(null);
    const [activePopup, setActivePopup] = useState(null);
    const [cards, setCards] = useState([]);

    // ===== CARGAR DATOS EN ORDEN =====
    useEffect(() => {
        const loadData = async () => {
            try {
                // 1. Primero cargar usuario
                const userData = await api.getUserInfo();
                setCurrentUser(userData);
                
                // 2. Luego cargar tarjetas (cuando ya tenemos usuario)
                const cardsData = await api.getInitialCards();
                const cardsWithIsLiked = cardsData.map(card => ({
                    ...card,
                    isLiked: card.isLiked || false
                }));
                setCards(cardsWithIsLiked);
                
                console.log("✅ Usuario cargado:", userData);
                console.log("✅ Tarjetas cargadas:", cardsWithIsLiked);
            } catch (error) {
                console.error("Error al cargar datos:", error);
            }
        };

        loadData();
    }, []);

    // ===== HANDLER PARA LIKES =====
    const handleCardLike = async (card) => {
        try {
            const newCard = await api.changeLikeCardStatus(card._id, card.isLiked);
            setCards((state) => state.map((currentCard) => 
                currentCard._id === card._id ? newCard : currentCard
            ));
        } catch (error) {
            console.error("Error al dar like:", error);
        }
    };

    // ===== HANDLER PARA ELIMINAR TARJETA =====
    const handleCardDelete = async (card) => {
    try {
        await api.deleteCard(card._id);
        setCards((state) => state.filter((c) => c._id !== card._id));
    } catch (error) {
        console.error("Error al eliminar tarjeta:", error);
    }
};

    // ===== HANDLER PARA AGREGAR TARJETA =====
    const handleAddPlaceSubmit = async (newCardData) => {
        try {
            const newCard = await api.addNewCard({
                name: newCardData.name,
                link: newCardData.link
            });
            setCards([newCard, ...cards]);
            handleClosePopup();
        } catch (error) {
            console.error("Error al agregar tarjeta:", error);
        }
    };

    // ===== HANDLER PARA ACTUALIZAR PERFIL =====
    const handleUpdateUser = async (userData) => {
        try {
            const newUserData = await api.updateUserInfo(userData);
            setCurrentUser(newUserData);
            handleClosePopup();
        } catch (error) {
            console.error("Error al actualizar usuario:", error);
        }
    };

    // ===== HANDLER PARA ACTUALIZAR AVATAR =====
    const handleUpdateAvatar = async (avatarData) => {
        try {
            const newUserData = await api.updateAvatar(avatarData.avatar);
            setCurrentUser(newUserData);
            handleClosePopup();
        } catch (error) {
            console.error("Error al actualizar avatar:", error);
        }
    };

	

    // ===== HANDLERS DE POPUPS =====
    const handleOpenPopup = (popupName) => {
        setActivePopup(popupName);
    };

    const handleClosePopup = () => {
        setActivePopup(null);
    };

    return (
        <CurrentUserContext.Provider value={{ 
            currentUser, 
            handleUpdateUser,
            handleUpdateAvatar
        }}>
            <div className="page__content">
                <Header />
                <Main 
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                    onAddPlaceSubmit={handleAddPlaceSubmit}
                    activePopup={activePopup}
                    onOpenPopup={handleOpenPopup}
                    onClosePopup={handleClosePopup}
                />
                <Footer />
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;