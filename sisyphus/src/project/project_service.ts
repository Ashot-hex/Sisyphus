import { Member } from "./member";
import { Class } from "./members/class";
import { Project } from "./project";

export class ProjectService {
    private project: Project;

    public constructor(project: Project) {
        this.project = project;
    }

    private get Classes(): Class[] {
        return Object.values(this.project.Classes).flat();
    }

    public getNotDocumentedMembers(c: Class): Member[] {
        const members = [c, ...c.Members];
        return members.filter(x => x.Documentation === undefined);
    }

    public getClassesWithNotDocumentedMembers() {
        return this.Classes.filter((x => (
            x.Documentation === undefined
            || x.Members.some(x => x.Documentation === undefined)
        )));
    }
}