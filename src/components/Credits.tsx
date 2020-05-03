import React from 'react';

import logo_dnum from 'assets/logo_dnum.svg';
import logo_dnum_dark from 'assets/logo_dnum_dark.svg';

const Credits = () => (
  <div className="">
    <p className="github">
      Le code source de ce service est consultable sur <a href="https://github.com/glarivie/deplacement-covid-19" className="github-link">GitHub</a>.
    </p>
    <p className="label-mi">
      Ministère de l'Intérieur - DNUM - SDIT
    </p>
    <picture className="center">
      <source srcSet={logo_dnum_dark} media="(prefers-color-scheme: dark)" />
      <img className="center" src={logo_dnum} alt="logo dnum" />
    </picture>
  </div>
);

export default Credits;
