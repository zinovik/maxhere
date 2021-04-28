import React from 'react';
import { getSiteForUrl } from '../games-list-helpers/get-site-for-url';
import { SiteConfigInterface } from '../interfaces/site-config-interface';

interface GameIconLinkProps {
  sitesConfig: SiteConfigInterface[];
  url: string;
}

export const GameIconLink: React.FC<GameIconLinkProps> = ({
  sitesConfig,
  url,
}) => {
  const site: SiteConfigInterface = getSiteForUrl(sitesConfig, url);

  return (
    <a
      href={url}
      target="_blank"
      style={{ display: 'flex', alignItems: 'center' }}
    >
      {site.icon}
    </a>
  );
};
