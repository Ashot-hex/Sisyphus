import { CSharpFileAccessor } from "./file_accessors/cs_file_accessor";
import { Language } from "./language";

/**
 * Project language manager for C# projects
 */
export class CSharpLanguage extends Language {
    /** Default constructor */
    public constructor() {
        super(
            new CSharpFileAccessor(),
        );
    }

    public get MemberFlagRegex(): RegExp {
        return /^\s*\[.+\]/gm;
    }
    public get DocumentationRegex(): RegExp {
        return /^.*\/{3}.+$/gm;
    }
    public get ClassDeclarationRegex(): RegExp {
        return /^.*(class|interface|record|struct|enum) .+$/gm;
    }
    public get MethodDeclarationRegex(): RegExp {
        return /^.*\w+\(.*\)[^;\n\/]*$/gm;
    }
    public get FieldDeclarationRegex(): RegExp {
        return /^.*(\w+ ){2,}[^\>\n]*;$/gm;
    }
    public get PropertyDeclarationRegex(): RegExp {
        return /^.*( \w+){2,}.*(.*\n)*?(\n|get|set|=>)[^]*?(}|;(\n.*})*)$/gm;
    }
}