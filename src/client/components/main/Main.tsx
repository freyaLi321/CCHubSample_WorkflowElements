import { useNavigate } from "react-router-dom";
import { SAMPLES } from "../../constants/samples";
import "./Main.scss";

const Main = () => {
  const navigate = useNavigate();

  return (
    <div className="main">
      <div className="main__samples">
        <div className="main__samples-title">Code examples</div>
        <div className="main__samples-list">
          {SAMPLES.map((sample, index) => (
            <div className="main__samples-list__item" key={index}>
              <a className="main__samples-list__item-title" onClick={() => navigate(sample.path)}>
                {sample.name}
              </a>
              <div className="main__samples-list__item-desc">
                {sample.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Main;