import ItemList from './ItemList'

const Content =({items, setItems, handler, handleDelete}) =>{

return(
    <>
    <ItemList items={items} setItems={setItems} handler={handler} handleDelete={handleDelete}/>
    </>
)
}

export default Content