import React from 'react';

const FormFooter = () => {
    return (
      <div className="flex max-tablet:px-4 flex-center flex-col w-full py-4 gap-1 bg-white text-center">
        <p className="text-Text-Body Button2-XS">
          * Simulation non contractuelle, donnée à titre indicatif.
        </p>
        <p className="text-Text-Body Button2-XS max-w-[550px]">
          Pour en savoir plus sur la gestion de vos données personnelles et pour
          exercer vos droits, référez-vous à nos mentions légales et notre
          charte relative aux données personnelles et cookies.
        </p>
      </div>
    );
}

export default FormFooter;
