import React, { useState, useEffect } from 'react'
import Editor from './Editor'
import useLocalStorage from '../hooks/useLocalStorage'

function App() {
  const [html, setHtml] = useLocalStorage('html', '')
  const [css, setCss] = useLocalStorage('css', '')
  const [js, setJs] = useLocalStorage('js', '')
  const [srcDoc, setSrcDoc] = useState('')

  const resetProject = () => {
    const input = window.prompt('Are you sure you want to reset your project? Type "reset project" to continue.')
    if (input === "reset project") {
      setHtml('')
      setCss('')
      setJs('')
    }
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html lang="en">
          <head>
            <style>${css}</style>
            <script>
              /*
              (function () {
                var logEvent = new Event('devsandbox:_log')
                var _constuff = {
                  __on : {},
                  addEventListener: function (name, callback) {
                    this.__on[name] = (this.__on[name] || []).concat(callback);
                    return this;
                  },
                  dispatchEvent: function (name, value) {
                    this.__on[name] = (this.__on[name] || []);
                    for (var i = 0, n = this.__on[name].length; i < n; i++) {
                      this.__on[name][i].call(this, value);
                    }
                    return this;
                  },
                }
                console = new Proxy({}, {
                  get(target, prop) {
                    if (prop in _constuff) return _constuff[prop]
                    return function (...args) {
                  this.dispatchEvent(prop, args);
                    }
                  }
                })
                window.console = console
                globalThis.console = console
              })()*/
              //document.domain = ${window.location.host}
              window.onload = function() {
                ${js}
              }
            </script>
          </head>
          <body>${html}</body>
        </html>
      `)
    }, 250)

    return () => clearTimeout(timeout)
  }, [html, css, js])

  function initconsole(e) {
/*

    const consoleMethods = ["assert", "clear", "count", "countReset", "debug", "dir", "dirxml", "error", "exception", "group", "groupCollapsed", "groupEnd", "info", "log", "profile", "profileEnd", "table", "time", "timeEnd", "timeLog", "timeStamp", "trace", "warn"]

    consoleMethods.forEach(method => {
  
      console.log('what')
  
      e.target.contentWindow.console.addEventListener(method, function (value) {
        console[method].apply(null, "dejected: " + value);
      });
    })*/
  }


  return (
    <>
      <div className="pane top-pane">
        <div className="links-and-actions">
          
    <div className="link">
    <a className="meta-link" href="https://www.rafdo.rf.gd/devsandbox">About DevSandbox</a>
</div><div className="action">
    <button className="meta-action" onClick={resetProject}>Reset Project</button>
</div>
        </div>
        <Editor
          language="xml"
          displayName="HTML"
          value={html}
          onChange={setHtml}
        />
        <Editor
          language="css"
          displayName="CSS"
          value={css}
          onChange={setCss}
        />
        <Editor
          language="javascript"
          displayName="JS"
          value={js}
          onChange={setJs}
        />
      </div>
      <div className="pane">
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
          onLoad={initconsole}
        />
      </div>
    </>
  )
}

export default App