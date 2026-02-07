import { useState } from "react";

import Popup from "./Popup/Popup";
import NewCard from "./NewCard/NewCard";
import Card from "./Card/Card";

const cards = [
	{
		isLiked: false,
		_id: '5d1f0611d321eb4bdcd707dd',
		name: 'Yosemite Valley',
		link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg',
		owner: '5d1f0611d321eb4bdcd707dd',
		createdAt: '2019-07-05T08:10:57.741Z',
	},
	{
		isLiked: false,
		_id: '5d1f064ed321eb4bdcd707de',
		name: 'Lake Louise',
		link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg',
		owner: '5d1f0611d321eb4bdcd707dd',
		createdAt: '2019-07-05T08:11:58.324Z',
	},
];
console.log(cards);

const Main = () =>
{
	const [popup, setPopup] = useState(null);

	function handleOpenPopup(popup)
	{
		setPopup(popup);
	}

	function handleClosePopup()
	{
		setPopup(null);
	}

	const newCardPopup = {
		title: "Nuevo lugar", children: <NewCard />,
		isOpen: true
	};

	return (
		<main className="content">
			<section className="profile page__section">
				<div className="profile__avatar-container">
					<img 
						className="profile__image" 
						src="./images/avatar.jpg" 
						alt="Avatar de Luis García" 
					/>
					<button 
						aria-label="Cambiar foto de perfil" 
						className="profile__avatar-edit-button" 
						type="button"
					></button>
				</div>
				<div className="profile__info">
					<h1 className="profile__title">Luis García</h1>
					<button 
						aria-label="Editar perfil" 
						className="profile__edit-button" 
						type="button"
					></button>
					<p className="profile__description">Explorador</p>
				</div>
				<button
					aria-label="Agregar tarjeta" 
					className="profile__add-button" 
					type="button"
					onClick={() => handleOpenPopup(newCardPopup)}
				></button>
			</section>
			<section className="cards page__section">
				<ul className="cards__list">
				{
					cards.map((card) => (
						<Card 
							key={card._id} 
							card={card} 
							onImageClick={handleOpenPopup}
						/>
					))
				}
				</ul>
			</section>

			{
				popup && (
					<Popup
						onClose={handleClosePopup}
						title={popup.title}
						isOpen={popup.isOpen}
					>
						{popup.children}
					</Popup>
				)
			}
		</main>
	)
}

export default Main