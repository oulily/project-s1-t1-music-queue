import React from "react";
import "./style.css";

class Input extends React.Component {
  constructor() {
    super();
    this.state = {
      score: 0,
      name: "",
      sent_to_database: false
    };
    this.incrementScore = this.incrementScore.bind(this);
    this.decrementScore = this.decrementScore.bind(this);
    this.nameChange = this.nameChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  // increments the score of the particular song
  incrementScore() {
    this.setState(prevState => {
      return {
        score: prevState.score + 1,
        name: prevState.name,
        sent_to_database: false
      };
    });
  }

  // decrements the score of the particular song
  decrementScore() {
    this.setState(prevState => {
      // if the score is 0; don't go negative!
      if (prevState.score == 0) {
        return {
          score: 0,
          name: prevState.name,
          sent_to_database: false
        };
      }
      // score is not 0; subtract 1
      else {
        return {
          score: prevState.score - 1,
          name: prevState.name,
          sent_to_database: false
        };
      }
    });
  }

  // handles changes to name of song dynamically
  nameChange() {
    this.setState(prevState => {
      return {
        score: prevState.score,
        name: event.target.value,
        sent_to_database: false
      };
    });
  }

  // submit information to the MongoDB Database
  submit() {
    // // save songName and score to send to mongoDB database
    // const songName = this.state.name;
    // const score = this.state.score;

    // const MongoClient = require("mongodb").MongoClient; // MongoDB module that is required to connect to a MongoDB database
    // // Note that the password for the MongoClient is "MusicQ"
    // const uri =
    //   "mongodb+srv://gautam_mundewadi:<MusicQ>@cluster0-yxuih.azure.mongodb.net/test?retryWrites=true&w=majority";
    // const client = new MongoClient(uri, { useNewUrlParser: true });
    // // create a new listing in the database
    // this.createListing(client, { hello: "test" });

    // update state to conditional render message to user
    this.setState(prevState => {
      return {
        score: prevState.score,
        name: prevState.name,
        sent_to_database: true
      };
    });
  }

  // create a lisiting of a song to the MongoDB Database.
  async createListing(client, newListing) {
    const result = await client
      .db("test")
      .collection("devices")
      .insertOne(newListing);
    console.log(
      `New listing created with the following id: ${result.insertedId}`
    );
  }

  render() {
    return (
      <div>
        <h1>Input to MongoDB Database</h1>

        {/* Gather name of song */}
        <form className>
          <label form="sname">Song Name </label>
          <input
            type="text"
            id="sname"
            name="sname"
            value={this.state.name}
            onChange={this.nameChange}
            placeholder="enter song name"
          ></input>
        </form>

        {/* Gather score of song */}
        <h1>{this.state.score}</h1>
        <button onClick={this.incrementScore}>Upvote</button>
        <button onClick={this.decrementScore}>Downvote</button>
        <br />
        <br />

        {/* sumbit name and score of song to MongoDB Database*/}
        <button
          onClick={this.submit}
          className="button"
          style={{ verticalAlign: "middle" }}
        >
          {" "}
          <span> Save to Database </span>
        </button>

        {/* Conditional rendering to display data sent to MongoDB Database*/}
        <h1 style={{ display: this.state.sent_to_database ? "block" : "none" }}>
          {" "}
          {this.state.name} saved to MongoDB Database{" "}
        </h1>
      </div>
    );
  }
}

export default Input;
