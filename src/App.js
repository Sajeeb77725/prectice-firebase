import "./App.css";
import app from "./firebase.init";
import {
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useState } from "react";

const auth = getAuth(app);
function App() {
  const [user, setUser] = useState({});
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const handleSingOut = () => {
    signOut(auth)
      .then(() => {
        setUser({});
      })
      .catch((error) => {
        setUser({});
      });
  };
  const handleSingIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        console.log(user);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleGithubSingIn = () => {
    signInWithPopup(auth, githubProvider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        console.log(user);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className="App">
      {user.uid ? (
        <button onClick={handleSingOut}>Sing out</button>
      ) : (
        <>
          <button onClick={handleSingIn}>Google sing in</button>
          <button onClick={handleGithubSingIn}>Github Sing In</button>
        </>
      )}
      <h2>Name: {user.displayName}</h2>
      <p>Email: {user.email}</p>
      <img src={user.photoURL} alt="" />
    </div>
  );
}

export default App;
