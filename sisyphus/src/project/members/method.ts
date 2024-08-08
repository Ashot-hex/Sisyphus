import { Member } from "../member";
import { Documentation } from "./documentation";

/**
 * Model of a Method
 */
export class Method extends Member {

    public constructor(
        content: string,
        documentation: Documentation | undefined = undefined
    ) {
        super(content, documentation);
    }

    //#region Member implementations
    public override getVisibility(): string {
        return this.findInContent(/^(\s*?)(public|private|protected|internal)/g, '');
    }

    public override getName(): string {
        return this.findInContent(/\w+(?=\([^\)]*\))/g);
    }

    public override getType(): string {
        return this.findInContent(/\w+(?= \w+\([^\)]*\))/g);
    }
    //#endregion Member implementations
}