import React, { FC, useMemo } from "preact/compat";
import Select from "../../Main/Select/Select";
import "./style.scss";
import { GRAPH_SIZES } from "../../../constants/graph";

interface ExploreMetricsHeaderProps {
  jobs: string[]
  instances: string[]
  names: string[]
  job: string
  instance: string
  size: string
  selectedMetrics: string[]
  onChangeJob: (job: string) => void
  onChangeInstance: (instance: string) => void
  onToggleMetric: (name: string) => void
  onChangeSize: (sizeId: string) => void
}

const sizeOptions = GRAPH_SIZES.map(s => s.id);

const ExploreMetricsHeader: FC<ExploreMetricsHeaderProps> = ({
  jobs,
  instances,
  names,
  job,
  instance,
  size,
  selectedMetrics,
  onChangeJob,
  onChangeInstance,
  onToggleMetric,
  onChangeSize
}) => {
  const noInstanceText = useMemo(() => job ? "" : "No instances. Please select job", [job]);
  const noMetricsText = useMemo(() => job ? "" : "No metric names. Please select job", [job]);

  return (
    <div className="vm-explore-metrics-header vm-block">
      <div className="vm-explore-metrics-header__job">
        <Select
          value={job}
          list={jobs}
          label="Job"
          placeholder="Please select job"
          onChange={onChangeJob}
          autofocus={!job}
        />
      </div>
      <div className="vm-explore-metrics-header__instance">
        <Select
          value={instance}
          list={instances}
          label="Instance"
          placeholder="Please select instance"
          onChange={onChangeInstance}
          noOptionsText={noInstanceText}
          clearable
        />
      </div>
      <div className="vm-explore-metrics-header__size">
        <Select
          label="Size graphs"
          value={size}
          list={sizeOptions}
          onChange={onChangeSize}
        />
      </div>
      <div className="vm-explore-metrics-header-metrics">
        <Select
          value={selectedMetrics}
          list={names}
          placeholder="Search metric name"
          onChange={onToggleMetric}
          noOptionsText={noMetricsText}
          clearable
        />
      </div>
    </div>
  );
};

export default ExploreMetricsHeader;
