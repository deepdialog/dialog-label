import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as TestUtils from 'react-dom/test-utils';
import App from '../src/components/RootRouter';

it('App is rendered', () => {
    // Render App in the document
    const appElement: any = TestUtils.renderIntoDocument(
        <App/>
    );

    const appNode = ReactDOM.findDOMNode(appElement);

    // Verify text content
    expect(appNode.textContent).toEqual("导出清空···DeepDL···Import···Intent···Entity···NLG···FAQ···STORY···点击这里上传 或者 把语料文件拖动到这个区域默认数据会保存在localStorage中，一般情况不能超过5MB，如果有很多实体、意图的情况，可以拆分多个文件请拖动单个文件，YAML格式（.yml或后缀名，或者其他后缀名符合YAML语法的文本文件）");
});
