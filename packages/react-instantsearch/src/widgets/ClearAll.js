import PropTypes from 'prop-types';
import React from 'react';
import BaseWidget from './BaseWidget';
import connectCurrentRefinements from '../connectors/connectCurrentRefinements.js';
import ClearAllComponent from '../components/ClearAll.js';
import classNames from '../components/classNames';

const cx = classNames('ClearRefinements');

/**
 * The ClearAll widget displays a button that lets the user clean every refinement applied
 * to the search.
 * @name ClearAll
 * @kind widget
 * @propType {function} [transformItems] - Function to modify the items being displayed, e.g. for filtering or sorting them. Takes an items as parameter and expects it back in return.
 * @propType {boolean} [clearsQuery=false] - Pass true to also clear the search query
 * @themeKey ais-ClearAll__root - the widget button
 * @translationKey reset - the clear all button value
 * @example
 * import React from 'react';
 *
 * import { ClearAll, RefinementList, InstantSearch } from 'react-instantsearch/dom';
 *
 * export default function App() {
 *   return (
 *     <InstantSearch
 *       appId="latency"
 *       apiKey="6be0576ff61c053d5f9a3225e2a90f76"
 *       indexName="ikea"
 *     >
 *       <ClearAll />
 *       <RefinementList
          attributeName="colors"
          defaultRefinement={['Black']}
        />
 *     </InstantSearch>
 *   );
 * }
 */

const Widget = props => (
  <BaseWidget cx={cx} header={props.header} footer={props.footer}>
    <ClearAllComponent cx={cx} {...props} />
  </BaseWidget>
);

Widget.propTypes = {
  header: PropTypes.node,
  footer: PropTypes.node,
};

export default connectCurrentRefinements(Widget);
