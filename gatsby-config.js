const { resolve } = require('path');
const { readFileSync } = require('fs');

const manifest = readFileSync(resolve(__dirname, 'src/assets/favicons/site.webmanifest'), 'utf8');

module.exports = {
  siteMetadata: {
    title: 'deplacement-covid-19',
    description: 'Service de génération de l\'attestation de déplacement dérogatoire à présenter dans le cadre du confinement lié au virus covid-19',
    author: 'Guillaume L. <g.lariviere@student.42.fr>',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-typescript',
    'gatsby-plugin-sass',
    'gatsby-plugin-eslint',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'assets',
        path: resolve(__dirname, 'src', 'assets'),
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: JSON.parse(manifest),
    },
    {
      resolve: 'gatsby-plugin-alias-imports',
      options: {
        alias: {
          assets: resolve(__dirname, 'src', 'assets'),
          types: resolve(__dirname, 'src', 'types'),
          pages: resolve(__dirname, 'src', 'pages'),
          components: resolve(__dirname, 'src', 'components'),
          helpers: resolve(__dirname, 'src', 'helpers'),
          styles: resolve(__dirname, 'src', 'styles'),
        },
        extensions: ['ts', 'tsx', 'js', 'jsx'],
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // 'gatsby-plugin-offline',
  ],
}
