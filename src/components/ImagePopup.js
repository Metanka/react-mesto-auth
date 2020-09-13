import React from 'react';

function ImagePopup(props) {
  const {isOpen, selectedCard = {}, onClose} = props;
  return (
    //view
    <div className={isOpen ? 'popup popup_view' : `popup popup_hidden popup_view`}>
      <div className="popup__box">
        <button className="btn-close btn-close_place-view"
          onClick={onClose}></button>
        {selectedCard.link && (
          <img
            className="popup__img"
            alt={selectedCard.text}
            src={selectedCard.link}
          />
        )}
        <h2 className="popup__name">{selectedCard.text}</h2>
      </div>
    </div>
  );
}

export default ImagePopup;
