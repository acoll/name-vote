import React from "react";

import Layout from "./components/Layout";
import AddButton from "./components/AddButton";

export default function App() {
  return <Layout addButton={<AddButton />} />;
}

/*import React from "react";
import { compose, withState, withHandlers } from "recompose";

import { withFirebase } from "./firebase";

import AddButton from "./components/AddButton";

function Create({ text, setText, submit }) {
  return (
    <div className="create">
      <input
        type="text"
        value={text}
        placeholder="New Potential Name"
        onChange={evt => setText(evt.target.value)}
      />
      <button onClick={submit}>Submit</button>
    </div>
  );
}

function Subscribe({ subscribe, unsubscribe }) {
  return (
    <div className="notifications">
      <button onClick={subscribe}>
        Subscribe
      </button>
      <button onClick={unsubscribe}>
        Un-Subscribe
      </button>
    </div>
  );
}

const CreateWithStuff = compose(
  withState("text", "setText", ""),
  withHandlers({
    submit: props => evt => {
      props.addName(props.text);
      props.setText("");
    }
  })
)(Create);

function Voting({ names = [], voteYes, voteNo, voteKinda }) {
  return (
    <div>
      {names.map(name => (
        <div className="name-row" key={name.id}>
          <div>
            <h2>{name.name}</h2>
            <span className="count">
              Yes:
              {" "}
              {name.yesVotes}
              {" "}
              - No:
              {" "}
              {name.noVotes}
              {" "}
              - Kinda:
              {" "}
              {name.kindaVotes}
            </span>
          </div>
          <div className="buttons">
            <button onClick={() => voteYes(name.id)}>Yes</button>
            <button onClick={() => voteNo(name.id)}>No</button>
            <button onClick={() => voteKinda(name.id)}>Kinda</button>
          </div>
        </div>
      ))}
    </div>
  );
}

function App(props) {
  return (
    <div>
      <AddButton />
    </div>
  );
  /*if (!props.user) {
    return (
      <div className="App">
        <button onClick={props.login}>Login</button>
      </div>
    );
  }

  return (
    <div>
      {props.names
        ? <div>
            <Voting
              names={props.names}
              voteYes={props.voteYes}
              voteNo={props.voteNo}
              voteKinda={props.voteKinda}
            />
          </div>
        : null}
      <button style={{ marginTop: "40px" }} onClick={props.logout}>
        Logout
      </button>
      <Subscribe subscribe={props.subscribe} unsubscribe={props.unsubscribe} />
    </div>
  );
}

export default compose(withFirebase)(App);*/
