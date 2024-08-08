import { CSharpLanguage } from "../languages/csharp_language";
import { ClassFactory } from "../project/factories/class.factory";
import { DocumentationFactory } from "../project/factories/documentation.factory";
import { FieldFactory } from "../project/factories/field.factory";
import { MethodFactory } from "../project/factories/method.factory";

export type MemberAttributes = {
    visibility: string;
    name: string;
    type: string;
};

export function randomString(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const randIx = () => Math.floor(Math.random() * characters.length);

    return Array(10)
        .fill(1)
        .map(_ => characters[randIx()])
        .join('');
}

export function randomVisibility(): string {
    const visibilities = ['public', 'private', 'protected', 'internal'];
    const randIx = () => Math.floor(Math.random() * visibilities.length);

    return visibilities[randIx()];
}

export const language = new CSharpLanguage();
export const documentationFactory = new DocumentationFactory(language);
export const fieldFactory = new FieldFactory(language, documentationFactory);
export const methodFactory = new MethodFactory(language, documentationFactory);
export const classFactory = new ClassFactory(language, documentationFactory, fieldFactory, methodFactory);