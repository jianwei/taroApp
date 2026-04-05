// @author Claude Code (claude-sonnet-4-6)
module.exports = {
  presets: [
    ['taro', {
      framework: 'react',
      ts: true
    }]
  ],
  plugins: [
    [
      'import',
      {
        'libraryName': 'taro-ui',
        'customName': (name) => {
          if (name === 'taro-ui') {
            return `taro-ui/lib/index`;
          }
          return `taro-ui/lib/${name.replace(/^at-/, '')}`;
        },
        'style': (name) => {
          return `${name}/index.scss`;
        }
      },
      'taro-ui'
    ]
  ]
}
