import React, { SyntheticEvent, useState } from "react";
import Card from "./Card";
import "./UploadFile.css";
import { Node, Cluster, priceData } from "../types";
import PriceCard from "./PriceCard";
import { updateClusterCloud } from "../infracost/awsPrice";

interface DefaultValues {
  [key: string]: number;
}

const defaultValues: DefaultValues = {
  containers_total_usage_memory: 0,
  containers_total_usage_cpu: 0,
  kube_system_memory: 0,
  kube_system_cpu: 0,
  prometheus_memory: 0,
  prometheus_cpu: 0,
  istio_system_ns_memory: 0,
  istio_proxy_memory: 0,
  istio_system_ns_cpu: 0,
  istio_proxy_cpu: 0,
  linkerd_memory: 0,
  linkerd_proxy_memory: 0,
  linkerd_cpu: 0,
  linkerd_proxy_cpu: 0,
  calico_memory: 0,
  calico_cpu: 0,
  cert_mgr_memory: 0,
  cert_mgr_cpu: 0,
};

const FileUploadComponent = () => {
  const [text, setText] = useState({ value: "", show: false });
  const [error, setError] = useState<string>("");
  const [nodeArray, setNodeArray] = useState<Node[]>();
  const [currentPriceData, setPriceData] = useState<priceData>();
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const reader = new FileReader();

  // Functions For removing the Mi and convert to number
  const removeMi = (str: string): string => {
    if (typeof str !== "string") return str;
    return str.replace("Mi", "");
  };

  const convertToNumber = (str: string | number): string | number => {
    if (typeof str !== "string") return str;
    const value = parseFloat(str);
    return isNaN(value) ? str : value;
  };

  // When file loaded.
  reader.onloadend = () => {
    setButtonDisabled(true);
    setText({ value: "", show: false });

    let freeObject = JSON.parse(reader.result as string);
    if (freeObject instanceof Array) {
      let [json] = freeObject;
      for (const prop in json) {
        if (json.hasOwnProperty(prop)) {
          json[prop] = convertToNumber(removeMi(json[prop]));
        }
      }
    } else if (freeObject instanceof Object) {
      let json = freeObject;
      for (const prop in json) {
        if (json.hasOwnProperty(prop)) {
          json[prop] = convertToNumber(removeMi(json[prop]));
        }
      }

      const convertedToCluster: Cluster = Object.assign(
        {},
        json,
        Object.keys(defaultValues)
          .filter((key) => json[key] === undefined)
          .reduce((obj, key) => {
            obj[key] = defaultValues[key];
            return obj;
          }, {} as Cluster)
      );

      let memoryInfrastructure =
        convertedToCluster.kube_system_memory +
        convertedToCluster.prometheus_memory +
        convertedToCluster.istio_system_ns_memory +
        convertedToCluster.istio_proxy_memory +
        convertedToCluster.linkerd_proxy_memory +
        convertedToCluster.linkerd_memory +
        convertedToCluster.calico_memory +
        convertedToCluster.cert_mgr_memory;

      memoryInfrastructure = parseFloat(memoryInfrastructure.toFixed(5));

      let cpuInfrastructure =
        convertedToCluster.kube_system_cpu +
        convertedToCluster.prometheus_cpu +
        convertedToCluster.istio_system_ns_cpu +
        convertedToCluster.istio_proxy_cpu +
        convertedToCluster.linkerd_cpu +
        convertedToCluster.calico_cpu +
        convertedToCluster.cert_mgr_cpu;

      cpuInfrastructure = parseFloat(cpuInfrastructure.toFixed(5));

      let memoryApplication = parseFloat(
        (
          convertedToCluster.containers_total_usage_memory -
          memoryInfrastructure
        ).toFixed(5)
      );

      let cpuApplication = parseFloat(
        (
          convertedToCluster.containers_total_usage_cpu - cpuInfrastructure
        ).toFixed(5)
      );

      let readPriceData: priceData = {
        memoryInfrastructure: memoryInfrastructure,
        cpuInfrastructure: cpuInfrastructure,
        memoryApplication: memoryApplication,
        cpuApplication: cpuApplication,
        pricePerMemory: 0.00664381,
        pricePerCpu: 61.21,
      };
      if (convertedToCluster.nodes[0].cloud_provider === "aws") {
        updateClusterCloud(convertedToCluster).then(() => {
          const totalPrice = convertedToCluster.nodes.reduce(
            (acc, node) => acc + node.price!,
            0
          );
          readPriceData.competitorCloudPrice = totalPrice.toFixed(3);
          console.log(readPriceData.competitorCloudPrice);
          setButtonDisabled(false);
        });
      } else {
        setButtonDisabled(false);
      }
      setPriceData(readPriceData);
      setNodeArray([...convertedToCluster.nodes]);
    }
  };

  const handleFile = (event: SyntheticEvent<HTMLInputElement, Event>) => {
    const files = event.currentTarget.files;

    if (files) {
      if (files[0].type !== "application/json") {
        setError("Only Json format files, are allowed.");
        return;
      }

      reader.readAsText(files[0]);
    } else {
      console.warn("File has been loaded but wasn't handles");
    }
  };

  return (
    <div className="continer-div">
      <div className="top-continer-div">
        <button
          disabled={buttonDisabled}
          className="container-button"
          onClick={() => setText({ ...text, show: !text.show })}
        >
          View Information
        </button>
        <form id="Upload">
          <input
            className="input-button"
            onChange={(e) => handleFile(e)}
            type="file"
            id="file"
            accept=".json"
          />
        </form>
      </div>
      <div className="node-card">
        {text.show && nodeArray ? (
          <PriceCard {...(currentPriceData as priceData)} />
        ) : null}
      </div>
      <div className="node-card">
        {text.show
          ? nodeArray?.map((node, index) => {
              return (
                <div>
                  <Card key={index} {...node} />
                </div>
              );
            })
          : null}
      </div>
      <div>{error}</div>
    </div>
  );
};

export default FileUploadComponent;
