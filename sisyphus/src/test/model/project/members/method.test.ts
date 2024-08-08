import * as utils from '../../../test_utils';
import assert from 'assert';

import { Method } from '../../../../project/members/method';

suite('Method model class Test Suite', () => {

    // No tests needed on constructor yet
    // test('constructor test', () => { });

    //#region getter tests
    test('getVisibility test', () => {
        for (const content of METHOD_CONTENTS) {
            const method = new Method(content[1]);
            assert.strictEqual(content[0].visibility, method.getVisibility());
        }
    });
    test('getName test', () => {
        for (const content of METHOD_CONTENTS) {
            const method = new Method(content[1]);
            assert.strictEqual(content[0].name, method.getName());
        }
    });
    test('getType test', () => {
        for (const content of METHOD_CONTENTS) {
            const method = new Method(content[1]);
            assert.strictEqual(content[0].type, method.getType());
        }
    });
    test('get Content test', () => {
        for (const content of METHOD_CONTENTS) {
            const method = new Method(content[1]);
            assert.strictEqual(content[1], method.Content);
        }
    });
    //#endregion getter tests


    //#region setter tests
    test('set Content test', () => {
        for (const content of METHOD_CONTENTS) {
            const method = new Method(content[1]);
            assert.strictEqual(content[1], method.Content);
            const newContent = utils.randomString();
            method.Content = newContent;
            assert.strictEqual(newContent, method.Content);
        }
    });
    test('setVisibility test', () => {
        for (const content of METHOD_CONTENTS) {
            const method = new Method(content[1]);
            assert.strictEqual(content[0].visibility, method.getVisibility());
            const newVis = utils.randomVisibility();
            method.setVisibility(newVis);
            assert.strictEqual(newVis, method.getVisibility());
        }
    });
    test('setName test', () => {
        for (const content of METHOD_CONTENTS) {
            const method = new Method(content[1]);
            assert.strictEqual(content[0].name, method.getName());
            const newName = utils.randomString();
            method.setName(newName);
            assert.strictEqual(newName, method.getName());
        }
    });
    test('setType test', () => {
        for (const content of METHOD_CONTENTS) {
            const method = new Method(content[1]);
            assert.strictEqual(content[0].type, method.getType());
            const newType = utils.randomString();
            method.setType(newType);
            assert.strictEqual(newType, method.getType());
        }
    });
    //#region setter tests

    //TODO
    // test('Documentation test', () => { });
});

type MethodAttributes = {
    visibility: string,
    name: string,
    type: string
};

//#region utils
const METHOD_CONTENTS: [MethodAttributes, string][] = [
    [
        {
            visibility: 'public',
            name: 'Method1',
            type: 'void',
        },
        `public void Method1()
        {
        }
        `
    ],
    [
        {
            visibility: 'protected',
            name: 'Method2',
            type: 'object'
        },
        `protected object Method2(object param)
        {
        }`
    ],
    [
        {
            visibility: 'internal',
            name: 'Method3',
            type: 'int'
        },
        `internal int Method3(object param, object param, object param, object param)
        {
        }`
    ],
    [
        {
            visibility: 'private',
            name: 'Method4',
            type: 'ComplexObject'
        },
        `private ComplexObject Method4(
            object param,
            object param,
            object param,
            object param
        ) {
        }
    `
    ],
    [
        {
            visibility: '',
            name: 'Method5',
            type: 'ComplexObject2'
        },
        `ComplexObject2 Method5(
            object param,
        ) {
        }
    `]
];
//#endregion utils