import { Group, Object3D } from 'three';

export const makeGroup = (props: Object3D | Object3D[]) => {
    const group = new Group();
    return Array.isArray(props) ? group.add(...props) : group.add(props);
};
