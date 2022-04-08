import {FaTrashAlt} from 'react-icons/fa'
const Item = ({item, handler, handleDelete}) =>{
    return(
        <li key={item.id}>
                            <label style={(item.checked)?{textDecoration:'line-through'}:null}>{item.item}</label>
                            <input type='checkbox' onChange={()=>handler(item.id)} checked={item.checked}/>
                            <FaTrashAlt onClick={()=>handleDelete(item.id)} role='button' tabIndex='0'/>
                        </li>
        )
}
export default Item