import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap, BackgroundVariant } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { APINode } from './nodes/APINode';
import { MathNode } from './nodes/MathNode';
import { FilterNode } from './nodes/FilterNode';
import { DelayNode } from './nodes/DelayNode';
import { MergeNode } from './nodes/MergeNode';

import 'reactflow/dist/style.css';
const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  api: APINode,
  math: MathNode,
  filter: FilterNode,
  delay: DelayNode,
  merge: MergeNode,
};

// node type -> accent color, for the minimap
const TYPE_COLOR = {
  customInput: '#4fd1c5',
  customOutput: '#f6ad55',
  llm: '#b794f6',
  text: '#63b3ed',
  math: '#68d391',
  filter: '#fc8181',
  delay: '#f6e05e',
  api: '#ed64a6',
  merge: '#7f9cf5',
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect
  } = useStore(selector, shallow);

  const getInitNodeData = (nodeID, type) => {
    let nodeData = { id: nodeID, nodeType: `${type}` };
    return nodeData;
  }

  const onDrop = useCallback(
  (event) => {
    event.preventDefault();

    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();

    const data =
      event.dataTransfer.getData('application/reactflow') ||
      event.dataTransfer.getData('text/plain');

    if (data && reactFlowInstance) {
      const type = data.startsWith('{') ? JSON.parse(data)?.nodeType : data;
      if (!type) {
        return;
      }

      const point = {
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      };

      const position = reactFlowInstance.screenToFlowPosition
        ? reactFlowInstance.screenToFlowPosition({
            x: event.clientX,
            y: event.clientY,
          })
        : reactFlowInstance.project(point);

      const nodeID = getNodeID(type);

      const newNode = {
        id: nodeID,
        type,
        position,
        data: getInitNodeData(nodeID, type),
      };

      addNode(newNode);
    }
  },
  [reactFlowInstance, addNode, getNodeID]
);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <>
      <div
        ref={reactFlowWrapper}
        className="pipeline-container"
        onDrop={onDrop}
        onDragOver={onDragOver}
      >
        {nodes.length === 0 && (
          <div className="canvas-hint">
            Drag a node here to start building your pipeline
          </div>
        )}
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={setReactFlowInstance}
          nodeTypes={nodeTypes}
          proOptions={proOptions}
          snapGrid={[gridSize, gridSize]}
          connectionLineType='smoothstep'
        >
          <Background
            variant={BackgroundVariant.Dots}
            color="#2a2e38"
            gap={20}
            size={1}
          />
          <Controls
            showInteractive={false}
          />
          <MiniMap
            zoomable
            pannable
            maskColor="rgba(20, 22, 27, 0.75)"
            style={{ background: '#191c22' }}
            nodeColor={(n) => TYPE_COLOR[n.type] || '#8b90a3'}
            nodeStrokeWidth={0}
          />
        </ReactFlow>
      </div>
    </>
  );
}
