import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TagCloud } from "react-tagcloud";
import { useDarkTheme } from "../../data/stores/useDarkTheme";
import { useTagsStore } from "../../data/stores/useTagsStore";
import { getTagsCloud } from "../../api/tagsAPI";
import { Card } from "react-bootstrap";

import "./MainPage.css";

function MainPageTagsCloud() {
  const isDarkTheme = useDarkTheme((state) => state.isDarkTheme);
  const tagsCloud = useTagsStore((state) => state.tags);
  const setTagsCloud = useTagsStore((state) => state.setTags);
  const redirect = useNavigate();

  const getAllTags = async () => {
    const tags = await getTagsCloud();
    setTagsCloud(tags);
  };

  useEffect(() => {
    getAllTags();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dataTags = tagsCloud.map((tag) => {
    return {
      value: tag.title,
      count: tag.itemCollectionCount,
      key: tag._id,
    };
  });

  return (
    <Card
      bg={isDarkTheme && "dark"}
      text={isDarkTheme && "light"}
      className="text-center mb-3"
    >
      <Card.Body>
        <TagCloud
          minSize={12}
          maxSize={35}
          tags={dataTags}
          className="simple-cloud"
          onClick={(tag) => redirect(`/searchpage/tag${tag.key}`)}
        />
      </Card.Body>
    </Card>
  );
}

export default MainPageTagsCloud;
