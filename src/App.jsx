// src/components/App.jsx
import { useState, useEffect } from "react";
import Header from "./components/Header/Header"
import Main from "./components/Main/Main"
import Footer from "./components/Footer/Footer"
import { CurrentUserContext } from "./contexts/CurrentUserContext";
import api from "./utils/api";

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

    return (
        <CurrentUserContext.Provider value={{ currentUser, handleUpdateUser }}>
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