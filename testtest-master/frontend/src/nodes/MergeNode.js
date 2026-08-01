import { BaseNode, NodeField } from '../components/BaseNode';
import { MergeIcon } from './icons';

export const MergeNode = ({ id }) => {
  return (
    <BaseNode
      title="Merge"
      icon={<MergeIcon />}
      subtitle="Combine parallel branches"
      className="cat-merge"
      handles={[
        {
          id: `${id}-input-a`,
          type: 'target',
          position: 'left',
          style: { top: "30%" },
          label: 'A',
        },
        {
          id: `${id}-input-b`,
          type: 'target',
          position: 'left',
          style: { top: "70%" },
          label: 'B',
        },
        {
          id: `${id}-output`,
          type: 'source',
          position: 'right',
          label: 'Merged',
        },
      ]}
    >
      <NodeField label="Mode">
        <span>Keep order and preserve both streams</span>
      </NodeField>
    </BaseNode>
  );
};
