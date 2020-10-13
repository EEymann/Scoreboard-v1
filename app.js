
const Header = (props) => {
  console.log(props);
  return (
    <header>
      <h1>{ props.title }</h1>
      <span className="stats">Players: { props.totalPlayers}</span>
    </header>
  );
}


const Player = (props) => {
  
  return (
    <div className="player">
      <span className="player-name">
      <button className="remove-player" onClick={ () => props.removePlayer(props.id) }>✖</button>
      {props.name}
      </span>
      <Counter />
    </div>
  );
}

//This is a "stateful" component:
class Counter extends React.Component {

  //*Not supported in all browsers. This code:
  state = {
    score: 0
  };

  //setState does 2 things: 1:update value of the score state,
  // 2:tell react that the counter component needs to re-render to make sure that everything is up to date in the UI.
  incrementScore = () => {
    this.setState( prevState => ({
      score: prevState.score + 1
    }));
  }

  //*Replaces this code:

  // constructor() {
  //   super()
  //   this.state = {
  //     score: 0
  //   };
  // }

  decrementScore = () => {
    this.setState( prevState => ({
      score: prevState.score - 1
    }));
  }

  render() {
    return (
      <div className="counter">
          <button className="counter-action decrement" onClick={this.decrementScore}> - </button>
          <span className="counter-score">{this.state.score}</span>
          <button className="counter-action increment" onClick={this.incrementScore}> + </button>
      </div>
      );
    }  
  }
  
class App  extends React.Component {

  state = {
    players: [  {
      name: "Kitty",
      id:1
    },
    {
      name: "Puppy",
      id:2
    },
    {
      name: "Frog",
      id:3
    },
    {
      name: "Toad",
      id:4
    }]
  }

  handleRemovePlayer = (id) => {
    this.setState( prevState => {
      return {
        players: prevState.players.filter( p => p.id !== id)
      };
    });
  }

  render() {
    return (
      <div className="scoreboard">
        <Header
         title="Scoreboard"
         totalPlayers={this.state.players.length}  
       />
  
      {/* Players list */}
      {this.state.players.map( player =>
      <Player
         name={player.name}
         id={player.id}
         key={player.id.toString()}
         removePlayer={this.handleRemovePlayer}
        />
      )}
    </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);


