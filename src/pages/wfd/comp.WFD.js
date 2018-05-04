import React from 'react';
import PropTypes from 'prop-types';
import Voice from './comp.Voice';
import style from './comp.WFD.scss';
import Layout from 'app/components/layout/comp.Layout';
import Block from 'app/components/layout/comp.Block';
import { Button } from 'antd-mobile';
import Diff from 'app/components/diff';
import { Link } from 'react-router';

export default class WFD extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSentence: false,
      userAnswer: '',
      submitted: false,
    };
    this.onUserAnswerChange = this.onUserAnswerChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onNext = this.onNext.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.sentence !== this.props.sentence) {
      this.setState({
        showSentence: false,
        userAnswer: '',
        submitted: false,
      });
    }
  }

  onUserAnswerChange(e) {
    this.setState({
      userAnswer: e.target.value,
    });
  }

  onSubmit() {
    this.setState({
      submitted: true,
    });
  }

  onNext() {
    this.props.onKnown(this.state.userAnswer);
  }

  render() {
    const { audioURL, onUnknown, sentence } = this.props;
    const { submitted, userAnswer } = this.state;
    return (<Layout title="WFD" leftAction={{ label: <Link to="/">Home</Link> }}>
      <Block className={style.container}>
        <Voice className={style.numberVoice} audioURL={audioURL} />
        <div>
          <div
            className={style.sentence}>
            {submitted ? sentence : 'Will show answer after submission'}
          </div>
        </div>
        <div>
          <textarea
            disabled={submitted}
            className={style.answer}
            value={userAnswer}
            onChange={this.onUserAnswerChange} />
          {submitted ? <Diff inputB={sentence} inputA={userAnswer} type="words" /> : null}
        </div>
        <div>
          {!submitted ? (
            <Button
              type="ghost"
              onClick={onUnknown}
              inline style={{ marginRight: 10 }}>
              I don't know
            </Button>) : null
          }
          {!submitted ? (
            <Button
              type="primary"
              disabled={!userAnswer}
              onClick={this.onSubmit}
              inline>
              Submit
            </Button>) : null
          }
          {submitted ? (
            <Button
              type="primary"
              onClick={this.onNext}
              inline>
              Next
            </Button>) : null
          }
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
};

WFD.defaultProps = {
  sentence: '',
  onUnknown: () => null,
  onKnown: () => null,
};
