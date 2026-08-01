export const DraggableNode = ({ type, label, icon, category }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };

    event.currentTarget.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.setData('text/plain', nodeType);
    event.dataTransfer.effectAllowed = 'copyMove';
  };

  return (
    <div
      className="draggable-node"
      style={{ '--accent': `var(--c-${category})` }}
      draggable={true}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => {
        event.currentTarget.style.cursor = 'grab';
      }}
    >
      {icon && <span className="node-icon">{icon}</span>}
      <span className="node-label">{label}</span>
    </div>
  );
};
