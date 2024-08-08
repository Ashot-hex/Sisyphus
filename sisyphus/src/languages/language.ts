import { FileAccessor } from "./file_accessors/file_accessor";

/**
 * Base class for project language managers
 */
export abstract class Language {
    //#region fields
    private fileAccessor: FileAccessor;
    //#endregion fields

    //#region properties
    /** Corresponding FileAccessor */
    public get FileAccessor(): FileAccessor { return this.fileAccessor; }
    /** Regex matching Member flags */
    public abstract get MemberFlagRegex(): RegExp;
    /** Regex matching documentation */
    public abstract get DocumentationRegex(): RegExp;
    /** Regex matching class declaractiions */
    public abstract get ClassDeclarationRegex(): RegExp;
    /** Regex matching method declaractiions */
    public abstract get MethodDeclarationRegex(): RegExp;
    /** Regex matching field declaractiions */
    public abstract get FieldDeclarationRegex(): RegExp;
    /** Regex matching property declaractiions */
    public abstract get PropertyDeclarationRegex(): RegExp;
    //#endregion properties

    /**
     * Default constructor
     * @param fileAccessor Corresponding FileAccessor
     */
    protected constructor(
        fileAccessor: FileAccessor
    ) {
        this.fileAccessor = fileAccessor;
    }
}