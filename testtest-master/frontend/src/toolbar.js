import { DraggableNode } from './draggableNode';
import {
  InputIcon,
  OutputIcon,
  LLMIcon,
  TextIcon,
  MathIcon,
  FilterIcon,
  DelayIcon,
  APIIcon,
  MergeIcon,
} from './nodes/icons';

const GROUPS = [
  {
    label: 'I/O',
    items: [
      { type: 'customInput', label: 'Input', icon: <InputIcon />, category: 'input' },
      { type: 'customOutput', label: 'Output', icon: <OutputIcon />, category: 'output' },
    ],
  },
  {
    label: 'Core',
    items: [
      { type: 'llm', label: 'LLM', icon: <LLMIcon />, category: 'llm' },
      { type: 'text', label: 'Text', icon: <TextIcon />, category: 'text' },
    ],
  },
  {
    label: 'Logic',
    items: [
      { type: 'math', label: 'Math', icon: <MathIcon />, category: 'math' },
      { type: 'filter', label: 'Filter', icon: <FilterIcon />, category: 'filter' },
      { type: 'merge', label: 'Merge', icon: <MergeIcon />, category: 'merge' },
    ],
  },
  {
    label: 'Integrations',
    items: [
      { type: 'api', label: 'API', icon: <APIIcon />, category: 'api' },
      { type: 'delay', label: 'Delay', icon: <DelayIcon />, category: 'delay' },
    ],
  },
];

export const PipelineToolbar = () => {
  return (
    <div className="toolbar">
      <div className="toolbar-groups">
        {GROUPS.map((group) => (
          <div className="toolbar-group" key={group.label}>
            <span className="toolbar-group-label">{group.label}</span>
            <div className="toolbar-items">
              {group.items.map((item) => (
                <DraggableNode key={item.type} {...item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
