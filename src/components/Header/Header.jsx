import React from 'react'
import logo from '../../../images/logo.svg'

const Header = () => {
	return (
		<header className="header page__section">
			<img 
				alt="Logotipo Around The U.S." 
				className="logo header__logo" 
				src={logo}
			/>
		</header>
	)
}

export default Header