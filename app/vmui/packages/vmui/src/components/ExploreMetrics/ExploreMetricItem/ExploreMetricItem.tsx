import React, { FC, useEffect, useMemo, useState } from "preact/compat";
import ExploreMetricItemGraph from "../ExploreMetricGraph/ExploreMetricItemGraph";
import ExploreMetricItemHeader from "../ExploreMetricItemHeader/ExploreMetricItemHeader";
import "./style.scss";
import useResize from "../../../hooks/useResize";
import { GraphSize } from "../../../types";

interface ExploreMetricItemProps {
  name: string
  job: string
  instance: string
  index: number
  size: GraphSize
  onRemoveItem: (name: string) => void
  onChangeOrder: (name: string, oldIndex: number, newIndex: number) => void
}

const ExploreMetricItem: FC<ExploreMetricItemProps> = ({
  name,
  job,
  instance,
  index,
  size,
  onRemoveItem,
  onChangeOrder,
}) => {

  const isCounter = useMemo(() => /_sum?|_total?|_count?/.test(name), [name]);
  const isBucket = useMemo(() => /_bucket?/.test(name), [name]);

  const [rateEnabled, setRateEnabled] = useState(isCounter);

  const windowSize = useResize(document.body);
  const graphHeight = useMemo(size.height, [size, windowSize]);

  useEffect(() => {
    setRateEnabled(isCounter);
  }, [job]);

  return (
    <div className="vm-explore-metrics-item vm-block vm-block_empty-padding">
      <ExploreMetricItemHeader
        name={name}
        index={index}
        isBucket={isBucket}
        rateEnabled={rateEnabled}
        size={size.id}
        onChangeRate={setRateEnabled}
        onRemoveItem={onRemoveItem}
        onChangeOrder={onChangeOrder}
      />
      <ExploreMetricItemGraph
        key={`${name}_${job}_${instance}_${rateEnabled}`}
        name={name}
        job={job}
        instance={instance}
        rateEnabled={rateEnabled}
        isBucket={isBucket}
        height={graphHeight}
      />
    </div>
  );
};

export default ExploreMetricItem;
