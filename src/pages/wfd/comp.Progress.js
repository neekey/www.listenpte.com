import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'antd';
import style from './comp.Progress.scss';
import classnames from 'classnames';

const BAD_COLOR = [255, 255, 255];
const GOOD_COLOR = [17, 245, 8];

function pickValueBetween(start, end, percentage) {
  const distance = Math.abs(start - end);
  const delta = distance * percentage;
  if (start > end) {
    return start - delta;
  }
  return start + delta;
}

function pickColor(start, end, percentage) {
  return [
    Math.floor(pickValueBetween(start[0], end[0], percentage)),
    Math.floor(pickValueBetween(start[1], end[1], percentage)),
    Math.floor(pickValueBetween(start[2], end[2], percentage)),
  ];
}

export default function Progress({ weightedQuestions, highlightQuestionId }) {
  const all = weightedQuestions.length;
  const unit = `${100 / all}%`;
  const maxWeight = 100;
  const segs = weightedQuestions.map(item => {
    const weight = item.weight;
    let per = weight / maxWeight;
    if (weight > maxWeight) {
      per = 1;
    } else if (weight < 0) {
      per = 0;
    }
    const rgb = pickColor(GOOD_COLOR, BAD_COLOR, per);
    const isHighlighted = item.id === highlightQuestionId;
    return (
      <Tooltip
        key={item.sentence}
        title={isHighlighted ? null : `${item.weight}: ${item.sentence}`}>
        <div
          className={classnames(style.unit, {
            [style.highlight]: isHighlighted,
          })}
          style={{ width: unit, background: `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})` }} />
      </Tooltip>
    );
  });
  return (<div className={style.container}>
    {segs}
  </div>);
}

Progress.propTypes = {
  highlightQuestionId: PropTypes.string,
  weightedQuestions: PropTypes.array,
};
