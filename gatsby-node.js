const path = require("path");

exports.createPages = async function ({ actions, graphql }) {
  const { data } = await graphql(`
    query pageQuery {
      allContentfulPage {
        edges {
          node {
            id
            contentful_id
            node_locale
            __typename
            url
            title
          }
        }
      }
    }
  `);

  const pageTemplate = path.resolve(`src/templates/PageTemplate.js`);

  data.allContentfulPage.edges.forEach((edge) => {
    const slug = edge.node.url;

    const locale = edge.node.node_locale;
    const pathLocale = edge.node.node_locale;

    const id = edge.node.id;
    const contentID = edge.node.contentful_id;
    const fullPath = `${pathLocale?.toLowerCase()}/${slug}`;
    const typename = edge.node.__typename;

    actions.createPage({
      path: fullPath,
      component: pageTemplate,
      context: {
        id: id,
        contentID: contentID,
        slug: slug || "",
        fullPath: fullPath,
        __typename: typename,
        locale: locale,
        sys: {
          ...edge.node.sys,
        },
      },
    });
  });
};
