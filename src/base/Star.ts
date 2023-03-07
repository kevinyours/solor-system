/**
 * 별, 항성/행성/위성의 Origin
 */

export interface StarProps {
    name: string;
    x?: number;
    y?: number;
    z?: number;
    rotationX?: number;
    rotationY?: number;
    rotationZ?: number;
}

export class Star {
    public name: string;
    private _x: number;
    private _y: number;
    private _z: number;
    private _rotationX: number;
    private _rotationY: number;
    private _rotationZ: number;

    constructor(props: StarProps) {
        this.name = props.name;
        this._x = props.x ?? 0;
        this._y = props.y ?? 0;
        this._z = props.z ?? 0;
        this._rotationX = props.rotationX ?? 0;
        this._rotationY = props.rotationY ?? 0;
        this._rotationZ = props.rotationZ ?? 0;
    }

    get x(): number {
        return this._x;
    }

    get y(): number {
        return this._y;
    }

    get z(): number {
        return this._z;
    }

    get rotationX(): number {
        return this._rotationX;
    }

    get rotationY(): number {
        return this._rotationY;
    }

    get rotationZ(): number {
        return this._rotationZ;
    }

    public updateRotation({ x, y, z }: { x?: number; y?: number; z?: number }) {
        if (x) this._rotationX = x;
        if (y) this._rotationY = y;
        if (z) this._rotationZ = z;
    }
}
