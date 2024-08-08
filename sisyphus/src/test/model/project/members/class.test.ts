import * as utils from '../../../test_utils';
import assert from "assert";
import { Class } from "../../../../project/members/class";

suite('Class model class Test Suite', () => {

    // No tests needed on constructor yet
    // test('constructor test', () => { });

    //#region getter tests
    test('getVisibility test', () => {
        for (const content of CLASS_CONTENTS) {
            const c = new Class(content[1]);
            assert.strictEqual(content[0].visibility, c.getVisibility());
        }
    });
    test('getName test', () => {
        for (const content of CLASS_CONTENTS) {
            const c = new Class(content[1]);
            assert.strictEqual(content[0].name, c.getName());
        }
    });
    test('getType test', () => {
        for (const content of CLASS_CONTENTS) {
            const c = new Class(content[1]);
            assert.strictEqual(content[0].type, c.getType());
        }
    });
    test('get Content test', () => {
        for (const content of CLASS_CONTENTS) {
            const c = new Class(content[1]);
            assert.strictEqual(content[1], c.Content);
        }
    });
    //#endregion getter tests


    //#region setter tests
    test('set Content test', () => {
        for (const content of CLASS_CONTENTS) {
            const c = new Class(content[1]);
            assert.strictEqual(content[1], c.Content);
            const newContent = utils.randomString();
            c.Content = newContent;
            assert.strictEqual(newContent, c.Content);
        }
    });
    test('setVisibility test', () => {
        for (const content of CLASS_CONTENTS) {
            const c = new Class(content[1]);
            assert.strictEqual(content[0].visibility, c.getVisibility());
            const newVis = utils.randomVisibility();
            c.setVisibility(newVis);
            assert.strictEqual(newVis, c.getVisibility());
        }
    });
    test('setName test', () => {
        for (const content of CLASS_CONTENTS) {
            const c = new Class(content[1]);
            assert.strictEqual(content[0].name, c.getName());
            const newName = utils.randomString();
            c.setName(newName);
            assert.strictEqual(newName, c.getName());
        }
    });
    test('setType test', () => {
        for (const content of CLASS_CONTENTS) {
            const c = new Class(content[1]);
            assert.strictEqual(content[0].type, c.getType());
            const newType = utils.randomString();
            c.setType(newType);
            assert.strictEqual(newType, c.getType());
        }
    });
    //#region setter tests

    //TODO
    // test('Documentation test', () => { });
});

//#region utils
const CLASS_CONTENTS: [utils.MemberAttributes, string][] = [
    
    [
        {
            visibility: 'public',
            name: 'Class1',
            type: 'Class1',
        },
        `public class Class1
        {
        }`
    ],
    [
        {
            visibility: 'private',
            name: 'Class2',
            type: 'Class2',
        },
        `private abstract class Class2
        {
        }`
    ],
    [
        {
            visibility: 'protected',
            name: 'Class3',
            type: 'Class3',
        },
        `protected static class Class3
        {
        }`
    ],
    [
        {
            visibility: 'internal',
            name: 'Class4',
            type: 'Class4',
        },
        `internal interface Class4
        {
        }`
    ],
    [
        {
            visibility: 'public',
            name: 'Class5',
            type: 'Class5',
        },
        `public enum Class5
        {
        }`
    ],
    [
        {
            visibility: 'private',
            name: 'Class6',
            type: 'Class6',
        },
        `private struct Class6
        {
        }`
    ],
    [
        {
            visibility: 'public',
            name: 'ClassX',
            type: 'ClassX',
        },
        `public class ClassX
        {
            private bool estValide;
            private string code = "1234";
            private bool estDansMachine;
            public bool EstDansMachine
            {
                get => estDansMachine;
                set
                {
                    estDansMachine = value;
                    this.OnPropertyChanged();
                }
            }

            public bool EstValide { get => estValide;set => estValide = value; }

            public CarteBancaire() 
            {
                this.estValide = true;
                this.estDansMachine = false;
            }
        }`
    ],
];

//#endregion utils