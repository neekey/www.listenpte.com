import React from 'react';
import PropTypes from 'prop-types';
import style from './comp.Voice.scss';
import classnames from 'classnames';
import { playWFDVoice } from 'app/utils/playVoice';
import { getRandomAccentIndex } from 'app/configs/voice';
import { track, EVENT_TYPE_PRODUCT } from 'app/utils/eventTrack';

export default class NumberVoice extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      playing: false,
      accentIndex: getRandomAccentIndex(),
    };
    this.onVoiceLoaded = this.onVoiceLoaded.bind(this);
    this.onVoiceEnded = this.onVoiceEnded.bind(this);
    this.onHandlePlay = this.onHandlePlay.bind(this);
  }

  componentDidMount() {
    this.playVoice();
  }

  componentWillReceiveProps(newProps) {
    if (this.props.sentenceIndex !== newProps.sentenceIndex) {
      this.setState({
        loading: true,
        playing: true,
        accentIndex: getRandomAccentIndex(),
      }, () => {
        this.playVoice();
      });
    }
  }

  playVoice() {
    playWFDVoice(this.props.sentenceIndex, this.state.accentIndex, {
      onLoad: this.onVoiceLoaded,
      onEnd: this.onVoiceEnded,
    });
  }

  onVoiceLoaded() {
    this.setState({
      loading: false,
      playing: true,
    });
  }

  onVoiceEnded() {
    this.setState({
      playing: false,
    });
  }

  onHandlePlay() {
    this.playVoice();
    track('play-voice', EVENT_TYPE_PRODUCT);
  }

  render() {
    return (<div
      className={classnames(style.container, this.props.className)}
      onClick={this.state.loading ? undefined : this.onHandlePlay}>
      {this.state.loading ?
        <i className="icon spinner" /> :
        <i className="icon talk outline" />}
      <span className={style.voiceTip}>Tap Me To Play</span>
    </div>);
  }
}

NumberVoice.propTypes = {
  sentenceIndex: PropTypes.number,
};
