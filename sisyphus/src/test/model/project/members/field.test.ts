import * as utils from '../../../test_utils';
import assert from "assert";
import { Field } from "../../../../project/members/field";

suite('Field model class Test Suite', () => {

    // No tests needed on constructor yet
    // test('constructor test', () => { });

    //#region getter tests
    test('getVisibility test', () => {
        for (const content of FIELD_CONTENTS) {
            const field = new Field(content[1]);
            assert.strictEqual(content[0].visibility, field.getVisibility());
        }
    });
    test('getName test', () => {
        for (const content of FIELD_CONTENTS) {
            const field = new Field(content[1]);
            assert.strictEqual(content[0].name, field.getName());
        }
    });
    test('getType test', () => {
        for (const content of FIELD_CONTENTS) {
            const field = new Field(content[1]);
            assert.strictEqual(content[0].type, field.getType());
        }
    });
    test('get Content test', () => {
        for (const content of FIELD_CONTENTS) {
            const field = new Field(content[1]);
            assert.strictEqual(content[1], field.Content);
        }
    });
    //#endregion getter tests


    //#region setter tests
    test('set Content test', () => {
        for (const content of FIELD_CONTENTS) {
            const field = new Field(content[1]);
            assert.strictEqual(content[1], field.Content);
            const newContent = utils.randomString();
            field.Content = newContent;
            assert.strictEqual(newContent, field.Content);
        }
    });
    test('setVisibility test', () => {
        for (const content of FIELD_CONTENTS) {
            const field = new Field(content[1]);
            assert.strictEqual(content[0].visibility, field.getVisibility());
            const newVis = utils.randomVisibility();
            field.setVisibility(newVis);
            assert.strictEqual(newVis, field.getVisibility());
        }
    });
    test('setName test', () => {
        for (const content of FIELD_CONTENTS) {
            const field = new Field(content[1]);
            assert.strictEqual(content[0].name, field.getName());
            const newName = utils.randomString();
            field.setName(newName);
            assert.strictEqual(newName, field.getName());
        }
    });
    test('setType test', () => {
        for (const content of FIELD_CONTENTS) {
            const field = new Field(content[1]);
            assert.strictEqual(content[0].type, field.getType());
            const newType = utils.randomString();
            field.setType(newType);
            assert.strictEqual(newType, field.getType());
        }
    });
    //#region setter tests

    //TODO
    // test('Documentation test', () => { });
});

//#region utils
const FIELD_CONTENTS: [utils.MemberAttributes, string][] = [
    [
        {
            visibility: 'public',
            name: 'field1',
            type: 'string',
        },
        `public string field1;`
    ],
    [
        {
            visibility: 'internal',
            name: 'field2',
            type: 'int',
        },
        `internal int field2;`
    ],
    [
        {
            visibility: 'private',
            name: 'field3',
            type: 'ComplexObject',
        },
        `private ComplexObject field3;`
    ],
    [
        {
            visibility: 'protected',
            name: 'field4',
            type: 'object',
        },
        `protected object field4 = new Object();`
    ],
    [
        {
            visibility: '',
            name: 'field5',
            type: 'List<int>',
        },
        `List<int> field5;`
    ],
    [
        {
            visibility: 'public',
            name: 'field6',
            type: 'Dictionnary<int, string>',
        },
        `public readonly Dictionnary<int, string> field6 = new();`
    ],
    [
        {
            visibility: 'private',
            name: 'field7',
            type: 'string[]',
        },
        `private override readonly string[] field7;`
    ],
];
//#endregion utils