import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'
import bash from 'highlight.js/lib/languages/bash'
import json from 'highlight.js/lib/languages/json'
import yaml from 'highlight.js/lib/languages/yaml'
import go from 'highlight.js/lib/languages/go'
import dockerfile from 'highlight.js/lib/languages/dockerfile'

hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('bash', bash)
hljs.registerLanguage('json', json)
hljs.registerLanguage('yaml', yaml)
hljs.registerLanguage('go', go)
hljs.registerLanguage('dockerfile', dockerfile)

export function highlightCode(code: string, label: string) {
  const name = label.toLowerCase()
  const language = /typescript|\.ts$/.test(name)
    ? 'typescript'
    : /javascript|\.m?js$/.test(name)
      ? 'javascript'
      : /json|response/.test(name)
        ? 'json'
          : /shell|terminal|bash|curl|^sh$/.test(name)
          ? 'bash'
          : /yaml|yml/.test(name) ? 'yaml'
          : name === 'go' ? 'go'
          : /dockerfile|docker/.test(name) ? 'dockerfile'
          : undefined
  return language
    ? hljs.highlight(code, { language }).value
    : code
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
}
