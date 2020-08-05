import React, { Component } from 'react'

class Header extends Component {
    constructor(props){
        super(props)
        this.state={
            textChange:"Login",
            userName:"Guest"
        }
    }
    changeText =() =>{
        this.setState({
           textChange:"Logout"
        })
    }
    changeUserName =() =>{
       this.setState({
          userName:"ASHA"
       })
   }
   render() {
    return (
        <div className="header">
            <a href="logo"> 
            BWM Logo
            </a>
           <ul>
               <li>
                   Welcome {this.state.userName}
               </li>
               <li onClick={()=>{this.changeText();this.changeUserName()}}>
                    {this.state.textChange}
               </li>
           </ul>
        </div>
    )
}
}

export default Header
