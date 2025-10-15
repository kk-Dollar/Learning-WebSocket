import { io, Socket } from "socket.io-client";
import "./App.css";
import { useEffect, useRef, useState } from "react";
import Input from "./components/Input";
import {v4 as uuidv4} from "uuid"

function App() {
  const [score, setScore] = useState({});
  const [scores, setAllScores] = useState([]);
  const socketRef = useRef();
  const [isEdit,setEdit]=useState(false);

  useEffect(() => {
    socketRef.current = io("http://localhost:3000", { reconnection: true });

    socketRef.current.on("connect", () => {
      console.log("Connected:", socketRef.current.id);
    });

    socketRef.current.on("playerScores", (playerScores) => {
      setAllScores(playerScores);
    });

    return () => socketRef.current.disconnect();
  }, []);

  function handleInput(event) {
    const { name, value } = event.target;
    setScore((prev) => ({ ...prev, [name]: value }));
  }

  function sendScores() {
    socketRef.current.emit("scores",{ ...score,id:uuidv4()});
   setScore({
    name:'',score:''
   })
  }
  
  const getEditData =(data)=>{
    setScore(data);
    setEdit(true);
  }

  function handleEdit()
  {
    socketRef.current.emit("editData",score);
    setEdit(false);
    setScore({
    name:'',score:''
   })
  }
  const handleDelete=(id)=>{
    socketRef.current.emit("delete",id);
  }

  return (
    <>
      <h1>React Multiplayer Dashboard (WebSocket)</h1>
      <Input
        name="name"
        placeholder="Enter your name"
        handleInput={handleInput}
        score={score}
      />
      <Input
        name="score"
        placeholder="Enter your score"
        handleInput={handleInput}
        score={score}
      />
      <button onClick={isEdit?handleEdit:sendScores}>{isEdit?"Edit Data":"Publish Score"}</button>

      {scores.length > 0 && (
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th>Score</th>
              <th></th>
              <th></th>
            </tr>
            {scores.map((score) => (
              <tr key={score.id}>
                <td>{score?.name}</td>
                <td>{score?.score}</td>
                <td><button onClick={()=>getEditData(score)}>Edit</button></td>
                <td><button onClick={()=>handleDelete(score?.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default App;
