import Wrapper1180 from "@/app/components/wrapper/wrapper-1180";
import FormSection from "./form";

// Enable ISR - revalidate every 2 hours for contact page
export const revalidate = 7200;

export default function CarrieresPage() {
  return (
    <section className="w-full pt-5 px-4">
      <div
        className="f-col max-tablet:p-6 max-tablet:h-[224px] max-tablet:justify-end gap-3 pt-[140px] pb-12 px-10 m-auto max-w-[1260px] w-full rounded-[20px]
        bg-Sage-Gray-Lowest bg-[url('/Contact-Support-overlay-1.png')] bg-cover bg-no-repeat bg-blend-multiply"
      >
        <h1 className="text-Primary-800 Headings-H1">Contact & Support</h1>
        <p className="text-Sage-Gray-High Text-M max-w-[550px]">
          Qu’il s’agisse d’un devis, d’une question ou d’un sinistre, notre
          équipe est disponible pour vous répondre rapidement.
        </p>
      </div>
      <Wrapper1180 className="pt-[132px] gap-12 max-tablet:gap-5 max-tablet:py-6">
        <h2 className="text-Neutral-Dark Headings-H2 ">
          Besoin d’aide ? <br /> Contactez-nous directement
        </h2>
        <div className="flex max-tablet:flex-col items-start gap-5">
          <FormSection />

          <div className="f-col max-tablet:max-w-full gap-6 max-w-[380px] w-full max-mobile:py-4 max-mobile:px-5 py-6 px-7 rounded-2xl bg-Sage-Gray-Lowest">
            <div className="flex justify-between">
              <h4 className="text-Neutral-Dark text-[18px]/tight font-medium max-w-[200px]">
                Comment nous contacter autrement ?
              </h4>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
              >
                <path
                  d="M10.6693 13.6673C10.9383 13.6673 11.196 13.7758 11.3841 13.9681C11.5723 14.1607 11.6756 14.4216 11.6693 14.6908V14.6934C11.6631 14.9586 11.5514 15.2108 11.3594 15.3939C11.1675 15.5768 10.9108 15.6761 10.6458 15.6699H10.6432C10.1004 15.6569 9.66667 15.2129 9.66667 14.6699V14.6673C9.66668 14.1151 10.1144 13.6673 10.6667 13.6673H10.6693Z"
                  fill="#0F110C"
                />
                <path
                  d="M16.0026 13.6673C16.2716 13.6673 16.5293 13.7758 16.7175 13.9681C16.9056 14.1607 17.0089 14.4216 17.0026 14.6908V14.6934C16.9964 14.9586 16.8847 15.2108 16.6927 15.3939C16.5009 15.5768 16.2442 15.6761 15.9792 15.6699H15.9766C15.4338 15.6569 15 15.2129 15 14.6699V14.6673C15 14.1151 15.4477 13.6673 16 13.6673H16.0026Z"
                  fill="#0F110C"
                />
                <path
                  d="M21.3359 13.6673C21.605 13.6673 21.8627 13.7758 22.0508 13.9681C22.2389 14.1607 22.3422 14.4216 22.3359 14.6908V14.6934C22.3297 14.9586 22.218 15.2108 22.026 15.3939C21.8342 15.5768 21.5775 15.6761 21.3125 15.6699H21.3099C20.7671 15.6569 20.3333 15.2129 20.3333 14.6699V14.6673C20.3333 14.1151 20.7811 13.6673 21.3333 13.6673H21.3359Z"
                  fill="#0F110C"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M23.7331 4.33399C24.4633 4.33399 25.0718 4.33262 25.5664 4.37305C26.0727 4.41446 26.5479 4.50472 26.9974 4.73373C27.686 5.08463 28.2482 5.64459 28.6003 6.33529C28.8292 6.78468 28.9196 7.26038 28.9609 7.76628C29.0013 8.2606 29 8.86823 29 9.59701V19.7389C29 20.4676 29.0013 21.0743 28.9609 21.5684C28.9196 22.0741 28.8291 22.5488 28.6003 22.9981C28.2488 23.6878 27.6875 24.2493 26.9974 24.6009C26.5482 24.8297 26.0734 24.9202 25.5677 24.9616C25.0734 25.002 24.4658 25.0007 23.737 25.0007H12.1628C11.5681 25.0007 11.4098 25.0052 11.2669 25.0345C11.1189 25.0649 10.9763 25.1152 10.8438 25.1829C10.7166 25.248 10.5923 25.3416 10.138 25.7051C10.133 25.7091 10.1275 25.7129 10.1224 25.7168L8.09115 27.3418C7.55198 27.7731 7.09371 28.1408 6.71094 28.3939C6.34371 28.6367 5.87877 28.8932 5.33594 28.8939C4.62525 28.8946 3.95235 28.5703 3.50912 28.015C3.17091 27.5908 3.08018 27.0678 3.04037 26.6296C3.01967 26.4014 3.01015 26.1407 3.00521 25.8509L3.00001 24.8952V9.60092C3.00001 8.87068 2.99864 8.26254 3.03907 7.76758C3.08045 7.26107 3.17061 6.78499 3.39975 6.33529C3.75123 5.64567 4.31169 5.08521 5.00131 4.73373C5.451 4.5046 5.92709 4.41443 6.4336 4.37305C6.92856 4.33263 7.53669 4.33399 8.26693 4.33399H23.7331ZM8.26693 6.33399C7.50371 6.33399 6.99102 6.33431 6.59636 6.36654C6.21355 6.39782 6.03083 6.45482 5.91016 6.51628C5.59656 6.67607 5.34209 6.93055 5.1823 7.24415C5.12083 7.36481 5.06384 7.54753 5.03256 7.93034C5.00032 8.325 5.00001 8.8377 5.00001 9.60092V24.8952L5.00391 25.8171C5.00807 26.0708 5.01694 26.2763 5.03256 26.4486C5.05144 26.6564 5.0773 26.7509 5.08724 26.7819C5.14533 26.8463 5.22488 26.8842 5.3112 26.89C5.33979 26.8792 5.43017 26.8435 5.60808 26.7259C5.89687 26.535 6.27103 26.2367 6.84115 25.7806L8.8737 24.1543L8.88803 24.1426C9.28056 23.8285 9.584 23.5803 9.9336 23.4017C10.2288 23.2509 10.5434 23.1411 10.8659 23.0749C11.2534 22.9954 11.6483 23.0007 12.1628 23.0007H23.737C24.4987 23.0007 25.011 23.0003 25.405 22.9681C25.7866 22.9369 25.9694 22.881 26.0898 22.8197C26.4033 22.66 26.6592 22.4042 26.819 22.0905C26.8804 21.97 26.9362 21.7872 26.9675 21.4056C26.9996 21.012 27 20.5006 27 19.7389V9.59701C27 8.83525 26.9996 8.32302 26.9675 7.92904C26.9362 7.54739 26.8803 7.36458 26.819 7.24415C26.6599 6.93189 26.4042 6.67664 26.0898 6.51628C25.969 6.45473 25.7857 6.39781 25.4037 6.36654C25.0094 6.33432 24.4963 6.33399 23.7331 6.33399H8.26693Z"
                  fill="#0F110C"
                />
              </svg>
            </div>
            <address className="not-italic">
              <ul className="flex flex-col gap-6 max-mobile:gap-3">
                <li className="flex flex-col gap-1">
                  <h6 className="text-Sage-Gray-High text-base font-medium">
                    Par téléphone :
                  </h6>
                  <a
                    href="tel:+212644562456"
                    className="text-Neutral-Dark font-semibold hover:text-Sage-Gray-High transition-colors"
                  >
                    05222-70343
                  </a>
                </li>

                <li className="flex flex-col gap-1">
                  <h6 className="text-Sage-Gray-High text-base font-medium">
                    Par email :
                  </h6>
                  <a
                    href="mailto:contact@monassurance.ma"
                    className="text-Neutral-Dark font-semibold hover:text-Sage-Gray-High transition-colors"
                  >
                    contact@trtbroker.com
                  </a>
                </li>

                <li className="flex flex-col gap-1">
                  <h6 className="text-Sage-Gray-High text-base font-medium">
                    En agence :
                  </h6>
                  <a
                    href="https://maps.app.goo.gl/YaKiKsp3CHjjtaDT9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-Neutral-Dark font-semibold hover:text-Sage-Gray-High transition-colors"
                  >
                    N°33 IMM SEMIRAMI, ANGLE RUES FAKER MOHAMED ET KAMAL
                    MOHAMED, Casablanca 23000
                  </a>
                </li>
              </ul>
            </address>
          </div>
        </div>
      </Wrapper1180>
    </section>
  );
}
