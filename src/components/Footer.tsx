import React from 'react';

const Footer = () => (
  <footer role="contentinfo" className="main-footer">
    <div className="footer-links">
      <a href="./confidentialite.html" title="Confidentialité - nouvelle page" target="_blank" className="footer-line footer-link">Confidentialité</a>
      <a href="https://www.interieur.gouv.fr/Infos-du-site/Mentions-legales" title="Mentions légales - nouvelle page" rel="noopener noreferrer" target="_blank" className="footer-line footer-link">Mentions légales</a>
      <a href="https://www.gouvernement.fr/info-coronavirus" title="Information du gouvernement sur le Covid-19 - nouvelle page" rel="noopener noreferrer" target="_blank" className="footer-line footer-link">Informations du gouvernement sur le Covid-19</a>
      <div className="footer-line" >Plus d’infos au <a className="num-08" href="tel:0800130000" title="Numéro vert - appel gratuit depuis un poste fixe en France">0 800 130 000</a></div>
      <p className="footer-line" id="version"></p>
    </div>
  </footer>
);

export default Footer;
