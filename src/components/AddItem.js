import{FaPlus} from 'react-icons/fa'
const AddItem = ({newItem, setNewItem, handleSubmit}) =>{
    return(
        <form onSubmit={handleSubmit}>
            <label style={{display:'none'}}htmlFor='addItem'>Add Item</label>
            <input type="text" id='addItem' placeholder='Add Item' value={newItem} onChange={(e)=>setNewItem(e.target.value)}/>
            <button type='submit'><FaPlus/></button>
        </form>
        )
}
export default AddItem