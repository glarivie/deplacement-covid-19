import React from 'react';

const Reasons = () => {


  return (
    <fieldset>
      <legend className="titre-3">Choisissez le ou les motif(s) de sortie</legend>
      <div className="form-check">
        <input className="form-check-input" type="checkbox" name="field-reason" id="checkbox-travail" value="travail" />
        <label className="form-check-label" htmlFor="checkbox-travail">Déplacements entre le domicile et le lieu d’exercice de l’activité professionnelle, lorsqu'ils sont indispensables à l'exercice d’activités ne pouvant être organisées sous forme de télétravail ou déplacements professionnels ne pouvant être différés.</label>
      </div>

      <div className="form-check">
        <input className="form-check-input" type="checkbox" name="field-reason" id="checkbox-courses" value="courses" />
        <label className="form-check-label" htmlFor="checkbox-courses">Déplacements pour effectuer des achats de fournitures nécessaires à l’activité professionnelle et des achats de première nécessité dans des établissements dont les activités demeurent autorisées (<a href="https://www.service-public.fr/particuliers/actualites/A13921" className="stores-link" title="Liste des commerces et établissements qui restent ouverts - nouvelle page" target="_blank" rel="noopener noreferrer">liste des commerces et établissements qui restent ouverts</a>).</label>
      </div>

      <div className="form-check">
        <input className="form-check-input" type="checkbox" name="field-reason" id="checkbox-sante" value="sante" />
        <label className="form-check-label" htmlFor="checkbox-sante">Consultations et soins ne pouvant être assurés à distance et ne pouvant être différés ; consultations et soins des patients atteints d'une affection de longue durée.</label>
      </div>

      <div className="form-check">
        <input className="form-check-input" type="checkbox" name="field-reason" id="checkbox-famille" value="famille" />
        <label className="form-check-label" htmlFor="checkbox-famille">Déplacements pour motif familial impérieux, pour l’assistance aux personnes vulnérables ou la garde d’enfants.</label>
      </div>

      <div className="form-check">
        <input className="form-check-input" type="checkbox" name="field-reason" id="checkbox-sport" value="sport" />
        <label className="form-check-label" htmlFor="checkbox-sport">Déplacements brefs, dans la limite d'une heure quotidienne et dans un rayon maximal d'un kilomètre autour du domicile, liés soit à l'activité physique individuelle des personnes, à l'exclusion de toute pratique sportive collective et de toute proximité avec d'autres personnes, soit à la promenade avec les seules personnes regroupées dans un même domicile, soit aux besoins des animaux de compagnie.</label>
      </div>
      <div className="form-check">
        <input className="form-check-input" type="checkbox" name="field-reason" id="checkbox-judiciaire" value="judiciaire" />
        <label className="form-check-label" htmlFor="checkbox-judiciaire">Convocation judiciaire ou administrative.</label>
      </div>
      <div className="form-check">
        <input className="form-check-input" type="checkbox" name="field-reason" id="checkbox-missions" value="missions" />
        <label className="form-check-label" htmlFor="checkbox-missions">Participation à des missions d’intérêt général sur demande de l’autorité administrative.</label>
      </div>
    </fieldset>
  );
};

export default Reasons;
