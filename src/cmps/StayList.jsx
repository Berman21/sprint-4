import React, { useState, useEffect } from 'react';
import { StayPreview } from './StayPreview';
import InfiniteScroll from 'react-infinite-scroll-component';

export function StayList({ stays }) {
  const [visibleStays, setVisibleStays] = useState([]);
  const itemsPerPage = 20;

  useEffect(() => {
    if (visibleStays.length === 0) {
      loadMoreStays();
    }
  }, [stays]);

  const loadMoreStays = () => {
    const currentVisibleStaysCount = visibleStays.length;
    const nextVisibleStays = stays.slice(
      currentVisibleStaysCount,
      currentVisibleStaysCount + itemsPerPage
    );

    setVisibleStays([...visibleStays, ...nextVisibleStays]);
  };

  return (
    <InfiniteScroll
      dataLength={visibleStays.length}
      next={loadMoreStays}
      hasMore={visibleStays.length < stays.length}
      loader={<h4>Loading...</h4>}
    >
      <ul className='stays-list clean-list'>
        {visibleStays.map((stay) => (
          <li className='stay' key={stay._id}>
            <StayPreview stay={stay} />
          </li>
        ))}
      </ul>
    </InfiniteScroll>
  );
}
