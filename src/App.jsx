// src/components/App.jsx
import { useState, useEffect } from "react";
import Header from "./components/Header/Header"
import Main from "./components/Main/Main"
import Footer from "./components/Footer/Footer"
import { CurrentUserContext } from "./contexts/CurrentUserContext";
import api from "./utils/api";

function App() {
	const [currentUser, setCurrentUser] = useState(null);

	useEffect(() => {
		api.getUserInfo()
			.then((userData) => {
				setCurrentUser(userData);
			})
			.catch((err) => console.error("Error al cargar usuario:", err));
	}, []);

	return (
		<CurrentUserContext.Provider value={currentUser}>
			<div className="page__content">
				<Header />
				<Main />
				<Footer />
			</div>
		</CurrentUserContext.Provider>
	);
}

export default App;