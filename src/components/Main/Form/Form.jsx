function Form({ title, name, id, onSubmit, children, buttonText = "Guardar", isValid = false }) {
    return (
        <>
            <h3 className="popup__title">{title}</h3>
            <form 
                className="popup__form" 
                name={name}
                id={id}
                onSubmit={onSubmit} 
                noValidate
            >
                {children}
                <button 
                    className={`button popup__button ${!isValid ? 'popup__button_disabled' : ''}`}
                    type="submit"
                    disabled={!isValid}
                >
                    {buttonText}
                </button>
            </form>
        </>
    );
}

 export default Form;