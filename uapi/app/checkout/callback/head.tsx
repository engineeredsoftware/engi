/**
 * Ensures that the checkout callback overlay is the only visible element
 * while the page is streaming / hydrating by forcibly hiding everything
 * else using an inline style tag injected into the document <head>.
 */
export default function Head() {
  return (
    <style
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: `
          *:not(.callback-overlay):not(.callback-overlay *) {
            visibility: hidden !important;
          }
          html, body { overflow: hidden !important; }
        `,
      }}
    />
  );
}
