import "./Tip.css";
import PropTypes from "prop-types";

function Tip({ label, value }) {
  return (
    <div className="tip-content">
      <p className="tip-label">{label}</p>
      <p className="tip-value">{value}</p>
    </div>
  );
}

Tip.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Tip;
