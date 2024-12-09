import { useState, useEffect } from 'react';
import { IoIosArrowUp } from "react-icons/io";

function GoToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Handle scroll visibility
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className={`
            fixed bottom-10 
            left-1/2 transform -translate-x-1/2 
            md:right-8 md:left-auto md:transform-none 
            bg-slate-700 text-white 
            rounded-full w-12 h-12 
            flex justify-center items-center 
            shadow-lg transition-all duration-300
            ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}
          `}
          style={{ transition: 'opacity 0.3s ease, transform 0.3s ease' }}
        >
          <IoIosArrowUp className="text-2xl" />
        </button>
      )}
    </div>
  );
}

export default GoToTop;
