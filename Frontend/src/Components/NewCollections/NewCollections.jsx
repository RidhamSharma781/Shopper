import React, { useEffect, useState } from 'react'
import './NewCollections.css'
import Item from '../Item/Item'

const NewCollections = () => {
  const [new_collections,setNewCollections] = useState([]);
  useEffect(()=>{
    fetch('https://shopper-backend-9kns.onrender.com/newcollections')
    .then((res)=>res.json()).then((data)=>setNewCollections(data));
  },[])
  return (
    <div className='collections'>
        <h1>NEW COLLECTIONS</h1>
        <hr />
        <div className="collections-items">
            {new_collections.map((item,i)=>{
                return <Item key={i} id={item.id} name={item.name} image={item.image} old_price={item.old_price} new_price={item.new_price}/>
            })}
        </div>
      
    </div>
  )
}

export default NewCollections
