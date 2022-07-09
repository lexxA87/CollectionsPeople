import React, { useState } from "react";
import Loading from "../helper/Loading";
import { Link, useParams } from "react-router-dom";
import { useDarkTheme } from "../../data/stores/useDarkTheme";

function SearchPage() {
  const [isLoading, setLoading] = useState(true);

  const params = useParams();
  const tagID = params.id;

  console.log(tagID);

  return <div>SearchPage</div>;
}

export default SearchPage;
