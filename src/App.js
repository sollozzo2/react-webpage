import logo from './logo.svg';
import './App.css';
import TypeIt from "typeit-react";
import React, { useState } from 'react';
import styled from 'styled-components';
import ReactDOM from 'react-dom';

var counter = 0;

const Button = styled.button`
  background-color: black;
  color: white;
  font-size: 20px;
  padding: 10px 60px;
  border-radius: 5px;
  margin: 10px 0px;
  cursor: pointer;
  align-content: center;

  &:disabled {
    color: grey;
    opacity: 0.7;
    cursor: default;
  }
`;

function Message(props) {
  return (
    <div className="chattext">
      <div className="chattext" />
        <span>
          User: <br/>
          {props.usertext} 
        </span>

        <span>
        <br/><br/>
          Jason: <br/>
          <TypeIt options={{afterComplete: props.complete, startDelay: 1000}}>
            {props.jasontext}
          </TypeIt> <br/>
        </span>
    </div>
  );
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
                    chatval: Array(3).fill(null), 
                    chatstrings: [
                      ["What is your name?", "My name is Jason, like I said."],
                      ["What is your quest?", "My quest is to find the meaning of love in this chaotic world."],
                      ["What is your favourite colour?", "My favourite colour is green because I like trees."],
                      ["What is...", "I'd really like to stay here and chat but I have to get going. Meanwhile you can have a look around my page."]
                    ],
                    buttonstate: Array(3).fill(0),
                    fuck: false,
                 };
  }

  handleClick(buttonnum, buttonid) {
    var tempbuttonstate = this.state.buttonstate.slice();
    tempbuttonstate[buttonnum] = 1;

    //document.getElementById("chatwindow").scrollIntoView(false);
    var tempchatval = this.state.chatval.slice();
    for (var i = 0; i < tempchatval.length; i++) {
      if (tempchatval[i] == null) {
        console.log("updating", i, buttonnum)
        tempchatval[i] = buttonnum;
        break;
      }
    }
    this.setState({chatval: tempchatval, buttonstate: tempbuttonstate});

    var objDiv = document.getElementById("chatwindow");

    console.log("clickhandleyeeeeeee")
    //objDiv.scrollTop = 9999;//objDiv.scrollHeight;
    //objDiv.scrollIntoView({block: "end"});
  }

  yeet(step, instance) {
    counter += 1;
    if (counter == 3) {
      this.handleClick(0, "question0");
    }
    console.log("counter", counter)
    instance.destroy();
  }

  render() {
    console.log("render is activated");
    var messages = [];
    for (var i = 0; i < this.state.chatval.length; i++) {
      if (this.state.chatval[i] != null) {
        messages.push(<Message complete={this.yeet} jasontext={this.state.chatstrings[this.state.chatval[i]][1]} usertext={this.state.chatstrings[this.state.chatval[i]][0]} />);
        console.log(i, this.state.chatval[i], this.state.chatstrings[0][1]);
      }
      console.log("counter", counter);
      if (i >= 2 && this.state.chatval[i] != null && counter == 3) {
        messages.push(<Message complete={this.yeet} jasontext={this.state.chatstrings[3][1]} usertext={this.state.chatstrings[3][0]} />)
        console.log(messages);
      }
    }
    return (
      <div className="App">
        <header className="App-header">
          
        <a>About</a>
        <a>Learn React</a>
        <a>Gallery</a>
        <a>Contact</a>
        </header>

        <div id="chatwindow" className="main">
          <div className="chattext">
            Jason: <TypeIt>Hi, I'm Jason.</TypeIt><br />
          </div>
          <div>{messages}</div>
        </div>

        <div className="optionrow">
          <Button id="question0" onClick={() => this.handleClick(0, "question0")} disabled={this.state.buttonstate[0]}>What is your name?</Button>
          <Button id="question1" onClick={() => this.handleClick(1, "question1")} disabled={this.state.buttonstate[1]}>What is your quest?</Button>
          <Button id="question2" onClick={() => this.handleClick(2, "question2")} disabled={this.state.buttonstate[2]}>What is your favorite colour?</Button>
        </div>
      </div>
    );
  }
}

function main() {
  //return <div>hi</div>;
  return <Game />;
  //ReactDOM.render(<Game />, document.getElementById("root"));
}

export default main;
