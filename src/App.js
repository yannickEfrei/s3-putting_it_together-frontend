import "./App.css";
import React, { useState } from "react";
import axios from "axios";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState(false);

  // const BACKEND_URL = "YOUR_BACKEND_URL"
  const BACKEND_URL = "http://34.227.191.34";
  const onChangeHandler = (event) => {
    console.log(event.target.files[0]);
    setSelectedFile(event.target.files[0]);
  };

  const onUsernameChangeHandler = (e) => {
    setUsername(e.target.value);
  };

  const onClickHandler = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", selectedFile);
    data.append("username", username);
    console.log("data", data);
    axios
      .post(`${BACKEND_URL}/api/upload`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        setMessage({
          status: "success",
          message: "file uploaded successfully",
        });
      })
      .catch((err) => {
        setMessage({
          status: "fail",
          message: "there was an error in the upload: " + JSON.stringify(err),
        });
        console.log(err);
      });
  };

  return (
    <div className="App">
      <form className="main-form">
        <input
          type="text"
          placeholder="your username"
          name="username"
          value={username}
          onChange={onUsernameChangeHandler}
        />
        <div className="file-container">
          <input type="file" name="file" onChange={onChangeHandler} />
          <p>
            {selectedFile
              ? selectedFile.name
              : "Drag your files here or click in this area."}
          </p>
        </div>
        <button type="submit" onClick={onClickHandler}>
          Upload
        </button>
      </form>

      <br />
      {message && (
        <p className={"status " + message.status}>{message.message}</p>
      )}
    </div>
  );
}

export default App;
