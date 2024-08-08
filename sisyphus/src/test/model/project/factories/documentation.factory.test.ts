import * as utils from '../../../test_utils';
import assert from "assert";
import { Documentation } from '../../../../project/members/documentation';

suite('Documentation factory Test Suite', () => {
    test('Creation test', () => {

        const documentations: [(Documentation | undefined), [number, number] | undefined][] =
            EXPECTED_INDEXES
                .map(x => [
                    utils.documentationFactory.create(CONTENT.split('\n'), x[0]),
                    x[1]
                ]);

        for (const doc of documentations) {
            if (doc[0] === undefined) {
                assert.strictEqual(doc[0], doc[1]); // Both undefined
                continue;
            }

            const expected = CONTENT.split('\n').slice(doc[1]![0], doc[1]![1] + 1).join('\n');
            assert.strictEqual(doc[0]!.Content, expected);
        }
    });
});

const EXPECTED_INDEXES: [number, [number, number] | undefined][] = [
    [4, undefined],
    [10, [9, 9]],
    [19, [16, 18]],
    [38, [31, 37]],
    [51, [47, 50]],
];

const CONTENT =
    `using SomeNamespace;

namespace MainNamespace.SubNamespace;

public class ClassX : BaseClass
{

    #region Fields

    /// <summary> Lorem ipsum dolor sit amet consectetur adipisicing elit </summary>
    private bool field1;

    #endregion

    #region Properties

    /// <summary>
    /// Lorem ipsum dolor sit amet consectetur adipisicing elit
    /// </summary>
    public override string Prop1
    {
        get
        {
            return "Prop1Value";
        } 
    }

    #endregion Fields

    #region Constructor

    /// <summary>
    /// Lorem ipsum dolor sit amet consectetur adipisicing elit
    /// </summary>
    /// <param name="x"> Lorem ipsum </param>
    /// <param name="y"> Lorem ipsum </param>
    /// <param name="field1"> Lorem ipsum dolor sit amet </param>
    /// <param name="g"> Lorem ipsum dolor sit amet </param>
    public ClassX(double x, double y, bool field1, Game g) : base(x, y, g, "asset.png")
    {
        this.field1 = field1;
    }

    #endregion Constructor

    #region Methods

    /// <summary>
    /// Lorem ipsum dolor sit amet consectetur adipisicing elit
    /// </summary>
    /// <param name="other"> Lorem ipsum dolor sit amet </param>
    [Attribute]
    public override void Method1(BaseClass other)
    {
    }

    #endregion Methods

}`;