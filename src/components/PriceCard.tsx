import "./Card.css";
import { priceData } from "../types";

const PriceCard: React.FC<priceData> = ({ ...updatePricedata }) => {
  let totalPrice =
    updatePricedata.cpu * updatePricedata.pricePerCpu +
    updatePricedata.memory * updatePricedata.pricePerMemory;
  return (
    <div className="price-card">
      <h2 className="title-price-card"> Server spec</h2>
      <div className="deatiles-price-card">
        <p>Cpu usage: {updatePricedata.cpu}</p>
        <p>Memory usage: {updatePricedata.memory}</p>
        <p>ControlPlane Price:</p>
        <p>{totalPrice}</p>
      </div>
    </div>
  );
};
export default PriceCard;
