import { Options, Node } from 'acorn';
export interface SvalOptions {
    ecmaVer?: Options['ecmaVersion'];
    sourceType?: Options['sourceType'];
    sandBox?: true | false | "full" | "empty";
    timeout?: number;
}
declare class Sval {
    static version: string;
    private options;
    private scope;
    exports: Record<string, any>;
    constructor(options?: SvalOptions);
    import(nameOrModules: string | Record<string, any>, mod?: any): void;
    parse(code: string, parser?: (code: string, options: SvalOptions) => Node): Node;
    run(code: string | Node): void;
}
export default Sval;
