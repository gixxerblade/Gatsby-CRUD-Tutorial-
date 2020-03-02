import React, { useState, useEffect, lazy } from "react"
//import firebase from "./firebase"
import "../styles/global.css"
import { getFirebase } from "./firebase"
//import firebase from "firebase"
const useItems = () => {
  const [items, setItems] = useState([]) //useState() hook, sets initial state to an empty array
  const lazyApp = lazy(() => import("firebase/app"))
  const lazyDatabase = lazy(() => import("firebase/firestore"))

  useEffect(() => {
    /* const unsubscribe =  */ Promise.all([lazyApp, lazyDatabase]).then(
      ([firebase]) => {
        const _firebase = getFirebase(firebase).firestore() //access firestore
        _firebase
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
    /*     return () => unsubscribe()
     */
  }, [lazyApp, lazyDatabase])
  return items
}

const deleteItem = id => {
  /*   firebase
    .firestore()
    .collection("items")
    .doc(id)
    .delete()
 */
}

const ItemList = ({ editItem }) => {
  const listItem = useItems()
  console.log(listItem)
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
              <button onClick={() => deleteItem(item.id)}>Delete</button>
            </td>
          </tr>
        </tbody>
      ))}
    </table>
  )
}
export default ItemList
