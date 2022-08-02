import { graphql } from "gatsby";
import React from "react";

const PageTemplate = ({ data, pageContext, location, serverData }) => {
  console.log("data", data);
  console.log("pageContext", pageContext);
  console.log("location", location);

  return (
    <div>
      <h2>Dynamic Props</h2>
      {serverData && <pre>{JSON.stringify(serverData, null, 2)}</pre>}

      <h2>Page Data</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>

      <h2>Page Context</h2>
      <pre>{JSON.stringify(pageContext, null, 2)}</pre>

      <h2>Page Location</h2>
      <pre>{JSON.stringify(location, null, 2)}</pre>
    </div>
  );
};

export async function getServerData(context) {
  const contentID = context?.pageContext?.contentID;

  try {
    const contentful = require("contentful");
    const client = contentful.createClient({
      space: process.env.GATSBY_CONTENTFUL_SPACE_ID,
      accessToken: process.env.GATSBY_CONTENTFUL_ACCESS_TOKEN,
      environment: process.env.GATSBY_CONTENTFUL_BRANCH,
      host: process.env.GATSBY_CONTENTFUL_HOST || "cdn.contentful.com",
    });

    let res = null;

    await client
      .getEntry(contentID)
      .then((entry) => (res = entry))
      .catch((err) => console.log(err));

    return {
      props: res,
    };
  } catch (err) {
    return {
      headers: {
        status: 500,
      },
      props: {},
    };
  }
}

export default PageTemplate;

export const query = graphql`
  query Page($id: String, $locale: String) {
    contentfulPage(id: { eq: $id }, node_locale: { eq: $locale }) {
      ... on ContentfulPage {
        title
        displayTitle
        url
      }
    }
  }
`;
