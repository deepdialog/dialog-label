import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as TestUtils from 'react-dom/test-utils';
import NLG from '../src/components/NLG';

it('NLG is rendered', () => {
    // Render NLG in the document
    const appElement: any = TestUtils.renderIntoDocument(
        <NLG/>
    );

    const appNode = ReactDOM.findDOMNode(appElement);

    // Verify text content
    expect(appNode.textContent).toEqual("SysActRespSystem ActionResponse管理No Data");
});
