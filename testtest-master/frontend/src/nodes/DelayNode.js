import { BaseNode, NodeField } from '../components/BaseNode';
import { DelayIcon } from './icons';

export const DelayNode = ({ id }) => {
  return (
    <BaseNode
      title="Delay"
      icon={<DelayIcon />}
      subtitle="Pause execution for a set interval"
      className="cat-delay"
      handles={[
        {
          id: `${id}-input`,
          type: 'target',
          position: 'left',
          label: 'Start',
        },
        {
          id: `${id}-output`,
          type: 'source',
          position: 'right',
          label: 'Continue',
        },
      ]}
    >
      <NodeField label="Delay (ms)">
        <input
          type="number"
          placeholder="1000"
        />
      </NodeField>
    </BaseNode>
  );
};
