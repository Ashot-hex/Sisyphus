import { Documentation } from "./members/documentation";

export abstract class Member {
    private content: string;
    private documentation: Documentation | undefined;

    protected constructor(
        content: string,
        documentation: Documentation | undefined = undefined
    ) {
        this.content = content;
        this.documentation = documentation;
    }

    public get Content(): string {
        return this.content;
    }
    public set Content(value: string) {
        this.content = value;
    }

    public get Documentation(): Documentation | undefined {
        return this.documentation;
    }

    public setVisibility(value: string): void {
        const vis = this.getVisibility();
        if (vis === '') { value += " "; }

        let regex = new RegExp('(?<=^\s*)' + this.getVisibility());

        this.replaceInContent(regex, value);
    }
    public setName(value: string): void {
        const regex = new RegExp('(?<=\\s*)' + this.getName() + "(?=\\s*\())");
        this.replaceInContent(regex, value);
    }
    public setType(value: string): void {
        const type = this.getType().replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');;
        const regex = new RegExp('(?<=\\s*)' + type + "(?=\\s+)", );
        this.replaceInContent(regex, value);
    }

    private replaceInContent(regex: RegExp, value: string): void {
        if (!regex.test(this.Content)) { throw new Error("No matches found in content for" + regex.source); }

        const content = this.Content.replace(regex, value);
        this.Content = content;
    }
    protected findInContent(regex: RegExp, defaultValue: string | undefined = undefined) {
        const result = this.Content.match(regex)?.[0].trim() ?? defaultValue;
        if (result === undefined) {
            console.table({
                regex: regex.source,
                content: this.Content
            });
            throw new Error("Not found in content"); }

        return result;

    }

    public abstract getVisibility(): string;
    public abstract getName(): string;
    public abstract getType(): string;


    public toString(): string {
        return this.Content;
    }
}