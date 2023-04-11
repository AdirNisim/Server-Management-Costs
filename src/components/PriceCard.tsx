import "./Card.css";
import { priceData } from "../types";

const PriceCard: React.FC<priceData> = ({ ...updatePricedata }) => {
  let totalPrice =
    updatePricedata.cpuApplication * updatePricedata.pricePerCpu +
    updatePricedata.memoryApplication * updatePricedata.pricePerMemory;
  return (
    <div className="price-card">
      <h2 className="title-price-card"> Infrastructure Spec</h2>
      <div className="deatiles-price-card">
        <p>Cpu usage: {updatePricedata.cpuInfrastructure} Cores </p>
        <p>Memory usage: {updatePricedata.memoryInfrastructure} MiB </p>
      </div>
      <h2 className="title-price-card"> Application Spec</h2>
      <div className="deatiles-price-card">
        <p>Cpu usage: {updatePricedata.cpuApplication} Cores</p>
        <p>Memory usage: {updatePricedata.memoryApplication} MiB</p>
        <p>ControlPlane Price:</p>
        <p>${totalPrice.toFixed(2)}/month</p>
        {updatePricedata.competitorCloudPrice !== "0" && (
          <div className="cloud-price">
            paying estmation: ${updatePricedata.competitorCloudPrice}/month
          </div>
        )}
      </div>
    </div>
  );
};
export default PriceCard;
