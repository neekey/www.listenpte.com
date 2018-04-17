import React from 'react';
import wfdData from 'app/configs/wfd.json';
import Wfd from './comp.WFD';
import Progress from './comp.Progress';

export default class WFDContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    const { untestedIndexList, currentIndex } =
      this.calculateNextIndexAndUntestedList(wfdData.map((_, index) => index));
    this.state = {
      untestedIndexList,
      unknownIndexList: [],
      knownIndexList: [],
      testedIndexList: [],
      currentIndex,
    };
    this.onKnown = this.onKnown.bind(this);
    this.onUnknown = this.onUnknown.bind(this);
  }

  calculateNextIndexAndUntestedList(untestedIndexList) {
    const targetIndex = Math.floor(untestedIndexList.length * Math.random());
    const index = untestedIndexList[targetIndex];
    const newUntestedIndexList = [...untestedIndexList];
    newUntestedIndexList.splice(targetIndex, -1);
    return {
      currentIndex: index,
      untestedIndexList: newUntestedIndexList,
    };
  }

  onKnown() {
    const currentIndex = this.state.currentIndex;
    const newData = this.calculateNextIndexAndUntestedList(this.state.untestedIndexList);
    this.setState({
      currentIndex: newData.currentIndex,
      untestedIndexList: newData.untestedIndexList,
      knownIndexList: [...this.state.knownIndexList, currentIndex],
      testedIndexList: [...this.state.testedIndexList, currentIndex],
    });
  }

  onUnknown() {
    const currentIndex = this.state.currentIndex;
    const newData = this.calculateNextIndexAndUntestedList(this.state.untestedIndexList);
    this.setState({
      currentIndex: newData.currentIndex,
      untestedIndexList: newData.untestedIndexList,
      unknownIndexList: [...this.state.unknownIndexList, currentIndex],
      testedIndexList: [...this.state.testedIndexList, currentIndex],
    });
  }

  render() {
    return (<div>
      <Wfd
        sentenceIndex={this.state.currentIndex}
        sentence={wfdData[this.state.currentIndex]}
        onUnknown={this.onUnknown}
        onKnown={this.onKnown} />
      <Progress
        all={wfdData.length}
        known={this.state.knownIndexList.length}
        unknown={this.state.unknownIndexList.length} />
    </div>);
  }
}
