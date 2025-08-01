import { lazy } from 'react';
import { Module, ModuleMeta } from '../types/module';

export const loadModules = (): Module[] => {
  // Import all meta.ts files from util-modules
  const metaModules = import.meta.glob('../util-modules/*/meta.ts', { eager: true });
  
  const modules: Module[] = [];
  
  Object.entries(metaModules).forEach(([path, metaModule]) => {
    try {
      const meta = metaModule as { default?: ModuleMeta } & ModuleMeta;
      const moduleMeta = meta.default || meta;
      
      if (!moduleMeta.title || !moduleMeta.route) {
        console.warn(`Module at ${path} is missing required meta properties (title, route)`);
        return;
      }
      
      // Extract the module folder name from the path
      const folderMatch = path.match(/\.\.\/util-modules\/([^/]+)\/meta\.ts$/);
      if (!folderMatch) {
        console.warn(`Could not extract module folder from path: ${path}`);
        return;
      }
      
      const moduleName = folderMatch[1];
      
      // Create lazy-loaded component
      const Component = lazy(() => import(`../util-modules/${moduleName}/index.tsx`));
      
      modules.push({
        title: moduleMeta.title,
        route: moduleMeta.route,
        icon: moduleMeta.icon,
        Component,
      });
    } catch (error) {
      console.error(`Error loading module from ${path}:`, error);
    }
  });
  
  return modules;
};