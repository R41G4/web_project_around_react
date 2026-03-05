import { useContext } from "react";
import { CurrentUserContext } from "../../../contexts/CurrentUserContext";

function Card({ card, onImageClick, onDeleteClick, onCardLike }) {
    const currentUser = useContext(CurrentUserContext);
    
    const isOwn = card.owner === currentUser?._id;
    const isLiked = card.isLiked;
    
    const cardLikeButtonClassName = `card__like-button ${
        isLiked ? 'card__like-button_is-active' : ''
    }`;

    const handleLikeClick = () => {
        onCardLike(card);
    };

    const handleDeleteClick = () => {
        onDeleteClick(card);
    };

    return (
        <li className="card">
            <img 
                className="card__image" 
                src={card.link} 
                alt={card.name}
                onClick={() => onImageClick(card)}
            />
            {isOwn && (
                <button 
                    aria-label="Eliminar tarjeta" 
                    className="card__delete-button" 
                    type="button"
                    onClick={handleDeleteClick}
                />
            )}
            <div className="card__description">
                <h2 className="card__title">{card.name}</h2>
                <div className="card__like-container">
                    <button 
                        aria-label="Me gusta" 
                        className={cardLikeButtonClassName}
                        type="button"
                        onClick={handleLikeClick}
                    />
                </div>
            </div>
        </li>
    );
}

export default Card;