import React, { useState, useEffect } from "react"
import firebase from "firebase"
import getFirebase from "./firebase"
const AddItemForm = () => {
  //useState() hook captures the value from the input value
  const [name, setName] = useState("")
  const [type, setType] = useState("")
  const [qty, setQty] = useState("")
  const [description, setDescription] = useState("")

  /* The onSubmit function we takes the 'e' 
    or event and submits it to Firebase
    */
  const useSubmit = e => {
    useEffect(
      e => {
        /* 
    preventDefault is important because it 
    prevents the whole page from reloading
    */

        e.preventDefault()
        const lazyApp = import("firebase/app")
        const lazyDatabase = import("firebase/firestore")
        Promise.all([lazyApp, lazyDatabase])
          .then(
            getFirebase(firebase)
              .firestore()
              .collection("items")
              .add({
                name,
                type,
                qty,
                description,
              })
          )
          //.then will reset the form to nothing
          .then(() => setName(""), setType(""), setQty(""), setDescription(""))
      },
      [e]
    )
  }

  return (
    <form onSubmit={useSubmit}>
      <input
        placeholder="Name"
        value={name}
        name="name"
        //onChange take the event and set it to whatever is currently in the input.
        //e is equal to the event happening
        //currentTarget.value is what is inputted
        onChange={e => setName(e.currentTarget.value)}
        type="text"
      />
      <input
        placeholder="Type"
        value={type}
        name="type"
        onChange={e => setType(e.currentTarget.value)}
        type="text"
      />
      <input
        placeholder="Qty"
        value={qty}
        name="qty"
        onChange={e => setQty(e.currentTarget.value)}
        type="number"
      />
      <input
        placeholder="Description"
        value={description}
        name="description"
        onChange={e => setDescription(e.currentTarget.value)}
        type="text"
      />
      <button>Submit</button>
    </form>
  )
}
export default AddItemForm
