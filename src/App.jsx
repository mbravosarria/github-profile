import "./App.css";
import Tip from "./components/Tip/Tip";
import ImageHero from "./assets/hero-image-github-profile.png";
import GithubLogo from "./assets/github.svg";
import SearchIcon from "./assets/Search.svg";
import Card from "./components/Card/Card";
import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [username, setUsername] = useState("github");
  const [user, setUser] = useState();
  const [repositories, setRepositories] = useState();
  const [largeList, setLargeList] = useState();
  const [showAllRepos, setShowAllRepos] = useState(false);
  const input = useRef();

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      setUsername(input.current.value);
    }
  }

  input.current?.addEventListener("keypress", handleKeyPress);

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.message) toast.error(data.message);
        else {
          setUser(data);
          fetch(`https://api.github.com/users/${username}/repos`)
            .then((response) => response.json())
            .then((data) => {
              setLargeList(data);
              setRepositories(data.slice(0, 6));
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log("User not found");
        toast.error("User not found");
        console.log(error);
      });
  }, [username]);

  useEffect(() => {
    if (showAllRepos) setRepositories(largeList);
  }, [largeList, showAllRepos]);

  return (
    <div className="root">
      <div className="search-box">
        <img src={SearchIcon} alt="Search icon" />
        <input
          ref={input}
          type="text"
          placeholder="username"
          className="username-input"
        />
      </div>
      <div className="container">
        <img
          src={ImageHero}
          alt="Hero image github profile"
          className="header-picture"
        />
        <div className="content">
          <div className="header-content">
            <img src={GithubLogo} alt="Github logo" className="github-logo" />
            <div className="header-tips">
              {(user?.followers || user?.followers === 0) && (
                <Tip label="Followers" value={user?.followers} />
              )}
              {(user?.following || user?.following === 0) && (
                <Tip label="Following" value={user?.following} />
              )}
              {user?.location && (
                <Tip label="Location" value={user?.location} />
              )}
            </div>
          </div>
          <h1 className="profile-name">{user?.name}</h1>
          <p className="profile-description">{user?.bio}</p>
          <div className="repositories">
            {repositories?.map((repository) => (
              <Card
                key={repository?.id}
                name={repository?.name}
                description={repository?.description}
                forks={repository?.forks}
                stars={repository?.stargazers_count}
                lastUpdate={repository?.updated_at}
                license={repository?.license?.name}
              />
            ))}
          </div>
          {!showAllRepos && (
            <div className="all-repos" onClick={() => setShowAllRepos(true)}>
              <p>View all repositories</p>
            </div>
          )}
        </div>
      </div>
      <ToastContainer theme="dark" />
    </div>
  );
}

export default App;
