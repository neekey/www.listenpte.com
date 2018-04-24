import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd-mobile';
import Block from './comp.Block';
import style from './comp.Layout.scss';

export default class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hello: 1,
    };
  }

  renderTopActionBar() {
    const { leftAction, rightAction } = this.props;
    return (
      <Block className={style.topActionBar}>
        {leftAction ? (
          <span className={style.topLeftAction} onClick={leftAction.onClick}>
            {leftAction.icon ? <Icon className={style.icon} type={leftAction.icon} /> : null}
              {leftAction.label}
          </span>
        ) : <div />}
        {rightAction ? (
          <span className={style.topRightAction} onClick={rightAction.onClick}>
            {rightAction.label}
            {rightAction.icon ? <Icon className={style.icon} type={rightAction.icon} /> : null}
          </span>
        ) : <div />}
      </Block>
    );
  }

  renderTitleBar() {
    const { title, extraContentWithTitle } = this.props;
    if (title || extraContentWithTitle) {
      return (
        <Block className={style.titleBar}>
          {title ? (
            <h3 className={style.title}>{title}</h3>
          ) : <div />}
          {extraContentWithTitle ? (
            <span className={style.titleExtra}>{extraContentWithTitle}</span>
          ) : <div />}
        </Block>
      );
    }
    return null;
  }

  render() {
    return (
      <div className={style.layout}>
        {this.renderTopActionBar()}
        {this.renderTitleBar()}
        <div className={style.content}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

const actionModel = PropTypes.shape({
  label: PropTypes.string,
  icon: PropTypes.string,
  onClick: PropTypes.func,
});

Layout.propTypes = {
  title: PropTypes.string,
  leftAction: actionModel,
  rightAction: actionModel,
  extraContentWithTitle: PropTypes.any,
  children: PropTypes.any,
};
