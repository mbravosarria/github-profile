import PropTypes from "prop-types";
import "./Card.css";
import NestingIcon from "../../assets/Nesting.svg";
import StarIcon from "../../assets/Star.svg";
import LicenseIcon from "../../assets/Chield_alt.svg";
import { trimString } from "../../libs/utils";
import { useWindowSize } from "@uidotdev/usehooks";

function Card({ name, description, license, forks, stars, lastUpdate }) {
  const { width } = useWindowSize();

  return (
    <div className="card-content">
      <h2 className="name">{name}</h2>
      <p className="secondary-text description">{description}</p>
      <div className="card-footer">
        {license && (
          <div className="info-box">
            <img src={LicenseIcon} className="icon" alt="Nesting Icon" />
            <p className="secondary-text license">
              {width < 1600 ? trimString(license, 11) : trimString(license, 21)}
            </p>
          </div>
        )}
        <div className="info-box">
          <img src={NestingIcon} className="icon" alt="Nesting Icon" />
          <p className="secondary-text forks">{forks}</p>
        </div>
        <div className="info-box">
          <img src={StarIcon} className="icon" alt="Nesting Icon" />
          <p className="secondary-text stars">{stars}</p>
        </div>
        <p className="secondary-text last-update">{lastUpdate.split("T")[0]}</p>
      </div>
    </div>
  );
}

Card.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  license: PropTypes.string,
  forks: PropTypes.number,
  stars: PropTypes.number,
  lastUpdate: PropTypes.string,
};

export default Card;
