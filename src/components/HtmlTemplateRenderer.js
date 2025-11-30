const HtmlTemplateRenderer = ({ html }) => (
  <div dangerouslySetInnerHTML={{ __html: html }} />
);

export default HtmlTemplateRenderer;
