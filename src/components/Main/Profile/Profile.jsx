function Profile({ user, onEditAvatar, onEditProfile, onAddCard }) {
    return (
        <section className="profile page__section">
            <div className="profile__avatar-container">
                <img 
                    className="profile__image" 
                    src={user?.avatar} 
                    alt={user?.name}
                />
                <button 
                    aria-label="Cambiar foto de perfil" 
                    className="profile__avatar-edit-button" 
                    type="button"
                    onClick={onEditAvatar}
                />
            </div>
            
            <div className="profile__info">
                <h1 className="profile__title">{user?.name}</h1>
                <button 
                    aria-label="Editar perfil" 
                    className="profile__edit-button" 
                    type="button"
                    onClick={onEditProfile}
                />
                <p className="profile__description">{user?.about}</p>
            </div>
            
            <button 
                aria-label="Agregar tarjeta" 
                className="profile__add-button" 
                type="button"
                onClick={onAddCard}
            />
        </section>
    );
}

export default Profile;