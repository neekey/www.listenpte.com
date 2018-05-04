import React from 'react';
import PropTypes from 'prop-types';
import stateProvider from 'app/utils/stateProvider';
import Wfd from './comp.WFD';

class WFDContainer extends React.Component {
  constructor(props) {
    super(props);
    const question = this.props.store.selectWeightedQuestions()[0];
    this.state = {
      audioURL: this.calculateCurrentAudioURL(question),
      question,
      isSaving: false,
    };
    this.onKnown = this.onKnown.bind(this);
    this.onUnknown = this.onUnknown.bind(this);
  }

  onKnown(answer) {
    const questionId = this.state.question.id;
    this.setState({
      isSaving: true,
    });
    this.props.store.actionRecordUserAnswer(
      questionId,
      {
        questionId,
        answer,
      }
    ).then(() => {
      const question = this.props.store.selectWeightedQuestions()[0];
      this.setState({
        isSaving: false,
        question,
        audioURL: this.calculateCurrentAudioURL(question),
      });
    });
  }

  onUnknown() {
    const questionId = this.state.question.id;
    this.setState({
      isSaving: true,
    });
    this.props.store.actionRecordUserAnswer(
      questionId
    ).then(() => {
      const question = this.props.store.selectWeightedQuestions()[0];
      this.setState({
        isSaving: false,
        question,
        audioURL: this.calculateCurrentAudioURL(question),
      });
    });
  }

  calculateCurrentAudioURL(question) {
    const { audioURLs } = question;
    return audioURLs ? audioURLs[Math.floor(Math.random() * audioURLs.length)] : null;
  }

  render() {
    const { sentence } = this.state.question;
    return (<div>
      <Wfd
        isSaving={this.state.isSaving}
        sentence={sentence}
        audioURL={this.state.audioURL}
        onUnknown={this.onUnknown}
        onKnown={this.onKnown} />
    </div>);
  }
}

WFDContainer.propTypes = {
  store: PropTypes.object,
};

export default stateProvider(WFDContainer);
