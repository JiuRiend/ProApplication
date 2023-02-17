// @ts-nocheck
import chalk from 'chalk';
import { defineConfig } from 'dumi';
import { readdirSync } from 'fs';
import { join } from 'path';
const isDev = process.env.NODE_ENV === 'development';

const headPkgList = [];
// utils must build before core
// runtime must build before renderer-react
const pkgList = readdirSync(join(__dirname, '/packages')).filter(
  (pkg) => pkg.charAt(0) !== '.' && !headPkgList.includes(pkg),
);
const alias = pkgList.reduce((pre, pkg) => {
  pre[`@vis/${pkg}`] = join(__dirname, '/packages', pkg, 'src');
  return {
    ...pre,
  };
}, {});

console.log(`🌼 alias list \n${chalk.blue(Object.keys(alias).join('\n'))}`);
// const isProduction = process.env.NODE_ENV === 'production';

const chartMenus = {
  title: '图表',
  children: [
    'charts',
    ...readdirSync(join(__dirname, '/packages/charts/src'))
      .filter((pkg) => pkg.charAt(0) !== '.' && pkg.split('.').length <= 1)
      .map((i) => {
        const _title = i.replace(i.charAt(0), i.charAt(0).toLowerCase());
        const link = `/components/${_title
          .replace(/([A-Z])/g, '-$1')
          .toLowerCase()}`;
        return {
          title: i,
          link,
        };
      }),
  ],
};
const componentMenus = {
  title: '其他组件',
  children: [
    'components',
    ...readdirSync(join(__dirname, '/packages/components/src'))
      .filter((pkg) => pkg.charAt(0) !== '.' && pkg.split('.').length <= 1)
      .map((i) => {
        const _title = i.replace(i.charAt(0), i.charAt(0).toLowerCase());
        const link = `/components/${_title
          .replace(/([A-Z])/g, '-$1')
          .toLowerCase()}`;
        return {
          title: i,
          link,
        };
      }),
  ],
};

export default defineConfig({
  title: 'yourname',
  apiParser: {},
  autoAlias: false,
  themeConfig: {
    logo: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
    hd: { rules: [] },
    rtl: true,
    name: 'yourname',
    socialLinks: {
      github: 'https://github.com/jeryqwq/ProApplication',
    },
    footer: `Open-source MIT Licensed | Copyright © 2023-present
    <br />
    Powered by <a href="https://github.com/jeryqwq">Chencc</a>`,
    sidebar: {
      '/components': [
        {
          title: '架构设计',
          children: [{ title: '通用配置', link: '/components' }],
        },
        {
          title: '工具 & 装饰',
          children: [
            { title: '测试', link: '/components/test' },
            { title: '工具函数', link: '/components/utils' },
            { title: '通用函数', link: '/components/common' },
            { title: '装饰器 & 动画', link: '/components/decorator' },
          ],
        },
        componentMenus,
        chartMenus,
      ],
    },
  },
  extraBabelPlugins: [],
  metas: [
    {
      name: 'apple-mobile-web-app-capable',
      content: 'yes',
    },
    {
      name: 'apple-mobile-web-app-status-bar-style',
      content: 'black-translucent',
    },
    {
      name: 'theme-color',
      content: '#1890ff',
    },
  ],
  alias,
  resolve: {
    atomDirs: pkgList.map((i) => ({
      type: 'component',
      dir: `/packages/${i}/src`,
    })),
    entryFile: './config/api.tsx',
  },
  history: { type: 'hash' },
  theme: {
    '@s-site-menu-width': '258px',
    '@root-entry-name': 'variable',
  },
  ignoreMomentLocale: true,
  exportStatic: {},
  outputPath: isDev ? undefined : 'build-docs',
  publicPath: isDev ? undefined : '/build-docs/',
  legacy: {
    /**
     * https://github.com/umijs/umi/issues/8658  修复打包es5 bug # Big integer literals are not available in the configured target environment "umi"
     * 不知道是哪个集成了babel的插件自动添加了es2015, 照理说umi新版会默认打包现代化应用（es2020），
     * 目前打包时会在当前的配置后再加es2015，会导致异常，这里直接忽略所有node_module代码，
     * 默认依赖已经打包好了，是dumi文档也没啥大影响
     */
    buildOnly: true,
    nodeModulesTransform: false,
  },
});
