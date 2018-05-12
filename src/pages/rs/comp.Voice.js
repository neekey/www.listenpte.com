import React from 'react';
import PropTypes from 'prop-types';
import style from './comp.Voice.scss';
import classnames from 'classnames';
import { playVoice } from 'app/utils/playVoice';
import { track, EVENT_TYPE_PRODUCT } from 'app/utils/eventTrack';

export default class NumberVoice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      playing: false,
    };
    this.onVoiceLoaded = this.onVoiceLoaded.bind(this);
    this.onVoiceEnded = this.onVoiceEnded.bind(this);
    this.onHandlePlay = this.onHandlePlay.bind(this);
  }

  componentDidMount() {
    this.playVoice();
  }

  componentWillReceiveProps(newProps) {
    if (this.props.audioURL !== newProps.audioURL) {
      this.setState({
        loading: true,
        playing: true,
      }, () => {
        this.playVoice();
      });
    }
  }

  onVoiceLoaded() {
    this.setState({
      loading: false,
      playing: true,
    });
    this.props.onVoicePlay();
  }

  onVoiceEnded() {
    this.setState({
      playing: false,
    });
    this.props.onVoiceEnded();
  }

  onHandlePlay() {
    this.playVoice();
    track('play-voice', EVENT_TYPE_PRODUCT);
  }

  playVoice() {
    playVoice(this.props.audioURL, {
      onLoad: this.onVoiceLoaded,
      onEnd: this.onVoiceEnded,
    });
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
  audioURL: PropTypes.string,
  className: PropTypes.string,
  onVoiceEnded: PropTypes.func,
  onVoicePlay: PropTypes.func,
};

NumberVoice.defaultProps = {
  onVoiceEnded: () => null,
  onVoicePlay: () => null,
};
