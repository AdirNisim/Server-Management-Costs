import { BadgeInterface } from "../types";
import "./badge.css";
const Badge = ({ text }: BadgeInterface) => {
  return <small className="badge">{text.toUpperCase()}</small>;
};
export default Badge;
