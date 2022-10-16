import { create } from 'react-test-renderer';
import  HelloWorldText from '../../src/components/hello-world-text'
import { HELLO_WORLD_TEXT } from '../utils/test-constants';

describe('Hello World component', () => {
    let baseRender, testInstance;

    // arrange
    beforeEach(async () => {
        baseRender = create(<HelloWorldText/>);
        testInstance = baseRender.root;
    });

    it('should not be null or undefined', async () => {
        // arrange
        const textField = testInstance.findByType("Text");

        // assert
        expect(textField).not.toBeNull();
        expect(textField).not.toBeUndefined();
    });

    // this example shows using the "type" to find the compoennt.
    // you can also use testInstance.findAllByType() to return an 
    // array of all matching types
    it('should have "hello world" text', async () => {
        // arrange
        const textField = testInstance.findByType("Text");

        // assert
        expect(textField.props.children).toEqual(HELLO_WORLD_TEXT);
    });

    // this example illustrates using a testID to find the component.
    // this may make it significantly easier to pick and choose exactly
    // component you would like to test
    it('should have "hello world" text (test 2)', async () => {
        // arrange
        const textField = testInstance.findByProps({testID: "hello-world-text"});

        // assert
        expect(textField.props.children).toEqual(HELLO_WORLD_TEXT);
    });
});
