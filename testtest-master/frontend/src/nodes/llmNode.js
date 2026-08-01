import { BaseNode, NodeField } from '../components/BaseNode';
import { LLMIcon } from './icons';

export const LLMNode = ({ id }) => {
  return (
    <BaseNode
      title="LLM"
      icon={<LLMIcon />}
      subtitle="Compose prompts and generate responses"
      className="cat-llm"
      handles={[
        {
          id: `${id}-system`,
          type: 'target',
          position: 'left',
          style: { top: '33%' },
          label: 'System',
        },
        {
          id: `${id}-prompt`,
          type: 'target',
          position: 'left',
          style: { top: '66%' },
          label: 'Prompt',
        },
        {
          id: `${id}-response`,
          type: 'source',
          position: 'right',
          label: 'Response',
        },
      ]}
    >
      <NodeField label="Mode">
        <span>Reasoning and generation</span>
      </NodeField>
    </BaseNode>
  );
};
