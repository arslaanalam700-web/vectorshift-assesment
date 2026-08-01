import { BaseNode, NodeField } from '../components/BaseNode';
import { MathIcon } from './icons';

export const MathNode = ({ id }) => {
    return (
        <BaseNode
            title="Math"
            icon={<MathIcon />}
            subtitle="Perform arithmetic transforms"
            className="cat-math"
            handles={[
                {
                    id: `${id}-input`,
                    type: 'target',
                    position: 'left',
                    label: 'Input',
                },
                {
                    id: `${id}-output`,
                    type: 'source',
                    position: 'right',
                    label: 'Result',
                },
            ]}
        >
            <NodeField label="Operation">
                <select>
                    <option value="+">+</option>
                    <option value="-">-</option>
                    <option value="*">*</option>
                    <option value="/">/</option>
                </select>
            </NodeField>
        </BaseNode>
    );
};
