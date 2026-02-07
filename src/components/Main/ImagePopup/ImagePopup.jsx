function ImagePopup({ card })
{
	return (
	<>
		<img alt={card.name} className="popup__image" src={card.link} />
		<p className="popup__caption">{card.name}</p>
	</>
	);
}

export default ImagePopup