import * as vscode from 'vscode';
import { Uri } from 'vscode';

/**
 * Base class of all file accessor, accorded to the programming language used
 */
export abstract class FileAccessor {
    private static readonly MAX_RESULTS: number = Number.MAX_SAFE_INTEGER;
    private memberToFileMap: { [id: string]: string; }; //TODO: Shouldn't really be there
    private isDone: boolean; //TODO: Maybe replace by an awaitable static `create` method ?
    
    /** True if the initialisation is done, false otherwise */
    public get IsReady(): boolean { return this.isDone; };

    /**
     * Default constructor
     * will start initialisation
     */
    protected constructor() {
        this.isDone = false;
        this.memberToFileMap = {};
        this.initMembers();
    }

    /**
     * Map of Members to their file path
     */
    public get Members(): { [id: string]: string; } {
        return this.memberToFileMap;
    }

    private async initMembers() {
        this.memberToFileMap = await this.collectMembers();
        this.isDone = true;
    }

    /**
     * Gathers and returns the paths of all files
     * @returns a list of the files, limited to code files in the currently used language
     */
    public async getAllFilePaths(): Promise<string[]> {
        const files = await vscode.workspace.findFiles('**/*', null, FileAccessor.MAX_RESULTS);
        const filePaths = files.map(x => x.fsPath);
        return filePaths;
    }

    /**
     * Given its file path, will return the text content of the document
     * @param path the path you've ideally gotten from FileAccessor.getAllFiles()
     * @returns raw string of the file's content
     */
    public async getFileContent(path: string): Promise<string> {
        const file = await vscode.workspace.openTextDocument(path);
        if (!file) {throw new Error("File doesn't exist " + path);}

        const content = file?.getText() ?? '';

        const formattedContent =
            content.replace(/\r\n/g, '\n')
                .replace(/\n\r/g, '\n')
                .replace(/\n/g, '\n')
                .replace(/\t/g, '\t');
        return formattedContent;
    }

    /**
     * Collects the members in the memberToFileMap map
     */
    protected abstract collectMembers(): Promise<{ [id: string]: string; }>;
}