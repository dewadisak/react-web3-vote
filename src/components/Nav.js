import React, { Component } from "react";


class Nav extends Component {


   constructor(){
     super()
       this.state = {
         accounts:[],
         account:''

       }
     
       this.connect=this.connect.bind(this)
   }





  async connect(){
    if (typeof window.ethereum !== 'undefined') {
      console.log('MetaMask is installed!');
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = await  window.ethereum.selectedAddress;
      this.setState({account:account});
      // console.log('wl',account)
    }else{
      alert("Please install Metamask")

    }
  }


  
  render() {
    return (
      <div className="container">


        
        <div className="header"> 
        <div className="flex-nav">
            <div className="content-logo">
              <li>
                <a href="#">VoteX</a>
              </li>

           

            </div>
           <div className="menu-con">
           <a href="#" class="bn5" onClick={this.connect}>Connect</a>

           </div>
              

          
           </div>
      
       
          
        </div>
        </div>

 
      
    );
  }
}
export default Nav;
