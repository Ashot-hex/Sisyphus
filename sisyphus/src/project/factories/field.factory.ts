import { Language } from "../../languages/language";
import { Field } from "../members/field";
import { DocumentationFactory } from "./documentation.factory";

export class FieldFactory {
    private language: Language;
    private documentationFactory: DocumentationFactory;

    public constructor(language: Language, documentationFactory: DocumentationFactory) {
        this.language = language;
        this.documentationFactory = documentationFactory;
    }

    public create(content: string): Field[] {
        const fields: Field[] = [];

        // Returns a slice of the given content, from start to end included
        const getContent = (start: number, end: number) => content.split('\n').slice(start, end + 1).join('\n');

        const regex = this.language.FieldDeclarationRegex;

        // Defaulting to an empty array will just skip the rest of the code until the return instead of having to do null checks
        const fieldDeclarations = content.match(regex) ?? [];
        const contentLineByLine = content.split('\n');
        const indexes = fieldDeclarations.map(x => contentLineByLine.indexOf(x));

        for (const start of indexes) {
            const fieldContent = getContent(start, start);
            const documentation = this.documentationFactory.create(contentLineByLine, start);
            fields.push(new Field(fieldContent, documentation));
        }

        return fields;
    }
}