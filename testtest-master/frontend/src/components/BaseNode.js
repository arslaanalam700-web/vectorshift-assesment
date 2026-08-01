import { Handle, Position } from 'reactflow';
import '../nodes/nodes.css';

const positionMap = {
  left: Position.Left,
  top: Position.Top,
  bottom: Position.Bottom,
  right: Position.Right,
};

export const NodeField = ({ label, children }) => (
  <label className="node-field">
    {label && <span className="field-label">{label}</span>}
    {children}
  </label>
);

export const BaseNode = ({
  title,
  icon,
  subtitle,
  handles = [],
  children,
  footer,
  style = {},
  className = '',
}) => {
  return (
    <div className={`base-node ${className}`.trim()} style={style}>
      <div className="node-accent" />
      <div className="node-header">
        {icon && <span className="node-icon">{icon}</span>}
        <div className="node-header-copy">
          <strong className="node-title">{title || 'Node'}</strong>
          {subtitle && <span className="node-subtitle">{subtitle}</span>}
        </div>
      </div>

      <div className="node-content">{children}</div>

      {footer && <div className="node-footer">{footer}</div>}

      {handles.map((handle) => (
        <div key={handle.id}>
          <Handle
            className="node-handle"
            type={handle.type}
            position={positionMap[handle.position] || Position.Right}
            id={handle.id}
            style={handle.style}
          />
          {handle.label && (
            <span
              className={`handle-label ${
                handle.position === 'left'
                  ? 'handle-label-left'
                  : 'handle-label-right'
              }`}
              style={{ top: handle.style?.top || '50%' }}
            >
              {handle.label}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};
