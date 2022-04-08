import Item from './Item'
const ItemList = ({items, handler, handleDelete})=>{
    return(
        <main>
            <ul>
                {items.map((item)=>{
                    return(
                        <Item key={item.id} item={item} handler={handler} handleDelete={handleDelete}/>
                    )
                })}
            </ul>
        </main>
    )
}

export default ItemList