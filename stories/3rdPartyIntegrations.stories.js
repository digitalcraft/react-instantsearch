import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { connectRange } from '../packages/react-instantsearch/connectors';
import { WrapWithHits } from './util';
import BaseWidget from '../packages/react-instantsearch/src/widgets/BaseWidget';
import classNames from '../packages/react-instantsearch/src/components/classNames';
import Rheostat from 'rheostat';

const cx = classNames('RangeSlider');

const stories = storiesOf('Integration With Other Libraries', module);

stories.add('Airbnb Rheostat', () => (
  <WrapWithHits linkedStoryGroup="3rdPartyIntegrations">
    <ConnectedRange attributeName="price" />
  </WrapWithHits>
));

class Range extends Component {
  static propTypes = {
    min: PropTypes.number,
    max: PropTypes.number,
    currentRefinement: PropTypes.object,
    refine: PropTypes.func.isRequired,
    canRefine: PropTypes.bool.isRequired,
    header: PropTypes.node,
    footer: PropTypes.node,
  };

  state = { currentValues: { min: this.props.min, max: this.props.max } };

  componentWillReceiveProps(sliderState) {
    if (sliderState.canRefine) {
      this.setState({
        currentValues: {
          min: sliderState.currentRefinement.min,
          max: sliderState.currentRefinement.max,
        },
      });
    }
  }

  onValuesUpdated = sliderState => {
    this.setState({
      currentValues: { min: sliderState.values[0], max: sliderState.values[1] },
    });
  };

  onChange = sliderState => {
    if (
      this.props.currentRefinement.min !== sliderState.values[0] ||
      this.props.currentRefinement.max !== sliderState.values[1]
    ) {
      this.props.refine({
        min: sliderState.values[0],
        max: sliderState.values[1],
      });
    }
  };

  render() {
    const { min, max, currentRefinement, header, footer } = this.props;
    const { currentValues } = this.state;
    return min !== max ? (
      <BaseWidget cx={cx} header={header} footer={footer}>
        <Rheostat
          min={min}
          max={max}
          values={[currentRefinement.min, currentRefinement.max]}
          onChange={this.onChange}
          onValuesUpdated={this.onValuesUpdated}
        >
          <div
            className="rheostat-marker rheostat-marker--large"
            style={{ left: '0%', position: 'absolute', marginLeft: '0px' }}
          >
            <div className="rheostat-value">{currentValues.min}</div>
          </div>
          <div
            className="rheostat-marker rheostat-marker--large"
            style={{ left: '100%', position: 'absolute', marginLeft: '-1px' }}
          >
            <div className="rheostat-value">{currentValues.max}</div>
          </div>
        </Rheostat>
      </BaseWidget>
    ) : null;
  }
}

const ConnectedRange = connectRange(Range);

export default ConnectedRange;
