import { useState, useEffect } from "react";
import Header from "./Header/Header"
import Main from "./Main/Main"
import Footer from "./Footer/Footer"
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/api";

function App() {
    const [currentUser, setCurrentUser] = useState(null);
    const [activePopup, setActivePopup] = useState(null);

    useEffect(() => {
        api.getUserInfo()
            .then((userData) => {
                setCurrentUser(userData);
            })
            .catch((err) => console.error("Error al cargar usuario:", err));
    }, []);

    const handleOpenPopup = (popupName) => {
        setActivePopup(popupName);
    };

    const handleClosePopup = () => {
        setActivePopup(null);
    };

    const handleUpdateUser = async (userData) => {
        try {
            const newUserData = await api.updateUserInfo(userData);
            setCurrentUser(newUserData);
            handleClosePopup();
        } catch (error) {
            console.error("Error al actualizar usuario:", error);
        }
    };

    // ===== NUEVO: HANDLER PARA ACTUALIZAR AVATAR =====
    const handleUpdateAvatar = async (avatarData) => {
        try {
            const newUserData = await api.updateAvatar(avatarData.avatar);
            setCurrentUser(newUserData);
            handleClosePopup();
        } catch (error) {
            console.error("Error al actualizar avatar:", error);
        }
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