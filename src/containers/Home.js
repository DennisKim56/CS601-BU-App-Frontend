import "./Home.css";

import Config from "../utility/config";

const Home = () => {
  return (
    <div className="home-container">
      <img
        className="home-splash"
        src={Config.S3_URL_PREFIX + "home-splash-min.jpg"}
        alt="Boston University"
      />
      <div className="home-text">
        The BU Planning App is intened to help BU graduate students who are
        participating or will participate in an online master's program. This
        tool assists users in planning and managing their academic journey
      </div>
    </div>
  );
};

export default Home;
