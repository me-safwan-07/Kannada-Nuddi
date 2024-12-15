import { useEffect, useState } from "react";
import {
  AmpStory,
  AmpStoryPage,
  AmpStoryGridLayer,
  AmpImg,
  AmpHeader,
  AmpStoryBookend,
} from "react-google-stories";
import { useParams } from "react-router-dom";

export const WebStoryById = () => {
  const { storyId } = useParams();
  const [slides, setSlides] = useState([]);
  
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/story/${storyId}`);
        const data = await response.json();
        setSlides(data.slides || []); // Default to empty array if `data.slides` is undefined
      } catch (error) {
        console.error("Error fetching slides:", error);
      }
    };

    fetchSlides();
  }, []);

  if (!slides.length) {
    return <div>Loading...</div>; // Show loading state if slides are not yet loaded
  }

  return (
    <AmpStory
      title="Sample Web Story"
      publisher="BlexZET"
      publisher-logo-src="/brandlogo.png"
      poster-portrait-src="/brandlogo.png"
    >
      {slides.map((slide, index) => (
        <AmpStoryPage key={slide._id || index} id={`slide-${index}`}>
          <AmpStoryGridLayer template="fill">
            <AmpImg
              src={slide.image || ""}
              width="720"
              height="1280"
              layout="responsive"
            />
          </AmpStoryGridLayer>
          {slide.caption && (
            <AmpStoryGridLayer template="vertical">
              <AmpHeader className="text-2xl font-bold" title={slide.caption} level={1} />
            </AmpStoryGridLayer>
          )}
        </AmpStoryPage>
      ))}
      <AmpStoryBookend src="bookend.json" />
    </AmpStory>
  );
};
