import { Class } from "./members/class";

export class Project {
    private classes: { [key: string]: Class[] };

    public constructor(classes: Class[]) {
        this.classes = {};
        for (const c of classes) {
            this.addClass(c);
        }
    }

    public get Classes(): { [key: string]: Class[] } {
        return this.classes;
    }

    public addClass(c: Class) {
        const key = c.getName();

        if (key in this.classes) {
            this.classes[key]?.push(c);
        } else {
            this.classes[key] = [c];
        }
    }
}