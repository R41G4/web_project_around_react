// components/Main/Card/Card.jsx
import { useState } from "react";

function Card({ card, onImageClick, onDeleteClick }) {
    const [isLiked, setIsLiked] = useState(false);

    const handleLikeClick = () => {
        setIsLiked(!isLiked);
        // Aquí después iría la lógica para guardar el like en el servidor
    };

    return (
        <li className="card">
            <img 
                className="card__image" 
                src={card.link} 
                alt={card.name}
                onClick={onImageClick}
            />
            <button 
                aria-label="Eliminar tarjeta" 
                className="card__delete-button" 
                type="button"
                onClick={onDeleteClick}
            />
            <div className="card__description">
                <h2 className="card__title">{card.name}</h2>
                <div className="card__like-container">
                    <button 
                        aria-label="Me gusta" 
                        className={`card__like-button ${isLiked ? "card__like-button_is-active" : ""}`}
                        type="button"
                        onClick={handleLikeClick}
                    />
                    {/* Contador eliminado */}
                </div>
            </div>
        </li>
    );
}

export default Card;