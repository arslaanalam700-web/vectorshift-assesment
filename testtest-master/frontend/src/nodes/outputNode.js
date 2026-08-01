import { useState } from 'react';
import { BaseNode, NodeField } from '../components/BaseNode';
import { OutputIcon } from './icons';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  return (
    <BaseNode
      title="Output"
      icon={<OutputIcon />}
      subtitle="Endpoint for pipeline results"
      className="cat-output"
      handles={[
        {
          id: `${id}-value`,
          type: 'target',
          position: 'left',
          label: 'Value',
        },
      ]}
    >
      <NodeField label="Name">
        <input
          type="text"
          value={currName}
          onChange={handleNameChange}
        />
      </NodeField>

      <NodeField label="Type">
        <select
          value={outputType}
          onChange={handleTypeChange}
        >
          <option value="Text">Text</option>
          <option value="JSON">JSON</option>
        </select>
      </NodeField>
    </BaseNode>
  );
};
