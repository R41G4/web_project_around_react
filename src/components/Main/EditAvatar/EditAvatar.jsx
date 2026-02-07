const EditAvatar = () => {
	return (
	<form className="popup__form" id="avatar-form" noValidate>
		<div className="popup__input-container">
			<input 
				className="popup__input popup__input_type_avatar-url" 
				name="avatar-url" 
				placeholder="Enlace a la imagen" 
				type="url" 
				required 
			/>
			<span className="popup__error" id="avatar-url-input-error"></span>
		</div>
		<button className="popup__button popup__button_disabled" type="submit" disabled>
			Guardar
		</button>
	</form>
	);
}

export default EditAvatar