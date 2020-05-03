import React from 'react';

import darkBannerSVG from 'assets/MIN_Interieur_RVB_dark.svg';
import lightBannerSVG from 'assets/MIN_Interieur_RVB.svg';

const Header = () => (
  <header role="banner" className="wrapper">
    <picture>
      <source
        srcSet={darkBannerSVG}
        media="(prefers-color-scheme: dark)"
      />
      <img
        src={lightBannerSVG}
        alt="Ministère de l'intérieur. Liberté, égalité, fraternité."
        className="logo"
        role="presentation"
        aria-hidden="true"
      />
    </picture>

    <div>
      <h1 className="flex flex-wrap">
        <span className="covid-title">
          COVID-19
        </span>
        <span className="covid-subtitle">
          Générateur d'attestation de déplacement dérogatoire
        </span>
      </h1>
      <p className="text-alert">
        Les données saisies sont stockées exclusivement sur votre téléphone ou votre ordinateur. Aucune information n'est collectée par le Ministère de l'Intérieur.
        L'attestation pdf générée contient un QR Code. Ce code-barres graphique permet de lire les informations portées dans votre attestation au moment de leur saisie.
        Il peut être déchiffré à l'aide de tout type de lecteur de QR code générique.
      </p>
    </div>
  </header>
);

export default Header;
