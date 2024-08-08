import * as utils from '../../../test_utils';
import assert from "assert";
import { Method } from '../../../../project/members/method';

suite('Method factory Test Suite', () => {
    test('Creation test', () => {
        const methods: Method[] = utils.methodFactory.create(CONTENT);
        assert.strictEqual(
            methods.length,
            EXPECTED_CONTENTS.length
        );

        for (let i = 0; i < methods.length; i++) {
            const expected = EXPECTED_CONTENTS[i];
            const actuel = methods[i].Content;
            assert.strictEqual(actuel, expected);
        }

        const a = methods[0].getType();
    });
});

const EXPECTED_CONTENTS = [
    `        public ClassX() 
        {
            this.field1 = true;
            this.field3 = false;
        }`,
    `        public ClassX Method1() 
        {
            this.estValide = true;
            this.estDansMachine = false;
        }`
];

const CONTENT =
    `public class ClassX
    {
        private bool field1;
        private string field2 = "1234";
        private bool field3;
        public bool Prop1
        {
            get => field3;
            set
            {
                field3 = value;
            }
        }

        public bool Prop2 { get => field1; set => field1 = value; }

        public ClassX() 
        {
            this.field1 = true;
            this.field3 = false;
        }
            
        public ClassX Method1() 
        {
            this.estValide = true;
            this.estDansMachine = false;
        }
    }`;