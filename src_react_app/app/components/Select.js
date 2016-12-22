import React, {
  PropTypes,
} from 'react';
import {
  Tag
} from 'antd';
const CheckableTag = Tag.CheckableTag;

const tagsFromServer = ['肿瘤病', '残疾人', '女性保健', '孕产妇'];

//标签
export default class Tags extends React.Component {
  state = {
    selectedTags: [],
  };

  handleChange = (tag, checked) => {
    const {
      selectedTags
    } = this.state;
    const nextSelectedTags = checked ?
      [...selectedTags, tag] :
      selectedTags.filter(t => t !== tag);
    console.log('You are interested in: ', nextSelectedTags);
    this.setState({
      selectedTags: nextSelectedTags
    });
  }

  render() {
    const {
      selectedTags
    } = this.state;
    return (
      <div>
        <strong>标签: </strong>
        {tagsFromServer.map(tag => (
          <CheckableTag
            key={tag}
            checked={selectedTags.indexOf(tag) > -1}
            onChange={checked => this.handleChange(tag, checked)}
          >
            {tag}
          </CheckableTag>
        ))}
      </div>
    );
  }
}