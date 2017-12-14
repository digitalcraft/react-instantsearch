import PropTypes from 'prop-types';
import React from 'react';
import BaseWidget from './BaseWidget';
import connectToggle from '../connectors/connectToggle.js';
import ToggleComponent from '../components/Toggle.js';
import classNames from '../components/classNames';

const cx = classNames('Toggle');

/**
 * The Toggle provides an on/off filtering feature based on an attribute value. Note that if you provide an “off” option, it will be refined at initialization.
 * @name Toggle
 * @kind widget
 * @requirements To use this widget, you'll need an attribute to toggle on.
 *
 * You can't toggle on null or not-null values. If you want to address this particular use-case you'll need to compute an
 * extra boolean attribute saying if the value exists or not. See this [thread](https://discourse.algolia.com/t/how-to-create-a-toggle-for-the-absence-of-a-string-attribute/2460) for more details.
 *
 * @propType {string} attributeName - Name of the attribute on which to apply the `value` refinement. Required when `value` is present.
 * @propType {string} label - Label for the toggle.
 * @propType {any} value - Value of the refinement to apply on `attributeName` when checked.
 * @propType {boolean} [defaultRefinement=false] - Default state of the widget. Should the toggle be checked by default?
 * @themeKey ais-Toggle__root - the root of the component
 * @themeKey ais-Toggle__checkbox - the toggle checkbox
 * @themeKey ais-Toggle__label - the toggle label
 * @example
 * import React from 'react';
 *
 * import { Toggle, InstantSearch } from 'react-instantsearch/dom';
 *
 * export default function App() {
 *   return (
 *     <InstantSearch
 *       appId="latency"
 *       apiKey="6be0576ff61c053d5f9a3225e2a90f76"
 *       indexName="ikea"
 *     >
 *       <Toggle
 *         attributeName="materials"
 *         label="Made with solid pine"
 *         value={'Solid pine'}
 *       />
 *     </InstantSearch>
 *   );
 * }
 */

const Widget = props => (
  <BaseWidget cx={cx} header={props.header} footer={props.footer}>
    <ToggleComponent cx={cx} {...props} />
  </BaseWidget>
);

Widget.propTypes = {
  header: PropTypes.node,
  footer: PropTypes.node,
};

export default connectToggle(Widget);
