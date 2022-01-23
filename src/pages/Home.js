import React, { Component } from "react";
import cat from "../images/cat.jpg";
import dog from "../images/dog.jpg";
import alpaca from "../images/alpaca.jpg";
import Web3 from "web3";
import Votes from "contracts/Votes.json";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      score:[0,0,0,0],
    };

    this.scores = this.scores.bind(this);
  }




  
  
     // const open = await contract.methods.close().send({from: provider.selectedAddress});
    //  const open = await contract.methods.open().send({from: provider.selectedAddress});
    //  const open = await contract.methods.status().call();



  // async open(){
  //   let provider = window.ethereum;
  //   const web3 = new Web3(provider);
  //   await provider.enable();
  //   const networkId = await web3.eth.net.getId();

  //   const contract = new web3.eth.Contract(
  //     Votes.abi,
  //     Votes.networks[networkId].address
  //   );
  //   await contract.methods.open().send({from: provider.selectedAddress});
 


  // }
  async scores(){
    let provider = window.ethereum;
    const web3 = new Web3(provider);
    await provider.enable();
    const networkId = await web3.eth.net.getId();

    const contract = new web3.eth.Contract(
      Votes.abi,
      Votes.networks[networkId].address
    );
     const scores=  await contract.methods.scores().call();

     this.setState({
       score:scores
     })
    console.log('score',scores)
    
    
 


  }
  
  async vote(event){

   


    let provider = window.ethereum;
    const web3 = new Web3(provider);
    await provider.enable();
    const networkId = await web3.eth.net.getId();

    const contract = new web3.eth.Contract(
      Votes.abi,
      Votes.networks[networkId].address
    );


    if(event.target.name === "vote1"){
      await contract.methods.vote(1).send({from: provider.selectedAddress});

    }
    else if(event.target.name === "vote2")
    {
      await contract.methods.vote(2).send({from: provider.selectedAddress});

    }
    else if(event.target.name === "vote3")
    {
      await contract.methods.vote(3).send({from: provider.selectedAddress});


    }
    
 


  }
 

  render() {
    return (
      <div className="container">
     <div className="bg">

     <div className="addmin">
     <div className="addmin-item">
     <div className="vote-btn">
            
            </div>
    
    
   </div>
   <div className="addmin-item">
   <div className="vote-btn">
              <a href="#" onClick={this.scores}>
                See score
              </a>
            </div>
    
    
   </div>
    </div>

        <div className="home-flex">
        
          <div className="home-item">
            <div className="home-con">
              <h2 className="score">Score: {this.state.score[1]}</h2>
              <div class="card">
                <img src={cat} alt="Avatar" />
                <h4>
                  <b>John Doe</b>
                </h4>
                <p>Architect Engineer</p>
              </div>
            </div>
            <div className="vote-btn">
              <a href="#"  name="vote1" onClick={this.vote}>
                Vote
              </a>
            </div>
          </div>

          <div className="home-item">
            <div className="home-con">
              <h2 className="score">Score: {this.state.score[2]}</h2>
              <div class="card">
                <img src={dog} alt="Avatar" />
                <h4>
                  <b>John Doe</b>
                </h4>
                <p>Architect Engineer</p>
              </div>
            </div>
            <div className="vote-btn">
              <a href="#" name="vote2"onClick={this.vote}>
                Vote
              </a>
            </div>
          </div>

          <div className="home-item">
            <div className="home-con">
              <h2 className="score">Score: {this.state.score[3]}</h2>
              <div class="card">
                <img src={alpaca} alt="Avatar" />
                <h4>
                  <b>John Doe</b>
                </h4>
                <p>Architect Engineer</p>
              </div>
            </div>
            <div className="vote-btn">
              <a href="#" name="vote3"onClick={this.vote}>
                Vote
              </a>
            </div>
          </div>
        
        </div>
        </div>
      </div>
    );
  }
}

export default Home;
