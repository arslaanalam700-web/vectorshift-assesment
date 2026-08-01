import { useState } from 'react';
import axios from 'axios';
import { shallow } from 'zustand/shallow';
import { useStore } from './store';

export const SubmitButton = () => {
  const selector = (state) => ({
    nodes: state.nodes,
    edges: state.edges,
  });

  const { nodes, edges } = useStore(selector, shallow);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleCallPipeline = async () => {
    setError(null);

    try {
      const res = await axios.post('http://localhost:8000/pipelines/parse', {
        nodes,
        edges,
      });

      const nextResult = {
        numNodes: res.data.num_nodes,
        numEdges: res.data.num_edges,
        isDag: res.data.is_dag,
      };

      setResult(nextResult);

      window.alert(
        `Pipeline parsed successfully.\n\n` +
          `Nodes: ${nextResult.numNodes}\n` +
          `Edges: ${nextResult.numEdges}\n` +
          `Directed acyclic graph: ${nextResult.isDag ? 'Yes' : 'No'}`
      );
    } catch (err) {
      setResult(null);
      setError(err.response?.data?.detail || err.message || 'Request failed');
    }
  };

  return (
    <div className="submit-bar">
      {result && (
        <div className="result-card">
          <span>
            <strong>{result.numNodes}</strong> nodes
          </span>
          <span>
            <strong>{result.numEdges}</strong> edges
          </span>
          <span className={result.isDag ? 'dag-yes' : 'dag-no'}>
            {result.isDag ? 'Valid DAG' : 'Not a DAG'}
          </span>
        </div>
      )}
      {error && (
        <div className="result-card is-error">
          <span>{error}</span>
        </div>
      )}
      <button className="submit-btn" onClick={handleCallPipeline}>
        Submit
      </button>
    </div>
  );
};
