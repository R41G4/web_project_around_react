// components/ImagePopup/ImagePopup.jsx
function ImagePopup({ card, isOpen, onClose })
{
	return (
		<div className={`popup ${isOpen ? "popup_is-opened" : ""}`}>
			<div className="popup__content popup__content_content_image">
				<button
					className="popup__close"
					type="button"
					onClick={onClose}
				/>
				<img
					src={card?.link}
					alt={card?.name}
					className="popup__image"
				/>
				<p className="popup__caption">{card?.name}</p>
			</div>
		</div>
	);
}

export default ImagePopup;