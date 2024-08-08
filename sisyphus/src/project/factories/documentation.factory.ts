import { Language } from "../../languages/language";
import { Documentation } from "../members/documentation";

export class DocumentationFactory {
    private language: Language;
    private get StoppingRegexes(): RegExp[] {
        return [
            this.language.ClassDeclarationRegex,
            this.language.MethodDeclarationRegex,
            this.language.FieldDeclarationRegex,
            this.language.PropertyDeclarationRegex,
            this.language.PropertyDeclarationRegex,
        ];
    }
    private get IgnoredRegexes(): RegExp[] {
        return [
            this.language.MemberFlagRegex,
        ];
    }

    public constructor(language: Language) {
        this.language = language;
    }
    public create(content: string[], declarationIndex: number): Documentation | undefined {
        let documentation: Documentation | undefined = undefined;

        let start = declarationIndex;
        while (
            start > 0
            && (
                this.isIgnored(content, start - 1)
                || this.isDocumentation(content, start - 1)
            )
        ) {
            start--;
        }

        let end = start;
        while (
            end + 1 < content.length
            && this.isDocumentation(content, end + 1)
        ) {
            end++;
        }


        if (start >= 0 && end >= 0
            && start < content.length && end < content.length
            && start <= end
            && start !== declarationIndex
            && end !== declarationIndex
        ) {
            documentation = new Documentation(content.slice(start, end + 1).join('\n'));
        }

        return documentation;
    }

    private isIgnored(content: string[], indexToCheck: number): boolean {
        return this.IgnoredRegexes.some(x => x.test(content[indexToCheck]));
    }
    private isDocumentation(content: string[], indexToCheck: number): boolean {
        return this.language.DocumentationRegex.test(content[indexToCheck]);
    }
}