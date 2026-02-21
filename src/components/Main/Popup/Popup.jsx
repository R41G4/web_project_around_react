function Popup({ isOpen, onClose, children })
{    
	return (
		<div className={`popup ${isOpen ? "popup_is-opened" : ""}`}>
			<div className="popup__content">
				<button
					className="popup__close"
					type="button"
					onClick={onClose}
				/>
				{children}
			</div>
		</div>
	);
}

export default Popup;