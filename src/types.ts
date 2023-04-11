export interface BadgeInterface {
  text: string;
}

export interface Cluster {
  cluster: string;
  script_version: string;
  containers_total_usage_memory: number;
  containers_total_usage_cpu: number;
  kube_system_memory: number;
  kube_system_cpu: number;
  prometheus_memory: number;
  prometheus_cpu: number;
  istio_system_ns_memory: number;
  istio_proxy_memory: number;
  istio_system_ns_cpu: number;
  istio_proxy_cpu: number;
  linkerd_memory: number;
  linkerd_proxy_memory: number;
  linkerd_cpu: number;
  linkerd_proxy_cpu: number;
  calico_memory: number;
  calico_cpu: number;
  cert_mgr_memory: number;
  cert_mgr_cpu: number;
  query_period: string;
  is_prom: string;
  nodes: Node[];
  [key: string]: any;
}

export interface Node {
  node: string;
  cloud_provider: string;
  instance_type: string;
  region: string;
  purchaseOption: string;
  node_cpu: string;
  node_memory: string;
  allocatable_cpu: string;
  allocatable_memory: string;
  requests_cpu: string;
  requests_memory: string;
  consumed_node_cpu: string;
  containers_usage_cpu: string;
  consumed_node_memory: string;
  containers_usage_memory: string;
  is_prom: string;
  query_period: string;
  price?: number;
}

export interface priceData {
  memoryInfrastructure: number;
  cpuInfrastructure: number;
  memoryApplication: number;
  cpuApplication: number;
  pricePerMemory: number;
  pricePerCpu: number;
  competitorCloudPrice?: string;
  // totalPriceforMemory: number;
  // totalPriceforCpu: number;
}
