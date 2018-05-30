/// <reference types="node" />
export interface RSData {
    shebangStr: string;
    bytesRead: number;
    buffer: Buffer;
    executable: string;
    hasShebang: boolean;
    firstLine: string;
}
export declare type RSCallback = (err: Error | null, d?: RSData) => void;
export declare const readShebang: (filename: string, encoding: string, bytes: number, cb: RSCallback) => void;
