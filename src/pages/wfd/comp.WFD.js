import React from 'react';
import PropTypes from 'prop-types';
import Voice from './comp.Voice';
import style from './comp.WFD.scss';

export default class WFD extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSentence: false,
      userAnswer: '',
    };
    this.toggleSentence = this.toggleSentence.bind(this);
    this.onUserAnswerChange = this.onUserAnswerChange.bind(this);
    this.onKnown = this.onKnown.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.sentenceIndex !== this.props.sentenceIndex) {
      this.setState({
        showSentence: false,
        userAnswer: '',
      });
    }
  }

  onUserAnswerChange(e) {
    console.log(e.target.value);
    this.setState({
      userAnswer: e.target.value,
    });
  }

  onKnown() {
    this.props.onKnown(this.state.userAnswer);
  }

  toggleSentence() {
    this.setState({
      showSentence: !this.state.showSentence,
    });
  }

  render() {
    const { audioURL, onUnknown, sentence } = this.props;
    return (<div className={style.container}>
      <Voice className={style.numberVoice} audioURL={audioURL} />
      <div>
        <div
          className={style.sentence}
          onClick={this.toggleSentence}>{this.state.showSentence ? sentence : 'Show Sentence'}</div>
      </div>
      <button
        className="ui button orange"
        onClick={onUnknown}>I don't know
      </button>
      <button
        className="ui button green"
        onClick={this.onKnown}>Got it!
      </button>
      <textarea value={this.state.userAnswer} onChange={this.onUserAnswerChange} />
    </div>);
  }
}

WFD.propTypes = {
  sentenceIndex: PropTypes.number,
  sentence: PropTypes.string,
  audioURL: PropTypes.string,
  onUnknown: PropTypes.func,
  onKnown: PropTypes.func,
};

WFD.defaultProps = {
  sentence: '',
  sentenceIndex: 0,
  onUnknown: () => null,
  onKnown: () => null,
};
