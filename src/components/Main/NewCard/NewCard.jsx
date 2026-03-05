// src/components/Main/NewCard/NewCard.jsx
import { useState, useEffect } from "react";
import { isValidUrl } from "../../../utils/validators";

function NewCard({ onSubmit, onClose }) {
	const [title, setTitle] = useState("");
	const [link, setLink] = useState("");
	const [titleError, setTitleError] = useState({ show: false, message: '' });
	const [linkError, setLinkError] = useState({ show: false, message: '' });
	const [isValid, setIsValid] = useState(false);

	// Validar cuando cambian los valores
	useEffect(() => {
		// Validar título
		if (title.trim() === "") {
			setTitleError({ show: true, message: 'Campo requerido' });
		} else if (title.length < 3) {
			setTitleError({ show: true, message: 'Mínimo 3 caracteres' });
		} else if (title.length > 30) {
			setTitleError({ show: true, message: 'Máximo 30 caracteres' });
		} else {
			setTitleError({ show: false, message: '' });
		}

		// Validar link
		if (link.trim() === "") {
			setLinkError({ show: true, message: 'Campo requerido' });
		} else if (!isValidUrl(link)) {
			setLinkError({ show: true, message: 'URL no válida' });
		} else {
			setLinkError({ show: false, message: '' });
		}

		// Validar formulario completo
		const titleValid = title.trim() !== "" && title.length >= 1 && title.length <= 30;
		const linkValid = link.trim() !== "" && isValidUrl(link);
		const formValid = titleValid && linkValid;
		
		setIsValid(formValid);
	}, [title, link]);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (isValid) {
			onSubmit({ name: title, link });
			setTitle("");
			setLink("");
			onClose();
		}
	};

	return (
		<form className="popup__form" onSubmit={handleSubmit}>
			<div className="popup__input-container">
				<input
					className={`popup__input popup__input_type_card-name ${titleError.show ? 'popup__input_type_error' : ''}`}
					placeholder="Título"
					type="text"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					minLength="1"
					maxLength="30"
					required
				/>
				<span className={`popup__error ${titleError.show ? 'popup__error_visible' : ''}`}>
					{titleError.message}
				</span>
			</div>
			<div className="popup__input-container">
				<input
					className={`popup__input popup__input_type_url ${linkError.show ? 'popup__input_type_error' : ''}`}
					placeholder="Enlace a la imagen"
					type="url"
					value={link}
					onChange={(e) => setLink(e.target.value)}
					required
				/>
				<span className={`popup__error ${linkError.show ? 'popup__error_visible' : ''}`}>
					{linkError.message}
				</span>
			</div>
			<button 
				className={`button popup__button ${!isValid ? 'popup__button_disabled' : ''}`}
				type="submit"
				disabled={!isValid}
			>
				Crear
			</button>
		</form>
	);
}

export default NewCard;