import { SiteConfigInterface } from '../interfaces/site-config-interface';

export const getInitialFilterState = (
  sitesConfig: SiteConfigInterface[],
): { [site: string]: boolean } =>
  sitesConfig.reduce((acc, site) => {
    return {
      ...acc,
      [site.title]: true,
    };
  }, {});
