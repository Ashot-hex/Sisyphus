import { Class } from '../../../../project/members/class';
import * as utils from '../../../test_utils';
import assert from "assert";

suite('Class factory Test Suite', () => {
    test('Creation test', () => {
        const _class: Class = getClass();
        assert.strictEqual(
            _class.Content,
            CONTENT.split('\n').splice(4).join('\n')
        );
    });
    test('Fields creation test', () => {
        const _class: Class = getClass();
        assert.strictEqual(1, _class.Fields.length);

        assert.strictEqual(
            `    private bool field1;`,
            _class.Fields[0].Content
        );
    });
    
    test('Methods creation test', () => {
        const _class: Class = getClass();
        assert.strictEqual(2, _class.Methods.length);
    });
});
function getClass() { return utils.classFactory.create(CONTENT)[0]; }

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