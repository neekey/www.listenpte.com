import React from 'react';
import PropTypes from 'prop-types';
import Voice from './comp.Voice';
import style from './comp.WFD.scss';

export default class WFD extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSentence: false,
    };
    this.toggleSentence = this.toggleSentence.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.sentenceIndex !== this.props.sentenceIndex) {
      this.setState({
        showSentence: false,
      });
    }
  }

  toggleSentence() {
    this.setState({
      showSentence: !this.state.showSentence,
    });
  }

  render() {
    const { sentenceIndex, onUnknown, onKnown, sentence } = this.props;
    return (<div className={style.container}>
      <Voice className={style.numberVoice} sentenceIndex={sentenceIndex} />
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
        onClick={onKnown}>Got it!
      </button>
    </div>);
  }
}

WFD.propTypes = {
  sentenceIndex: PropTypes.number,
  sentence: PropTypes.string,
  onUnknown: PropTypes.func,
  onKnown: PropTypes.func,
};

WFD.defaultProps = {
  sentence: '',
  sentenceIndex: 0,
  onUnknown: () => null,
  onKnown: () => null,
};
