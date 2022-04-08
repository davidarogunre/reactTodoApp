import '../App.css'
const Header = ({color, value}) =>{
    
    return(
        <header style={{backgroundColor:color, color:'white', width:'100%'}}>
            <h1>{value}</h1>
        </header>
    )
}

export default Header