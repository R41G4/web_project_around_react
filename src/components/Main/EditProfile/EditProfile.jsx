const EditProfile = () => {
	return (
	<form className="popup__form" id="edit-profile-form" noValidate>
		<div className="popup__input-container">
			<input 
				className="popup__input popup__input_type_name" 
				name="name" 
				placeholder="Nombre" 
				type="text" 
				required 
				minLength="2" 
				maxLength="40" 
			/>
			<span className="popup__error" id="name-input-error"></span>
		</div>

		<div className="popup__input-container">
			<input 
				className="popup__input popup__input_type_description" 
				name="description" 
				placeholder="Acerca de mí" 
				type="text" 
				required 
				minLength="2" 
				maxLength="200" 
			/>
			<span className="popup__error" id="about-input-error"></span>
		</div>
		<button className="popup__button popup__button_disabled" type="submit" disabled>
			Guardar
		</button>
	</form>
	);
};

export default EditProfile;