import { Member } from "../member";

export class Documentation {
    content: string;

    public constructor(content: string) {
        this.content = content;
    }

    public get Content(): string {
        return this.content;
    }
}