import ImagePopup from "../ImagePopup/ImagePopup";

const Card = (props) => {
	const { name, link, isLiked } = props.card;

	const imageComponent = {
        title: null,
        children: <img src={link} alt={name} className="popup__image" />
    };
	
	return (
	<li className="card">
		<img 
			className="card__image" 
			src={link} 
			alt={name}
			onClick={() => props.handleOpenPopup(imageComponent)}
		/>
		<button
			aria-label="Delete card"
			className="card__delete-button"
			type="button"
		/>
		<div className="card__description">
			<h2 className="card__title">{name}</h2>
			<button
			aria-label="Like card"
			type="button"
			className="card__like-button"
			/>
		</div>
    </li>
	);
};

export default Card;