import React from 'react';
import styles from './app-styles'
import star from './assets/star.png'
import starFilled from './assets/star-filled.png'
import bin from './assets/bin.png'

const FriendCard = ({ index, item, handleFav, handleDelete }) => {
    return (
      <div key={index} style={styles.friendCardContainer}>
        <div style={{ flex: 1}}>
          <div style={{ margin: 0 }}>{item.name}</div>
          <div style={{ margin: 0 }}>{item.description}</div>
        </div>
        <div style={{ flex: 1, textAlign: 'right' }}>
          <button style={styles.favButton} onClick={() => handleFav(item)}>
            <img alt='fav' src={item.fav ? starFilled : star} width="30" height="30" />
          </button>
          <button style={{ background: 'white' }} onClick={() => handleDelete(item)}> <img alt='bin' src={bin} width="30" height="30" /></button>
        </div>
      </div>
    )
  }

  export default FriendCard;