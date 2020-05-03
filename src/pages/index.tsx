import React, { Fragment } from 'react';
import { useMount } from 'react-use';

import Header from 'components/Header';
import FormGroup from 'components/FormGroup';
import Reasons from 'components/Reasons';
import Credits from 'components/Credits';
import Footer from 'components/Footer';

import useCachedState from 'hooks/useCachedState';
import { pad, getFormattedDate } from 'helpers/certificate';

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'styles/shared/main.scss';

const Homepage = () => {
  const [, setCachedState] = useCachedState();

  useMount(() => {
    const loadedDate = new Date();
    const hour = pad(loadedDate.getHours());
    const minute = pad(loadedDate.getMinutes());

    return setCachedState({
      date: getFormattedDate(loadedDate),
      time: `${hour}:${minute}`,
    });
  });

  return (
    <Fragment>
      <Header />
      <main role="main">
        <p className="alert  alert-danger  d-none" role="alert" id="alert-facebook"></p>
        <div className="wrapper">
          <form id="form-profile" acceptCharset="UTF-8">
            <h2 className="titre-2">Remplissez en ligne votre attestation numérique :</h2>
            <p className="text-alert">Tous les champs sont obligatoires.</p>

            <FormGroup
              label="Prénom"
              name="firstname"
              autoComplete="given-name"
              placeholder="Jean"
              autoFocus
            />

            <FormGroup
              label="Nom"
              name="lastname"
              autoComplete="family-name"
              placeholder="Dupont"
              aria-invalid="false"
              autoFocus
            />

            <FormGroup
              label="Date de naissance (au format jj/mm/aaaa)"
              pattern="^([0][1-9]|[1-2][0-9]|30|31)\/([0][1-9]|10|11|12)\/(19[0-9][0-9]|20[0-1][0-9]|2020)"
              inputMode="numeric"
              name="birthday"
              autoComplete="bday"
              placeholder="01/01/1970"
              maxLength={10}
            />

            <FormGroup
              label="Lieu de naissance"
              name="birthplace"
              autoComplete="off"
              placeholder="Lyon"
            />

            <FormGroup
              label="Adresse"
              name="address"
              autoComplete="address-line1"
              placeholder="999 avenue de france"
            />

            <FormGroup
              label="Ville"
              name="town"
              autoComplete="address-level2"
              placeholder="Paris"
            />

            <FormGroup
              label="Code Postal"
              inputMode="numeric"
              pattern="[0-9]{5}"
              min="00000"
              max="99999"
              name="zipcode"
              autoComplete="postal-code"
              minLength={4}
              maxLength={5}
              placeholder="75001"
            />

            <Reasons />

            <FormGroup
              label="Date de sortie"
              type="date"
              name="date"
              autoComplete="off"
              placeholder="JJ/MM/YYYY"
            />

            <FormGroup
              label="Heure de sortie"
              type="time"
              name="time"
              autoComplete="off"
            />


            <p className="text-center mt-5">
              <button type="button" id="generate-btn" className="btn btn-primary btn-attestation">
                <span>
                  <i className="fa fa-file-pdf inline-block mr-1"></i>  Générer mon attestation
                </span>
              </button>
            </p>

            <div className="bg-primary  d-none" id="snackbar">
              L'attestation est téléchargée sur votre appareil.
            </div>
          </form>
        </div>
        <Credits />
      </main>
      <Footer />
    </Fragment>
  );
};

export default Homepage;
