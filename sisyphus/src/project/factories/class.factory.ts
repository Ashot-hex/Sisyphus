import { Language } from "../../languages/language";
import { Class } from "../members/class";
import { FieldFactory } from "./field.factory";
import { MethodFactory } from "./method.factory";
import { DocumentationFactory } from "./documentation.factory";

export class ClassFactory {
    private language: Language;
    private fieldFactory: FieldFactory;
    private methodFactory: MethodFactory;
    private documentationFactory: DocumentationFactory;

    public constructor(
        language: Language,
        documentationFactory: DocumentationFactory,
        fieldFactory: FieldFactory,
        methodFactory: MethodFactory,
    ) {
        this.language = language;

        this.documentationFactory = documentationFactory;
        this.fieldFactory = fieldFactory;
        this.methodFactory = methodFactory;
    }

    public create(fileContent: string): Class[] {
        const getContent = (s: number, e: number) => fileContent.split('\n').slice(s, e + 1).join('\n');

        const classes: Class[] = [];
        const regex = this.language.ClassDeclarationRegex;

        const classDeclarations = fileContent.match(regex) ?? [];
        const contentLineByLine = fileContent.split('\n');
        const declarationLines = classDeclarations.map(x => contentLineByLine.indexOf(x.split('\n')[0]));
        const indexes = declarationLines.map(x => {
            return {
                start: x,
                end: this.findEndOfBody(contentLineByLine, x)
            };
        });

        for (const ix of indexes) {
            const classContent = getContent(ix.start, ix.end);
            const documentation = this.documentationFactory.create(contentLineByLine, ix.start);
            const createdClass = new Class(classContent, documentation);

            const fields = this.fieldFactory.create(classContent);
            for (const field of fields) { createdClass.addField(field); }

            const methods = this.methodFactory.create(classContent);
            for (const method of methods) { createdClass.addMethod(method); }

            classes.push(createdClass);
        }

        return classes;
    }

    private findEndOfBody(content: string[], declarationLineIndex: number): number {
        let end = declarationLineIndex;
        let bracketCount = (content[end].match(/{/g) || []).length;
        do {
            end++;

            const line = content[end];
            bracketCount += (line.match(/{/g) || []).length;
            bracketCount -= (line.match(/}/g) || []).length;
        } while (end < content.length && bracketCount !== 0);

        if (end >= content.length) { throw new Error("The class's body doesn't seem to be closed"); }

        return end;
    }
}