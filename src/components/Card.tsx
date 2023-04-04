import "./Card.css";
import { Node } from "../types";
import Badge from "./badge";

// const Card: React.FC<Node> = ({ ...nodeData }) => {
const Card: React.FC<Node> = ({ ...nodeData }) => {
  console.log(nodeData);
  // console.log(region);

  return (
    <div className="card-container">
      <div className="card-top">
        <h2>{nodeData.region}</h2>
      </div>
      <Badge text={nodeData.cloud_provider}></Badge>
      <ul className="server-info">
        <li>
          {" "}
          <u>Node memory:</u> {nodeData.requests_memory}
        </li>
        <li>
          {" "}
          <u>Node cpu:</u> {nodeData.requests_cpu}
        </li>
        <li>
          {" "}
          <u>Purche option:</u> {nodeData.purchaseOption}
        </li>
        <li>
          {" "}
          <u>Allocate cpu:</u> {nodeData.allocatable_cpu}
        </li>
        <li>
          {" "}
          <u>Allocate memory:</u> {nodeData.allocatable_memory}
        </li>
      </ul>
    </div>
  );
};
export default Card;
