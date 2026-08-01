import { BaseNode, NodeField } from '../components/BaseNode';
import { APIIcon } from './icons';

export const APINode = ({ id }) => {
  return (
    <BaseNode
      title="API"
      icon={<APIIcon />}
      subtitle="Send or receive remote payloads"
      className="cat-api"
      handles={[
        {
          id: `${id}-request`,
          type: 'target',
          position: 'left',
          label: 'Request',
        },
        {
          id: `${id}-response`,
          type: 'source',
          position: 'right',
          label: 'Response',
        },
      ]}
    >
      <NodeField label="URL">
        <input type="text" placeholder="https://api.example.com" />
      </NodeField>
    </BaseNode>
  );
};
