import './App.css';
import {v4 as uuidv4} from 'uuid'
import {useState, useEffect} from 'react'
import Header from './components/Header'
import Content from './components/Content'
import Footer from './components/Footer'
import AddItem from './components/AddItem'
import SearchItem from './components/SearchItem'
import apiRequest from './apiRequest'
function App() {
  const API_URL = 'http://localhost:3500/items'
  const [items, setItems] = useState([])
  const [search, setSearch] = useState('')
  const [fetcherror, setFetchError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

useEffect(()=>{
  const fetchItems = async ()=>{
    try{
      const response = await fetch(API_URL)
      if(!response.ok){
        throw Error('Did not receive expected data')
      }
      const listItems = await response.json()
      setItems(listItems)
      setFetchError(null)
    }catch(err){
      setFetchError(err.message)
    }finally{
      setIsLoading(false)
    }
  }
  setTimeout(()=>{
    (async () => await fetchItems())()
  }, 2000)
  
},[])

const handler = async (id)=>{
    const listItems = items.map((item)=>item.id === id ? {...item, checked: !item.checked}: item)
    const getItem = listItems.filter((item)=>item.id === id)
    setItems(listItems)
    const updateOptions = {
      method:"PATCH",
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({checked: getItem[0].checked})
    }
    const reqUrl = `${API_URL}/${id}`
    const result = await apiRequest(reqUrl, updateOptions)
    if(result){
      setFetchError(result)
    }
}
const handleDelete = async(id) =>{
    const listItems = items.filter((item)=> item.id !== id)
    setItems(listItems)

    const deleteOptions= {
      method:"DELETE"
    }
    const newUrl = `${API_URL}/${id}`
    const result = await apiRequest(newUrl, deleteOptions)
    if (result){
      setFetchError(result)
    }
}
const [newItem, setNewItem] = useState('')
const newItemObj = {
  id: uuidv4(),
  checked:false,
  item:newItem
}
const handleSubmit = async (e) =>{
e.preventDefault()
const listItems = [...items, newItemObj]
setItems(listItems)
const postOptions = {
  method:'POST',
  headers:{
    'Content-Type':'application/json'
  },
  body: JSON.stringify(newItemObj)
}
const result = await apiRequest(API_URL, postOptions)
if(result){
  setFetchError(result)
}
setNewItem('')
}
  return (
    <div className="App">
      <Header className='header' value='Task' color='yellow'/>
      {isLoading && <p>Loading...</p>}
      {fetcherror && <p style={{color:"red"}}>{fetcherror}</p>}
      <SearchItem search={search} setSearch={setSearch}/>
      <AddItem newItem={newItem} setNewItem={setNewItem} handleSubmit={handleSubmit}/>
      {!fetcherror && !isLoading && <Content items={items.filter(item=>{return ((item.item).toLowerCase()).includes(search.toLowerCase())})} setItems={setItems} handler={handler} handleDelete={handleDelete}/>}
      <Footer value = {(items.length === 0 ? 'No tasks available' : items.length)}/>
    </div>
  );
}

export default App;
