/**
 *
 * ReceiptProducts
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { ProductItem, SingleItem } from '../styled/CompletionItem';

/**
 * @return {null}
 */
function ReceiptProducts({ items }) {
  if (items == null || items.length === 0) {
    return null;
  }

  return (
    <>
      <SingleItem title="Products:" style={{ marginTop: '2rem' }} />
      {items.map(item => (
        <ProductItem
          key={item.name + item.price}
          name={item.name}
          quantity={item.quantity}
          price={item.price}
        />
      ))}
    </>
  );
}

ReceiptProducts.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
};

export default ReceiptProducts;
