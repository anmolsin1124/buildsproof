import React, { useRef, useEffect, useState } from 'react';
import FeedCard from '../feedcard/FeedCard';

const FeedCarousel = ({ feedData }) => {
  const scrollContainerRef = useRef(null);
  const [centerIndex, setCenterIndex] = useState(0);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const scrollTop = container.scrollTop;
    const containerHeight = container.clientHeight;
    const cardHeight = 520; // Approximate height of feed card with gap
    const gapHeight = 24;
    const totalCardHeight = cardHeight + gapHeight;

    // Calculate which card is in the middle
    const middlePosition = scrollTop + containerHeight / 2;
    const centerCardIndex = Math.round(middlePosition / totalCardHeight);

    setCenterIndex(centerCardIndex);
  };

  const scrollToCard = (index) => {
    if (!scrollContainerRef.current) return;

    const cardHeight = 520;
    const gapHeight = 24;
    const totalCardHeight = cardHeight + gapHeight;
    const targetScroll = index * totalCardHeight - (scrollContainerRef.current.clientHeight / 2 - cardHeight / 2);

    scrollContainerRef.current.scrollTo({
      top: Math.max(0, targetScroll),
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScrollEnd = () => {
      handleScroll();
      // Auto-snap to nearest card with slower animation
      const scrollTop = container.scrollTop;
      const cardHeight = 520;
      const gapHeight = 24;
      const totalCardHeight = cardHeight + gapHeight;
      const nearestIndex = Math.round(scrollTop / totalCardHeight);

      setTimeout(() => {
        scrollToCard(nearestIndex);
      }, 200); // Increased delay for slower snap
    };

    let scrollTimeout;
    const onScroll = () => {
      clearTimeout(scrollTimeout);
      handleScroll();
      scrollTimeout = setTimeout(handleScrollEnd, 400); // Increased from 150ms to 400ms
    };

    container.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      container.removeEventListener('scroll', onScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <div className="w-full mb-12">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Trending Now</h2>
        <div className="text-sm text-gray-500">
          {centerIndex + 1} / {feedData.length}
        </div>
      </div>

      {/* Vertical Feed Scroll with Snap & Scrollbar */}
      <div className="relative">
        <div
          ref={scrollContainerRef}
          className="max-h-screen overflow-y-auto pr-2 custom-scrollbar space-y-6 scroll-smooth"
          style={{
            scrollBehavior: 'smooth',
          }}
        >
          {feedData.map((feed, index) => (
            <div
              key={feed.id}
              className={`transition-all duration-300 cursor-pointer ${
                index === centerIndex
                  ? 'opacity-100 scale-100 shadow-xl ring-2 ring-green-500 rounded-xl'
                  : 'opacity-100 scale-100 hover:shadow-lg'
              }`}
              onClick={() => scrollToCard(index)}
            >
              <FeedCard post={feed} />
            </div>
          ))}
        </div>

        {/* Center Indicator Line */}
        <div className="absolute left-0 right-0 top-1/2 h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent pointer-events-none opacity-30 transform -translate-y-1/2"></div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #10b981;
          border-radius: 10px;
          transition: background 0.3s;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #059669;
        }

        .custom-scrollbar {
          scrollbar-color: #10b981 #f1f5f9;
          scrollbar-width: thin;
        }
      `}</style>
    </div>
  );
};

export default FeedCarousel;
