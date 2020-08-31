import React from 'react';
import styled from 'styled-components';
import { SiteConfigInterface } from '../interfaces/site-config-interface';

const ALL = 'All';
const WITHOUT_IMPLEMENTATION = 'Without Implementation';

const Label = styled.label`
  margin-left: 2px;
`;

interface FilterProps {
  sitesConfig: SiteConfigInterface[];
  sitesFilter: { [site: string]: boolean };
  isWithoutImplementation: boolean;
  setSitesFilter: (sitesFilter: { [site: string]: boolean }) => void;
  setIsWithoutImplementation: (isWithoutImplementation: boolean) => void;
}

export const Filter: React.FC<FilterProps> = ({
  sitesConfig,
  sitesFilter,
  isWithoutImplementation,
  setSitesFilter,
  setIsWithoutImplementation,
}) => {
  const isAllChecked =
    isWithoutImplementation &&
    Object.keys(sitesFilter).every(site => sitesFilter[site]);

  const isAllUnchecked =
    !isWithoutImplementation &&
    Object.keys(sitesFilter).every(site => !sitesFilter[site]);

  const handleAllChange = () => {
    const allSitesFilter: { [site: string]: boolean } = Object.keys(
      sitesFilter,
    ).reduce(
      (acc: { [site: string]: boolean }, site: string) => ({
        ...acc,
        [site]: !isAllChecked,
      }),
      [],
    );

    setSitesFilter(allSitesFilter);
    setIsWithoutImplementation(!isAllChecked);
  };

  const handleFilterChange = ({
    target: { id: title },
  }: {
    target: { id: string };
  }) => {
    if (title === WITHOUT_IMPLEMENTATION) {
      setIsWithoutImplementation(!isWithoutImplementation);
      return;
    }

    setSitesFilter({
      ...sitesFilter,
      [title]: !sitesFilter[title],
    });
  };

  return (
    <>
      <input
        type="checkbox"
        id={ALL}
        onChange={handleAllChange}
        checked={!isAllUnchecked}
      />
      <Label htmlFor={ALL}>{ALL}</Label>
      {sitesConfig.map(({ title, icon, siteUrl }) => (
        <div key={title}>
          <input
            type="checkbox"
            id={title}
            onChange={handleFilterChange}
            checked={sitesFilter[title]}
          />
          {siteUrl ? <a href={siteUrl}>{icon}</a> : icon}
          <Label htmlFor={title}>{title}</Label>
        </div>
      ))}
      <input
        type="checkbox"
        id={WITHOUT_IMPLEMENTATION}
        onChange={handleFilterChange}
        checked={isWithoutImplementation}
      />
      <Label htmlFor={WITHOUT_IMPLEMENTATION}>{WITHOUT_IMPLEMENTATION}</Label>
    </>
  );
};
