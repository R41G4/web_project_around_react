function RemoveCard({ onConfirm, onClose }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        onConfirm();
    };

    return (
        <>
            <h3 className="popup__title">¿Estás seguro?</h3>
            <p className="popup__text">Esta acción no se puede deshacer.</p>
            <form className="popup__form popup__form_type_confirm" onSubmit={handleSubmit} noValidate>
                <button 
                    className="button popup__button popup__button_confirm" 
                    type="submit"
                >
                    Sí, eliminar
                </button>
            </form>
        </>
    );
}

export default RemoveCard;