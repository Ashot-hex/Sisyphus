import { Field } from "./field";
import { Member } from "../member";
import { Method } from "./method";
import { Documentation } from "./documentation";

/**
 * Model of a Class (OOP)
 */
export class Class extends Member {
    private methods: Method[];
    private fields: Field[];

    public constructor(
        content: string,
        documentation: Documentation | undefined = undefined
    ) {
        super(content, documentation);

        this.methods = [];
        this.fields = [];
    }

    public addField(field: Field): void {
        this.fields.push(field);
    }
    public addMethod(method: Method): void {
        this.methods.push(method);
    }

    public get Methods(): Method[] {
        return this.methods;
    }
    public get Fields(): Field[] {
        return this.fields;
    }
    public get Members(): Member[]{
        return [
            ...this.Fields,
            ...this.Methods
        ]
    }

    //#region Member implementations
    public override getVisibility(): string {
        return this.Content.split('\n')[0].match(/^(\s*?)(public|private|protected|internal)/g)?.[0].trim() ?? 'public';
    }
    public override getName(): string {
        return this.Content.split('\n')[0].match(/\w+(?=\s*($|:.+$))/g)![0].trim();
    }
    public override getType(): string {
        return this.getName();
    }
    //#endregion Member implementations
}