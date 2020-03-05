import React, { useState, useEffect } from "react"
import { window } from "browser-monads"
//import firebase from "firebase"
import getFirebase from "./firebase"

const AddItemForm = () => {
  //useState() hook captures the value from the input value
  const [name, setName] = useState("")
  const [type, setType] = useState("")
  const [qty, setQty] = useState("")
  const [description, setDescription] = useState("")
  /* 
    The onSubmit function we takes the 'e' 
    or event and submits it to Firebase
    */
  /* 
    preventDefault is important because it 
    prevents the whole page from reloading
    */
  const onSubmit = e => {
    e.preventDefault()
    const lazyApp = import("firebase/app")
    const lazyDatabase = import("@firebase/firestore")
    Promise.all([lazyApp, lazyDatabase])
      .then(([firebase]) => {
        const firebaseDatabase = getFirebase(firebase).firestore()
        firebaseDatabase.collection("items").add({
          name,
          type,
          qty,
          description,
        })
      })
      //.then will reset the form to nothing
      .then(() => setName(""), setType(""), setQty(""), setDescription(""))
  }
  /*   useEffect(
    () => {
      const lazyApp = import("firebase/app")
      const lazyDatabase = import("@firebase/firestore")
      const addData = () => {
         Promise.all([lazyApp, lazyDatabase])
          .then(([firebase]) => {
            const firebaseDatabase = getFirebase(firebase).firestore()
            firebaseDatabase.collection("items").add({
              name,
              type,
              qty,
              description,
            })
          })
          //.then will reset the form to nothing
          .then(() => setName(""), setType(""), setQty(""), setDescription(""))
      }
      addData()
      console.log(name, type, qty, description)
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [inputRef]
  )
 */
  return (
    <form onSubmit={onSubmit}>
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

/* 
Alternate probably better way:

import React, { useState, useEffect } from "react"
//import firebase from "firebase"
import getFirebase from "./firebase"
 
const AddItemForm = () => {
  const [formData, setFormData] = useState({
       name: ‘’,
       type: ‘’,
       qty: ‘’,
       description: ‘’,
  });
 
  const handleOnSubmit = useCallback(async e => {
    e.preventDefault();
    const firebase = await import("firebase/app");
    await import("@firebase/firestore");
    const firebaseDatabase = getFirebase(firebase).firestore();
    await firebaseDatabase.collection("items").add(formData);
    setFormData({
       name: ‘’,
       type: ‘’,
       qty: ‘’,
       description: ‘’,
    });
  }, [formData, setFormData]);
 
  const handleNameChange = useCallback(e => {
     const value = e.currentTarget.value;
     setFormData(state => ({
          ...state,
          name: value,
     });
  }, [setFormData]);
 
 const handleTypeChange = useCallback(e => {
     const value = e.currentTarget.value;
     setFormData(state => ({
          ...state,
          type: value,
     });
  }, [setFormData]);
 
 const handleQtyChange = useCallback(e => {
     const value = e.currentTarget.value;
     setFormData(state => ({
          ...state,
          qty: value,
     });
  }, [setFormData]);
 
 const handleDescriptionChange = useCallback(e => {
     const value = e.currentTarget.value;
     setFormData(state => ({
          ...state,
          description: value,
     });
  }, [setFormData]);
 
  return (
    <form onSubmit={handleOnSubmit}>
      <input
        placeholder="Name"
        value={formData.name}
        name="name"
        //onChange take the event and set it to whatever is currently in the input.
        //e is equal to the event happening
        //currentTarget.value is what is inputted
        onChange={handleNameChange}
        type="text"
      />
      <input
        placeholder="Type"
        value={formData.type}
        name="type"
        onChange={handleTypeChange}
        type="text"
      />
      <input
        placeholder="Qty"
        value={formData.qty}
        name="qty"
        onChange={handleQtyChange}
        type="number"
      />
      <input
        placeholder="Description"
        value={formData.description}
        name="description"
        onChange={handleDescriptionChange}
        type="text"
      />
      <button>Submit</button>
    </form>
  )
};
 
export default AddItemForm
*/
