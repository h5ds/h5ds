import React from 'react';
import { Redirect } from 'react-router-dom';
import { dynamic } from './utils';
import { routes as editorRoutes } from './pages/editor';
// 管理页面
const EditorLayout = dynamic(import('./layout/editor-layout'));

const routes = [
  {
    path: '/',
    component: EditorLayout,
    meta: { auth: true },
    routes: [...editorRoutes]
  }
];

export { routes };
