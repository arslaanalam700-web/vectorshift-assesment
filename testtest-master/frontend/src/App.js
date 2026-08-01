import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <span className="app-title">Circuit</span>
        <span className="app-subtitle">visual pipeline builder</span>
      </header>
      <PipelineToolbar />
      <PipelineUI />
      <SubmitButton />
    </div>
  );
}

export default App;
