import React, { useState } from 'react';
import star from './assets/star.png'
import starFilled from './assets/star-filled.png'
import bin from './assets/bin.png'
import styles from './app-styles';

const mockData = [{ id: 1, name: 'Rahul Gupta', description: 'is your friend', fav: true },
{ id: 2, name: 'Shivangi Sharma', description: 'is your friend', fav: false },
{ id: 3, name: 'Akash Singh', description: 'is your friend', fav: false }]
const PAGE_SIZE = 4

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

function App() {
  const [input, handleInput] = useState('')
  const [list, handleListUpdate] = useState(mockData)
  const [activePage, setActivePagination] = useState(0)
  const [showPagination, handlePaginationVisibility] = useState(false)

  const handleInputChange = (e) => {
    handleInput(e.target.value)
  }
  const getFilteredList = () => {
    if (input !== '') {
      return list.filter(item => item.name.toLowerCase().includes(input.toLowerCase()))
    } else {
      return list
    }

  }
  const handleFav = ({ id, fav }) => {
    const tempList = [...list]
    const index = list.findIndex(item => item.id === id)
    if (index !== -1) {
      tempList[index].fav = !fav
      const favList = tempList.filter(item => item.fav)
      const normalFriendList = tempList.filter(item => !item.fav)
      const updatedList = [...favList, ...normalFriendList]
      handleListUpdate(updatedList);
    }

  }
  const handleDelete = ({id, name}) => {
    const res = window.confirm(`Are You Sure You Want To Delete Friend ${name}`);
    if(res){
      const updatedList = [...list]
      const index = list.findIndex(item => item.id === id)
      if (index !== -1) {
        updatedList.splice(index, 1)
        handleListUpdate(updatedList);
  
        const from = activePage * PAGE_SIZE
        const to = from + PAGE_SIZE
        if (updatedList.slice(from, to).length === 0) {
          setActivePagination(activePage-1)
        }
        if (updatedList.length <= PAGE_SIZE) {
          handlePaginationVisibility(false)
        }
      }
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && input) {
      const newFriend = { id: Math.random() * 1000, name: input, description: 'is your friend', fav: false }
      const updatedList = [...list, newFriend]
      handleListUpdate(updatedList);
      if (updatedList.length > PAGE_SIZE) {
        handlePaginationVisibility(true)
      }
      handleInput('')
    }
  }
  const getListItems = (list) => {
    if (activePage === 0) {
      return list.slice(0, PAGE_SIZE)
    } else {
      const from = activePage * PAGE_SIZE
      const to = from + PAGE_SIZE
      return list.slice(from, to)
    }
  }

  const friendsList = getFilteredList()
  const listItems = getListItems(friendsList)
  return (
    <div style={styles.container}>
      <div style={styles.subContainer}>
        <div style={styles.header}><span>Friends List</span></div>
        <div style={{display:'flex'}}>
        <input placeholder="Enter your friend's name" value={input} style={styles.input} onChange={handleInputChange} onKeyPress={handleKeyPress}></input>
        </div>
        <div>
          {listItems.map((item, index) => (
            <div key={item.id}>
              <FriendCard index={index} handleFav={handleFav} handleDelete={handleDelete} item={item} />
              {listItems.length - 1 !== index ? <div style={styles.border} /> : null}
            </div>
          ))}
        </div>
        <div style={styles.pagination}>
          {showPagination ? Array(Math.ceil(friendsList.length / PAGE_SIZE)).fill(null).map((_, i) => (
            <button key={i} style={styles.page} onClick={() => setActivePagination(i)}>{i + 1}</button>
          )) : null}

        </div>
      </div>
    </div>
  );
}

export default App;
