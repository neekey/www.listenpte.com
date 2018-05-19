import React from 'react';
import PropTypes from 'prop-types';
import Voice from './comp.Voice';
import style from './comp.WFD.scss';
import Layout from 'app/components/layout/comp.Layout';
import Block from 'app/components/layout/comp.Block';
import { Button, Alert } from 'antd';
import { Link } from 'react-router';
import Progress from './comp.Progress';

export default class WFD extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSentence: false,
      played: false,
      isPlaying: false,
      shouldStartSpeak: false,
    };
    this.onShowSentence = this.onShowSentence.bind(this);
    this.onVoicePlay = this.onVoicePlay.bind(this);
    this.onVoiceEnded = this.onVoiceEnded.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.sentence !== this.props.sentence) {
      this.setState({
        showSentence: false,
        played: false,
        isPlaying: false,
        shouldStartSpeak: false,
      });
    }
  }

  onShowSentence() {
    this.setState({
      showSentence: true,
    });
  }

  onVoicePlay() {
    this.setState({
      played: true,
      isPlaying: true,
    });
  }

  onVoiceEnded() {
    this.setState({
      isPlaying: false,
    });
    setTimeout(() => {
      this.setState({
        shouldStartSpeak: true,
      });
    }, 3000);
  }

  render() {
    const { audioURL, onUnknown, onKnown, sentence, isSaving, questionId } = this.props;
    const { showSentence, played, isPlaying, shouldStartSpeak } = this.state;
    let alertMessage = null;
    if (played) {
      if (isPlaying) {
        alertMessage = 'Playing...';
      } else if (shouldStartSpeak) {
        alertMessage = 'Please speak now.';
      } else {
        alertMessage = '2 Seconds to speak...';
      }
    }
    return (<Layout
      title="Repeat Sentence"
      leftAction={{ label: <Link to="/">Home</Link> }}>
      <Progress
        weightedQuestions={this.props.weightedQuestions}
        highlightQuestionId={questionId} />
      <Block className={style.container}>
        {played ? (
          <Alert
            className={style.alert}
            message={alertMessage}
            type={(!isPlaying && shouldStartSpeak) ? 'warning' : 'info'} />
        ) : null}
        <Voice
          onVoicePlay={this.onVoicePlay}
          onVoiceEnded={this.onVoiceEnded}
          className={style.numberVoice}
          audioURL={audioURL} />
        <div>
          <div
            onClick={showSentence ? null : this.onShowSentence}
            className={style.sentence}>
            {showSentence ? sentence : 'Click to show the sentence'}
          </div>
        </div>
        <div>
          <Button
            disabled={isSaving}
            type="default"
            onClick={onUnknown}
            style={{ marginRight: 10 }}>
            I don't know
          </Button>
          <Button
            disabled={isSaving}
            type="primary"
            onClick={onKnown}>
            I know
          </Button>
        </div>
      </Block>
    </Layout>);
  }
}

WFD.propTypes = {
  sentence: PropTypes.string,
  audioURL: PropTypes.string,
  onUnknown: PropTypes.func,
  onKnown: PropTypes.func,
  isSaving: PropTypes.bool,
  weightedQuestions: PropTypes.array,
  questionId: PropTypes.string,
};

WFD.defaultProps = {
  sentence: '',
  onUnknown: () => null,
  onKnown: () => null,
  weightedQuestions: [],
};
