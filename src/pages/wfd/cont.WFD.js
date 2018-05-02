import React from 'react';
import PropTypes from 'prop-types';
import stateProvider from 'app/utils/stateProvider';
import Wfd from './comp.WFD';
import Progress from './comp.Progress';

class WFDContainer extends React.Component {
  constructor(props) {
    super(props);
    const { untestedIndexList, currentIndex } =
      this.calculateNextIndexAndUntestedList(
        this.getWfdData().map((_, index) => index));
    this.state = {
      untestedIndexList,
      unknownIndexList: [],
      knownIndexList: [],
      testedIndexList: [],
      currentIndex,
      audioURL: this.calculateCurrentAudioURL(currentIndex),
    };
    this.onKnown = this.onKnown.bind(this);
    this.onUnknown = this.onUnknown.bind(this);
  }

  onKnown(answer) {
    const currentIndex = this.state.currentIndex;
    const wfdData = this.getWfdData();
    const currentWFD = wfdData[currentIndex] || {};
    this.props.store.actionAddUserAnswer({
      questionId: currentWFD.id,
      answer,
    });

    const newData = this.calculateNextIndexAndUntestedList(this.state.untestedIndexList);
    this.setState({
      currentIndex: newData.currentIndex,
      untestedIndexList: newData.untestedIndexList,
      knownIndexList: [...this.state.knownIndexList, currentIndex],
      testedIndexList: [...this.state.testedIndexList, currentIndex],
      audioURL: this.calculateCurrentAudioURL(newData.currentIndex),
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
      audioURL: this.calculateCurrentAudioURL(newData.currentIndex),
    });
  }

  getWfdData() {
    return this.props.store.selectQuestions();
  }

  calculateCurrentAudioURL(currentIndex) {
    const wfdData = this.getWfdData();
    const currentWFD = wfdData[currentIndex] || {};
    const { audioURLs } = currentWFD;
    return audioURLs ? audioURLs[Math.floor(Math.random() * audioURLs.length)] : null;
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

  render() {
    const wfdData = this.getWfdData();
    const currentWFD = wfdData[this.state.currentIndex] || {};
    const { sentence } = currentWFD;
    return (<div>
      <Wfd
        sentenceIndex={this.state.currentIndex}
        sentence={sentence}
        audioURL={this.state.audioURL}
        onUnknown={this.onUnknown}
        onKnown={this.onKnown} />
      <Progress
        all={wfdData.length}
        known={this.state.knownIndexList.length}
        unknown={this.state.unknownIndexList.length} />
    </div>);
  }
}

WFDContainer.propTypes = {
  store: PropTypes.object,
};

export default stateProvider(WFDContainer);
