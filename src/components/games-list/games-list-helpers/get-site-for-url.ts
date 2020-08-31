import { SiteConfigInterface } from '../interfaces/site-config-interface';

export const getSiteForUrl = (
  sitesConfig: SiteConfigInterface[],
  url: string,
): SiteConfigInterface =>
  sitesConfig.find(({ urlParts }) =>
    urlParts.some((urlPart: string) => url.includes(urlPart)),
  ) || {
    title: '',
    urlParts: [],
    icon: null,
  };
