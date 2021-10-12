/**
 *
 * UserSearch
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SearchUserInput from '../SearchUserInput';
import Loader from '../Loader';
import Recipient, {
  RecipientList,
} from '../../containers/SendMoneyPage/components/Recipient';
import { useUserSearch } from '../../hooks/useUserSearch';

function UserSearch({ selected, onSelected }) {
  const [searchValue, setSearchValue] = useState('');

  const { loading, users } = useUserSearch(searchValue);

  useEffect(() => {
    // Unselect user if it's not in the list anymore.
    if (selected) {
      if (!users.length) {
        onSelected(null);
      } else if (users.findIndex(item => item.id === selected?.id) === -1) {
        onSelected(null);
      }
    }
  }, [users]);

  return (
    <>
      <SearchUserInput
        value={searchValue}
        onChange={value => setSearchValue(value)}
      />
      {loading && <Loader title="Searching for users" inline />}
      <RecipientList>
        {users.map((item, index) => (
          <Recipient
            first={index === 0}
            key={item.id}
            item={item}
            active={selected?.id === item.id}
            onClick={() => onSelected(item)}
          />
        ))}
      </RecipientList>
    </>
  );
}

UserSearch.propTypes = {
  selected: PropTypes.object,
  onSelected: PropTypes.func.isRequired,
};

UserSearch.defaultProps = {
  selected: null,
};

export default UserSearch;
