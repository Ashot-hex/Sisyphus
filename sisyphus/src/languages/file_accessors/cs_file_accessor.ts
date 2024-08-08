import * as vscode from "vscode";
import { FileAccessor } from "./file_accessor";

/**
 * File accessor for C# projects
 */
export class CSharpFileAccessor extends FileAccessor {
    private static readonly MEMBER_DECLARATION_REGEX = /(?<=(class|enum|interface|struct) )\w+/;

    /**
     * Default constructor
     */
    public constructor() {
        super();
    }

    protected override async collectMembers(): Promise<{ [id: string]: string; }> {
        const filePaths = await this.getAllFilePaths();
        const memberDeclarations: { [id: string]: string; } = {};
        const declarationRegex = CSharpFileAccessor.MEMBER_DECLARATION_REGEX;

        for (const path of filePaths) {
            const doc = await vscode.workspace.openTextDocument(path);
            const declaration = doc.getText()
                .match(declarationRegex)?.[0];

            if (!declaration) { console.error("could not find declaration in file", path); }
            else { memberDeclarations[declaration] = path; }
        }

        return memberDeclarations;
    }

    public override async getAllFilePaths(): Promise<string[]> {
        return (await super.getAllFilePaths())
            .filter(x => {
                return x.endsWith('.cs')
                    // Ignores files that end in .cs but are not actual C# code
                    && !x.endsWith('App.xaml.cs')
                    && !x.endsWith('.Designer.cs')
                    && !x.endsWith('GlobalUsings.cs')
                    && !x.endsWith('AssemblyInfo.cs');
            });
    }
}