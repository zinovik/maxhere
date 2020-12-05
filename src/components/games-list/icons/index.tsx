import React from 'react';
import styled from 'styled-components';
import boargamearenaIcon from './boargamearena.jpg';
import yucataIcon from './yucata.jpg';
import boiteajeuxIcon from './boiteajeux.jpg';
import mattleIcon from './mattle.png';
import brettspielweltIcon from './brettspielwelt.jpg';
import happyMeeple from './happymeeple.png';
import tabletopiaIcon from './tabletopia.png';
import tabletopSimulatorIcon from './tabletopsimulator.png';
import androidIcon from './android.svg';
import iosIcon from './ios.png';
import steamIcon from './steam.png';
import desktopIcon from './desktop.png';
import webIcon from './web.webp';

const Img = styled.img`
  max-height: 20px;
  max-width: 20px;
  margin-left: 2px;
  margin-right: 2px;
  margin-bottom: 0;
`;

export const icons = {
  BOARDGAMEARENA: <Img src={boargamearenaIcon} />,
  YUCATA: <Img src={yucataIcon} />,
  BOITEAJEUX: <Img src={boiteajeuxIcon} />,
  MATTLE: <Img src={mattleIcon} />,
  BRETTSPIELWELT: <Img src={brettspielweltIcon} />,
  HAPPYMEEPLE: <Img src={happyMeeple} />,
  TABLETOPIA: <Img src={tabletopiaIcon} />,
  TABLETOP_SIMULATOR: <Img src={tabletopSimulatorIcon} />,
  ANDROID: <Img src={androidIcon} />,
  IOS: <Img src={iosIcon} />,
  STEAM: <Img src={steamIcon} />,
  DESKTOP: <Img src={desktopIcon} />,
  WEB: <Img src={webIcon} />,
};
