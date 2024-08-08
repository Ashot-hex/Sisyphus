import * as utils from '../../../test_utils';
import assert from "assert";
import { Field } from '../../../../project/members/field';

suite('Field factory Test Suite', () => {
    test('Creation test', () => {
        const fields: Field[] = utils.fieldFactory.create(CONTENT);
        assert.strictEqual(
            fields.length,
            EXPECTED_FIELD_CONTENTS.length
        );

        for (let i = 0; i < fields.length; i++) {
            const expected = EXPECTED_FIELD_CONTENTS[i];
            const actuel = fields[i].Content;
            assert.strictEqual(actuel, expected);
        }
    });
});

const EXPECTED_FIELD_CONTENTS = [
    "        private bool field1;",
    "        private string field2 = \"1234\";",
    "        private bool field3;",
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
    }`;