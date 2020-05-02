import { useState, useCallback, useEffect } from "react";
import { fetch } from "../utils/fetch";

export default function Table(props) {
  const [score, setScore] = useState(props.score);

  // this callback renders the score when intially
  // rendered
  useEffect(() => {
    setScore(props.score);
  }, [props.score]);

  // handles changes when upvoting score of each of song dynamically
  const increment = useCallback(
    async event => {
      await fetch("/api/increment", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        // the body of this song is built from state
        body: JSON.stringify({
          name: props.name
        })
      });
      // forces a call to the hook useSWR
      props.mutate();
    },
    [score]
  );

  // handles changes when downvoting score of each of song dynamically
  const decrement = useCallback(
    async event => {
      await fetch("/api/decrement", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        // the body of this song is built from state
        body: JSON.stringify({
          name: props.name
        })
      });
      // forces a call to the hook useSWR
      props.mutate();
    },
    [score]
  );

  return (
    <tr>
      {/* output name and score of song*/}
      <td>{props.name}</td>
      <td>{score}</td>
      <td>
        {/* button to upvote*/}
        <button
          onClick={() => {
            setScore(score + 1);
            increment();
          }}
        >
          upvote
        </button>
      </td>
      <td>
        {/* button to downvote. Cannot be < 0*/}
        <button
          onClick={() => {
            if (score > 0) {
              setScore(score - 1);
            }
            decrement();
          }}
        >
          {" "}
          downvote
        </button>
      </td>
    </tr>
  );
}
