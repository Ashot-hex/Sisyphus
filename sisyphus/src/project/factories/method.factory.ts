import { Language } from "../../languages/language";
import { Documentation } from "../members/documentation";
import { Method } from "../members/method";
import { DocumentationFactory } from "./documentation.factory";

export class MethodFactory {
    private language: Language;
    private documentationFactory: DocumentationFactory;

    public constructor(language: Language, documentationFactory: DocumentationFactory) {
        this.language = language;
        this.documentationFactory = documentationFactory;
    }

    /**
     * Instanciates the found Methods in the content given
     * @param content text content, also corresponds to the scope we're in (e.g. region, class, file)
     * @returns The methods instanciated
     */
    public create(content: string): Method[] {
        const methods: Method[] = [];

        // Returns a slice of the given content, from start to end included
        const getContent = (start: number, end: number) => content.split('\n').slice(start, end + 1).join('\n');

        const regex = this.language.MethodDeclarationRegex;

        // Defaulting to an empty array will just skip the rest of the code until the return instead of having to do null checks
        const methodDeclarations = content.match(regex) ?? [];
        const contentLineByLine = content.split('\n');
        const declarationLines = methodDeclarations.map(x => contentLineByLine.indexOf(x.split('\n')[0])); // Searches the line where we find the method declaration in the content
        const indexes = declarationLines.map(x => {
            return {
                start: x,
                end: this.findEndOfBody(contentLineByLine, x)
            }
        });

        for (const ix of indexes) {
            const methodContent = getContent(ix.start, ix.end);
            const documentation = this.documentationFactory.create(contentLineByLine, ix.start);
            methods.push(new Method(methodContent, documentation));
        }

        return methods;
    }

    /**
     * Finds the end index of a method's body
     * @param content file's content containing the method's body, signature included. Should be split by \n to actually count the lines
     * @param declarationLineIndex index of the method's signature
     * @returns the index at with the method's body closes
     */
    private findEndOfBody(content: string[], declarationLineIndex: number): number {
        let bracketCount = (content[declarationLineIndex].match(/{/g) || []).length; // Not initializing directly to 0 in case the first bracket is on the same line as the declaration

        let end = declarationLineIndex;
        do {
            end++;

            const line = content[end];
            // We add the amount of opening brackets found, then subtracting the amount of closing brackets
            bracketCount += (line.match(/{/g) || []).length; // Just in case, the difference is the bracket, either opening or closing
            bracketCount -= (line.match(/}/g) || []).length; // I am writing this comment because it took me some time to figure it out back

            // when `bracketCount === 0` we've found the line with a closing bracket of the body
        } while (end < content.length && bracketCount !== 0);

        // We got out of the `do while` without balancing the count, it means that the body doesn't close in the given content
        if (end >= content.length) {
            throw new Error("The method's body doesn't seem to ever end");
        }

        return end;
    }
}