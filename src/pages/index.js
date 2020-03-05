import React, { useState, useEffect } from "react"
//import firebase from "./components/firebase"
import ItemList from "./components/itemlist"
import AddItemForm from "./components/additemform"
import "./styles/global.css"
import UpdateItem from "./components/updateitem"
import getFirebase from "./components/firebase"

export default () => {
  const initialItemState = [
    { id: null, name: "", type: "", qty: "", description: "" },
  ]

  const [editing, setEditing] = useState(false)

  const [currentItem, setCurrentItem] = useState(initialItemState)
  const [submitting, setSubmitting] = useState(false)

  const editItem = item => {
    setEditing(true)
    setCurrentItem({
      id: item.id,
      name: item.name,
      type: item.type,
      qty: item.qty,
      description: item.description,
    })
  }

  const updateItem = ({ currentItem }, updatedItem) => {
    console.log(
      "It send the item to the updated item function:",
      updatedItem,
      currentItem.id
    )
    setEditing(false)
    const lazyApp = import("firebase/app")
    const lazyDatabase = import("@firebase/firestore")
    Promise.all([lazyApp, lazyDatabase]).then(([firebase]) => {
      const firebaseDatabase = getFirebase(firebase).firestore()
      firebaseDatabase
        .collection("items")
        .doc(currentItem.id)
        .update(updatedItem)
    })
  }
  useEffect(() => {
    if (submitting) updateItem()
  }, [submitting])
  return (
    <div>
      <h1>Firestore CRUD App</h1>
      <h2>Item List</h2>
      <ItemList editItem={editItem} />
      <h2>Add Item</h2>
      {editing ? (
        <UpdateItem
          setEditing={setEditing}
          currentItem={currentItem}
          updateItem={updateItem}
          submitting={submitting}
          setSubmitting={setSubmitting}
        />
      ) : (
        <AddItemForm />
      )}
    </div>
  )
}
