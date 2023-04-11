import { Node, Cluster } from "../types";
import axios from "axios";

const API_KEY = "ico-60ViO121Tq1h1QjVWeTvPg0e2gFOiRhW";
const endpoint = "https://pricing.api.infracost.io/graphql";

const headers = {
  "Content-Type": "application/json",
  "X-Api-Key": API_KEY,
};

export async function updateNodePrice(node: Node): Promise<any> {
  const query = `query {
        products(
          filter: {
            vendorName: "aws",
            service: "AmazonEC2",
            productFamily: "Compute Instance",
            region: "${node.region}",
            attributeFilters: [
              { key: "instanceType", value: "${node.instance_type}" }
              { key: "operatingSystem", value: "Linux" }
              { key: "tenancy", value: "Shared" }
              { key: "capacitystatus", value: "Used" }
              { key: "preInstalledSw", value: "NA" }
            ]
          },
        ) {
          prices(
            filter: {purchaseOption: "${node.purchaseOption.replace("-", "_")}"}
          ){ USD }
        }
      }`;

  try {
    const response = await axios.post(endpoint, { query }, { headers });
    return (await response.data.data.products[0].prices[0].USD) * 730;
  } catch (error) {
    return 0;
  }
}

export async function updateClusterCloud(cluster: Cluster): Promise<void> {
  const prices = await Promise.all(
    cluster.nodes.map(async (x) => await updateNodePrice(x))
  );
  console.log("prices:");
  console.log(prices);
  cluster.nodes.forEach((node, index) => {
    node.price = prices[index];
  });
}
