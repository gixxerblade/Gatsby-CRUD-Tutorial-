import React, { useState, useEffect } from "react"

/* 
So far we have passed the setEditing prop to index.js. 
Now we are going to pass the currentItem prop
*/
const UpdateItem = ({ setEditing, currentItem, updateItem }) => {
  /*
  Sets the state of the item to the current item
  */
  const [item, setItem] = useState(currentItem)

  /*
  Side effect is that without UseEffect if you start editing one item, 
  then try to switch to another item, nothing will happen.
  The component is already open, and although the state 
  on the parent has changed, it's not registered down to the props.
  We want to let the UpdateItem form component know the props have changed.
  With the Effect Hook, we create a callback function that updates the item 
  state with the new prop thats being sent through.
  */
  useEffect(() => {
    setItem(currentItem)
    console.log("useEffect passes the currentItem: ", currentItem)
  }, [currentItem])

  const onSubmit = e => {
    e.preventDefault()
    console.log("onSubmit passes the id and items", item)
    updateItem({ currentItem }, item )
  }

  const onChange = e => {
    const { name, value } = e.target
    setItem({ ...item, [name]: value })
  }

  return (
    <>
      <h2>Update Item</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor="Update Item">Update Item:</label>
        <input type="text" name="name" value={item.name} onChange={onChange} />
        <input type="text" name="type" value={item.type} onChange={onChange} />
        <input type="number" name="qty" value={item.qty} onChange={onChange} />
        <input
          type="text"
          name="description"
          value={item.description}
          onChange={onChange}
        />
        <button>Update</button>
        <button onClick={() => setEditing(false)}>Cancel</button>
      </form>
    </>
  )
}
export default UpdateItem
