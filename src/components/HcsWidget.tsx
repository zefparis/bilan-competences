export function HcsWidget() {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `
(function(){
  window.__HCS_DIAG = [];
  var origError = window.onerror;
  window.onerror = function(msg, src, line, col, err) {
    window.__HCS_DIAG.push({type:'error', msg:msg, src:src, line:line});
    if (origError) return origError.apply(this, arguments);
  };
  var origFetch = window.fetch;
  window.fetch = function() {
    var url = arguments[0];
    if (typeof url === 'string' && url.indexOf('hcs') !== -1) {
      window.__HCS_DIAG.push({type:'fetch', url:url, time:Date.now()});
    }
    return origFetch.apply(this, arguments);
  };
})();
`
        }}
      />
      <script
        src="https://hcs-widget-mvp.vercel.app/widget/v3/hcs-widget.js"
        async
        data-widget="qPtZJHNXf9CuP2LCLHNX8nkOlaFWq8tC"
        data-debug="true"
      />
    </>
  )
}
