import { BaseNode, NodeField } from '../components/BaseNode';
import { FilterIcon } from './icons';

export const FilterNode = ({ id }) => {
    return (
        <BaseNode
            title="Filter"
            icon={<FilterIcon />}
            subtitle="Branch records by a condition"
            className="cat-filter"
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
                    label: 'Match',
                },
            ]}
        >
            <NodeField label="Condition">
                <input
                    type="text"
                    placeholder="value > 10"
                />
            </NodeField>
        </BaseNode>
    );
};
