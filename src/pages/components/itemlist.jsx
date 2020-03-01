import React, { useState, useEffect } from "react"
import firebase from "./firebase"
import "../styles/global.css"
import getFirebase from "./firebase"

const useItems = () => {
  const [items, setItems] = useState([]) //useState() hook, sets initial state to an empty array
  useEffect(() => {
    const lazyDatabase = import("firebase/firestore")
    const unsubscribe = Promise.all([lazyDatabase]).then(
      getFirebase(firebase)
        .firestore() //access firestore
        .collection("items") //access "items" collection
        .onSnapshot(snapshot => {
          //You can "listen" to a document with the onSnapshot() method.
          const listItems = snapshot.docs.map(doc => ({
            //map each document into snapshot
            id: doc.id, //id and data pushed into items array
            ...doc.data(), //spread operator merges data to id.
          }))
          setItems(listItems) //items is equal to listItems
        })
    )
    return () => unsubscribe()
  }, [])
  return items
}
const deleteItem = id => {
  firebase
    .firestore()
    .collection("items")
    .doc(id)
    .delete()
}
const ItemList = ({ editItem }) => {
  const listItem = useItems()
  return (
    <table className="tg">
      <tbody>
        <tr>
          <td className="tg-ycr8">Name</td>
          <td className="tg-ycr8">Type</td>
          <td className="tg-i81m">Qty</td>
          <td className="tg-a02x">Description</td>
          <td class="tg-6hdc"></td>
        </tr>
      </tbody>
      {listItem.map(item => (
        <tbody key={item.id}>
          <tr>
            <td className="tg-ycr8">{item.name}</td>
            <td className="tg-ycr8">{item.type}</td>
            <td className="tg-i81m">{item.qty}</td>
            <td className="tg-a02x">{item.description}</td>
            <td class="tg-6hdc">
              <button onClick={() => editItem(item)}>Edit</button>
              <button onClick={() => deleteItem(item.id)}>Delete</button>
            </td>
          </tr>
        </tbody>
      ))}
    </table>
  )
}
export default ItemList
