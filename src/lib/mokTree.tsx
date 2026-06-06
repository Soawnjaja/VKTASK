export type TreeFileNode = {
  id: string;
  name: string;
  type: 'file';
  size: string;
};

export type TreeDirectoryNode = {
  id: string;
  name: string;
  type: 'directory';
  children: TreeNode[];
};

export type TreeNode = TreeFileNode | TreeDirectoryNode;

export const mokTree = (): TreeDirectoryNode => ({
  id: 'tree-root',
  name: 'project-root',
  type: 'directory',
  children: [
    {
      id: 'tree-src',
      name: 'src',
      type: 'directory',
      children: [
        {
          id: 'tree-src-components',
          name: 'components',
          type: 'directory',
          children: [
            {
              id: 'tree-src-components-header',
              name: 'Header.tsx',
              type: 'file',
              size: '2.1 KB',
            },
            {
              id: 'tree-src-components-button',
              name: 'Button.tsx',
              type: 'file',
              size: '1.8 KB',
            },
            {
              id: 'tree-src-components-sidebar',
              name: 'Sidebar.tsx',
              type: 'file',
              size: '3.2 KB',
            },
          ],
        },
        {
          id: 'tree-src-utils',
          name: 'utils',
          type: 'directory',
          children: [
            {
              id: 'tree-src-utils-helpers',
              name: 'helpers.ts',
              type: 'file',
              size: '1.4 KB',
            },
            {
              id: 'tree-src-utils-constants',
              name: 'constants.ts',
              type: 'file',
              size: '0.9 KB',
            },
          ],
        },
        {
          id: 'tree-src-app',
          name: 'App.tsx',
          type: 'file',
          size: '4.5 KB',
        },
        {
          id: 'tree-src-index',
          name: 'index.tsx',
          type: 'file',
          size: '0.7 KB',
        },
      ],
    },
    {
      id: 'tree-public',
      name: 'public',
      type: 'directory',
      children: [
        {
          id: 'tree-public-images',
          name: 'images',
          type: 'directory',
          children: [
            {
              id: 'tree-public-images-logo',
              name: 'logo.png',
              type: 'file',
              size: '15.3 KB',
            },
            {
              id: 'tree-public-images-icon',
              name: 'icon.svg',
              type: 'file',
              size: '2.8 KB',
            },
          ],
        },
        {
          id: 'tree-public-favicon',
          name: 'favicon.ico',
          type: 'file',
          size: '1.2 KB',
        },
      ],
    },
    {
      id: 'tree-docs',
      name: 'docs',
      type: 'directory',
      children: [
        {
          id: 'tree-docs-readme',
          name: 'README.md',
          type: 'file',
          size: '8.7 KB',
        },
        {
          id: 'tree-docs-api',
          name: 'API.md',
          type: 'file',
          size: '12.4 KB',
        },
      ],
    },
    {
      id: 'tree-root-package-json',
      name: 'package.json',
      type: 'file',
      size: '3.9 KB',
    },
    {
      id: 'tree-root-tsconfig',
      name: 'tsconfig.json',
      type: 'file',
      size: '1.1 KB',
    },
    {
      id: 'tree-root-readme',
      name: 'README.md',
      type: 'file',
      size: '5.2 KB',
    },
  ],
});
