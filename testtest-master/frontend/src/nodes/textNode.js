import { useEffect, useMemo, useRef, useState } from 'react';
import { useUpdateNodeInternals } from 'reactflow';
import { BaseNode, NodeField } from '../components/BaseNode';
import { TextIcon } from './icons';

const VARIABLE_PATTERN = /\{\{\s*([A-Za-z_$][A-Za-z0-9_$]*)\s*\}\}/g;

const getVariables = (text) => {
  const matches = [...text.matchAll(VARIABLE_PATTERN)].map((match) => match[1]);
  return [...new Set(matches)];
};

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{ input }}');
  const textareaRef = useRef(null);
  const updateNodeInternals = useUpdateNodeInternals();

  const variables = useMemo(() => getVariables(currText), [currText]);

  useEffect(() => {
    if (!textareaRef.current) {
      return;
    }

    textareaRef.current.style.height = 'auto';
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  }, [currText]);

  useEffect(() => {
    updateNodeInternals(id);
  }, [id, updateNodeInternals, variables]);

  const longestLine = useMemo(
    () => Math.max(...currText.split('\n').map((line) => line.length), 1),
    [currText]
  );
  const nodeWidth = Math.min(560, Math.max(260, longestLine * 8 + 92));
  const nodeHeight = Math.max(150, 112 + variables.length * 24);

  const handles = useMemo(
    () => [
      ...variables.map((variable, index) => ({
        id: `${id}-${variable}`,
        type: 'target',
        position: 'left',
        label: variable,
        style: {
          top: `${((index + 1) / (variables.length + 1)) * 100}%`,
        },
      })),
      {
        id: `${id}-output`,
        type: 'source',
        position: 'right',
        label: 'Output',
      },
    ],
    [id, variables]
  );

  return (
    <BaseNode
      title="Text"
      icon={<TextIcon />}
      subtitle="Expand text and expose template variables"
      className="cat-text"
      style={{
        width: `${nodeWidth}px`,
        minHeight: `${nodeHeight}px`,
      }}
      handles={handles}
      footer={
        variables.length ? (
          <div className="var-chip-row">
            {variables.map((variable) => (
              <span key={variable} className="var-chip">
                {variable}
              </span>
            ))}
          </div>
        ) : (
          'Use {{ variable }} to create new inputs.'
        )
      }
    >
      <NodeField label="Text">
        <textarea
          ref={textareaRef}
          rows={1}
          style={{ overflow: 'hidden', resize: 'none', width: '100%' }}
          value={currText}
          onChange={(event) => setCurrText(event.target.value)}
          spellCheck={false}
        />
      </NodeField>
    </BaseNode>
  );
};
