import React, { useState, useEffect } from "react"
//import firebase from "./firebase"
import "../styles/global.css" //import firebase from "firebase"
import getFirebase from "../components/firebase"
const useItems = () => {
  const [items, setItems] = useState([]) //useState() hook, sets initial state to an empty array
  useEffect(() => {
    const lazyApp = import("firebase/app")
    const lazyDatabase = import("firebase/firestore")

    const unsubscribe = Promise.all([lazyApp, lazyDatabase]).then(
      ([firebase]) => {
        const firebaseDatabase = getFirebase(firebase).firestore() //access firestore
        firebaseDatabase
          .collection("items") //access "items" collection
          //You can "listen" to a document with the onSnapshot() method.
          .onSnapshot(snapshot => {
            const listItems = snapshot.docs.map(doc => ({
              //map each document into snapshot
              id: doc.id, //id and data pushed into items array
              ...doc.data(), //spread operator merges data to id.
            }))
            setItems(listItems) //items is equal to listItems
            console.log(listItems)
          })
      }
    )
    return () => unsubscribe
  }, [])
  return items
}
const deleteItem = id => {
  console.log(id)
  const lazyApp = import("firebase/app")
  const lazyDatabase = import("./firebase")
  Promise.all([lazyApp, lazyDatabase]).then(([firebase]) => {
    const firebaseDatabase = getFirebase(firebase).firestore()
    firebaseDatabase
      .collection("items")
      .doc(id)
      .delete()
  })
}

const ItemList = ({ editItem }) => {
  const [id, setId] = useState('1')
  useEffect(() => {
    deleteItem(id)
  }, [id])
  const listItem = useItems()
  return (
    <table className="tg">
      <tbody>
        <tr>
          <td className="tg-ycr8">Name</td>
          <td className="tg-ycr8">Type</td>
          <td className="tg-i81m">Qty</td>
          <td className="tg-a02x">Description</td>
          <td className="tg-6hdc"></td>
        </tr>
      </tbody>
      {listItem.map(item => (
        <tbody key={item.id}>
          <tr>
            <td className="tg-ycr8">{item.name}</td>
            <td className="tg-ycr8">{item.type}</td>
            <td className="tg-i81m">{item.qty}</td>
            <td className="tg-a02x">{item.description}</td>
            <td className="tg-6hdc">
              <button onClick={() => editItem(item)}>Edit</button>
              <button onClick={() => setId(item.id)}>Delete</button>
            </td>
          </tr>
        </tbody>
      ))}
    </table>
  )
}
export default ItemList
