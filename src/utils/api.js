// src/utils/api.js
class Api {
    constructor() {
        this._baseUrl = 'https://around-api.es.tripleten-services.com/v1';
        this._headers = {
            authorization: '152e8305-8c78-4b33-8d0b-2d99e5ea98c7',
            'Content-Type': 'application/json'
        };
    }

    _checkResponse(res) {
        return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, { headers: this._headers }).then(this._checkResponse);
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, { headers: this._headers }).then(this._checkResponse);
    }

    updateUserInfo({ name, about }) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({ name, about })
        }).then(this._checkResponse);
    }

    addNewCard({ name, link }) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({ name, link })
        }).then(this._checkResponse);
    }

    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        }).then(this._checkResponse);
    }

    addLike(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this._headers
        }).then(this._checkResponse);
    }

    removeLike(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this._headers
        }).then(this._checkResponse);
    }

    // ===== MÉTODO CORREGIDO =====
    changeLikeCardStatus(cardId, isCurrentlyLiked) {
        // Si está likeado actualmente, hay que quitar el like
        if (isCurrentlyLiked) {
            return this.removeLike(cardId);
        } else {
            return this.addLike(cardId);
        }
    }

    // src/utils/api.js - agregar método updateUserInfo si no está
    updateUserInfo({ name, about }) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({ name, about })
        }).then(this._checkResponse);
    }
}

const api = new Api();
export default api;