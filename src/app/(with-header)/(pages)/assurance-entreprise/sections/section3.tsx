import CheckIcon from "@/app/components/icons/check-mark-gray";
import SectionHeader from "@/app/components/mini-sections/sec-header";
import Wrapper1180 from "@/app/components/wrapper/wrapper-1180";
import type { SVGProps } from "react";

// Generic dashed line component
function StepLine({
  height,
  gradientId,
}: { height: number; gradientId: string } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="4"
      height={height}
      viewBox={`0 0 4 ${height}`}
      fill="none"
    >
      <path
        d={`M2 2L2 ${height - 2}`}
        stroke={`url(#${gradientId})`}
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="1 7"
      />
      <defs>
        <linearGradient
          id={gradientId}
          x1="1.5"
          y1="2"
          x2="1.50001"
          y2={height - 2}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#375299" />
          <stop offset="1" stopColor="#EDF0F5" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// Step icons
function Step1Icon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.9999 20C10.9999 18.8181 11.2327 17.6478 11.685 16.5558C12.1373 15.4639 12.8002 14.4718 13.6359 13.636C14.4716 12.8003 15.4638 12.1374 16.5557 11.6851C17.6477 11.2328 18.818 11 19.9999 11C21.1818 11 22.3521 11.2328 23.444 11.6851C24.536 12.1374 25.5281 12.8003 26.3638 13.636C27.1996 14.4718 27.8625 15.4639 28.3148 16.5558C28.7671 17.6478 28.9999 18.8181 28.9999 20C28.9999 22.3869 28.0517 24.6761 26.3638 26.364C24.676 28.0518 22.3868 29 19.9999 29C17.6129 29 15.3237 28.0518 13.6359 26.364C11.9481 24.6761 10.9999 22.3869 10.9999 20ZM19.9999 5C17.6609 5.00025 15.3543 5.54748 13.2645 6.598C11.1747 7.64851 9.35951 9.17319 7.96394 11.0502C6.56838 12.9273 5.63111 15.1047 5.22702 17.4085C4.82292 19.7124 4.96319 22.0788 5.63663 24.3187C6.31007 26.5587 7.49801 28.6101 9.10555 30.3092C10.7131 32.0082 12.6957 33.3078 14.895 34.104C17.0943 34.9003 19.4493 35.1712 21.772 34.8951C24.0946 34.6191 26.3205 33.8036 28.2719 32.514L37.8779 42.122C38.4407 42.6848 39.204 43.001 39.9999 43.001C40.7958 43.001 41.5591 42.6848 42.1219 42.122C42.6847 41.5592 43.0008 40.7959 43.0008 40C43.0008 39.2041 42.6847 38.4408 42.1219 37.878L32.5139 28.272C34.0084 26.0112 34.8626 23.3877 34.9855 20.6804C35.1084 17.973 34.4956 15.283 33.212 12.896C31.9285 10.5091 30.0223 8.51448 27.6959 7.12418C25.3696 5.73387 22.71 4.99981 19.9999 5Z"
        fill="#375299"
      />
    </svg>
  );
}
function Step2Icon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
    >
      <path
        d="M20 0C21.792 0 23.528 0.236 25.18 0.678L20.928 4.928C20.6054 5.25186 20.3209 5.61153 20.08 6H20C17.2311 6 14.5243 6.82109 12.222 8.35943C9.91973 9.89777 8.12531 12.0843 7.06569 14.6424C6.00606 17.2006 5.72881 20.0155 6.26901 22.7313C6.8092 25.447 8.14257 27.9416 10.1005 29.8995C12.0584 31.8574 14.553 33.1908 17.2687 33.731C19.9845 34.2712 22.7994 33.9939 25.3576 32.9343C27.9157 31.8747 30.1022 30.0803 31.6406 27.778C33.1789 25.4757 34 22.7689 34 20V19.92C34.3867 19.68 34.7433 19.3967 35.07 19.07L39.322 14.82C39.764 16.472 40 18.208 40 20C40 31.046 31.046 40 20 40C8.954 40 0 31.046 0 20C0 8.954 8.954 0 20 0ZM19.172 10.034C19.172 11.736 19.088 13.462 19.18 15.162L18.1 16.242C17.7285 16.6135 17.4338 17.0546 17.2327 17.54C17.0317 18.0254 16.9282 18.5456 16.9282 19.071C16.9282 19.5964 17.0317 20.1166 17.2327 20.602C17.4338 21.0874 17.7285 21.5285 18.1 21.9C18.4715 22.2715 18.9126 22.5662 19.398 22.7673C19.8834 22.9683 20.4036 23.0718 20.929 23.0718C21.4544 23.0718 21.9746 22.9683 22.46 22.7673C22.9454 22.5662 23.3865 22.2715 23.758 21.9L24.838 20.82C26.538 20.912 28.262 20.828 29.966 20.828C29.808 22.7287 29.1098 24.5445 27.9537 26.0614C26.7975 27.5783 25.2317 28.7329 23.4409 29.3891C21.6501 30.0453 19.709 30.1757 17.8466 29.7649C15.9841 29.3541 14.2779 28.4193 12.9293 27.0707C11.5807 25.7221 10.6459 24.0159 10.2351 22.1534C9.82429 20.291 9.95468 18.3499 10.6109 16.5591C11.2671 14.7683 12.4217 13.2025 13.9386 12.0463C15.4555 10.8902 17.2713 10.192 19.172 10.034ZM33.008 0.254C33.3731 0.405358 33.6851 0.661474 33.9047 0.990019C34.1243 1.31856 34.2417 1.70481 34.242 2.1V5.76H37.9C38.2955 5.76008 38.6821 5.87743 39.0109 6.0972C39.3397 6.31697 39.596 6.62929 39.7474 6.99469C39.8987 7.36009 39.9383 7.76216 39.8612 8.15006C39.784 8.53797 39.5936 8.8943 39.314 9.174L32.24 16.24C31.865 16.6151 31.3564 16.8259 30.826 16.826H26L22.344 20.484C21.9687 20.8593 21.4597 21.0701 20.929 21.0701C20.3983 21.0701 19.8893 20.8593 19.514 20.484C19.1387 20.1087 18.9279 19.5997 18.9279 19.069C18.9279 18.5383 19.1387 18.0293 19.514 17.654L23.172 14V9.172C23.1718 8.90904 23.2234 8.64862 23.324 8.40565C23.4246 8.16267 23.572 7.94191 23.758 7.756L30.828 0.686C31.1077 0.406135 31.4641 0.215517 31.8522 0.138263C32.2402 0.0610088 32.6425 0.10059 33.008 0.252"
        fill="#375299"
      />
    </svg>
  );
}
function Step3Icon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
    >
      <g clipPath="url(#clip0_6130_134402)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M24 4C12.954 4 4 12.954 4 24C4 35.046 12.954 44 24 44C35.046 44 44 35.046 44 24C44 12.954 35.046 4 24 4ZM15.516 23.992C15.8911 24.3669 16.3997 24.5776 16.93 24.5776C17.4603 24.5776 17.9689 24.3669 18.344 23.992L22 20.334V32.486C22 33.0164 22.2107 33.5251 22.5858 33.9002C22.9609 34.2753 23.4696 34.486 24 34.486C24.5304 34.486 25.0391 34.2753 25.4142 33.9002C25.7893 33.5251 26 33.0164 26 32.486V20.334L29.658 23.992C30.0333 24.367 30.5422 24.5776 31.0727 24.5774C31.6032 24.5772 32.112 24.3663 32.487 23.991C32.862 23.6157 33.0726 23.1068 33.0724 22.5763C33.0722 22.0458 32.8613 21.537 32.486 21.162L25.414 14.092C25.0389 13.7171 24.5303 13.5064 24 13.5064C23.4697 13.5064 22.9611 13.7171 22.586 14.092L15.516 21.16C15.33 21.3457 15.1825 21.5663 15.0819 21.8091C14.9812 22.0519 14.9294 22.3122 14.9294 22.575C14.9294 22.8378 14.9812 23.0981 15.0819 23.3409C15.1825 23.5837 15.33 23.8043 15.516 23.99V23.992Z"
          fill="#375299"
        />
      </g>
      <defs>
        <clipPath id="clip0_6130_134402">
          <rect width="48" height="48" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
function Step4Icon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="38"
      viewBox="0 0 40 38"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.9301 0.618071C15.5318 0.326575 15.0681 0.137147 14.5796 0.0663686C14.0912 -0.00441021 13.5928 0.0456168 13.1281 0.212071C10.9555 1.0084 8.93756 2.17572 7.16411 3.66207C6.78841 3.98104 6.49649 4.38712 6.31381 4.84485C6.13114 5.30259 6.06326 5.79807 6.11611 6.28807C6.26611 7.79407 6.00011 9.24807 5.27611 10.5001C4.55411 11.7541 3.42611 12.7121 2.04611 13.3341C1.5947 13.5338 1.19914 13.8412 0.894057 14.2293C0.588973 14.6173 0.383666 15.0743 0.296108 15.5601C-0.101307 17.8362 -0.101307 20.164 0.296108 22.4401C0.482108 23.5141 1.21611 24.2921 2.04611 24.6681C3.42611 25.2881 4.55411 26.2481 5.27811 27.5001C6.00011 28.7541 6.26611 30.2061 6.11611 31.7121C6.02611 32.6161 6.33011 33.6401 7.16411 34.3381C8.93756 35.8244 10.9555 36.9917 13.1281 37.7881C13.5925 37.9542 14.0905 38.004 14.5786 37.9333C15.0667 37.8625 15.53 37.6732 15.9281 37.3821C17.1581 36.4981 18.5521 36.0001 20.0001 36.0001C21.4481 36.0001 22.8401 36.4981 24.0701 37.3821C24.8101 37.9141 25.8501 38.1621 26.8721 37.7881C29.0447 36.9917 31.0627 35.8244 32.8361 34.3381C33.6701 33.6401 33.9761 32.6181 33.8841 31.7121C33.7341 30.2061 33.9981 28.7521 34.7241 27.5001C35.4461 26.2461 36.5741 25.2901 37.9541 24.6681C38.7821 24.2941 39.5181 23.5141 39.7041 22.4401C40.1015 20.164 40.1015 17.8362 39.7041 15.5601C39.6165 15.0743 39.4112 14.6173 39.1062 14.2293C38.8011 13.8412 38.4055 13.5338 37.9541 13.3341C36.5741 12.7121 35.4461 11.7541 34.7221 10.5001C33.9981 9.24807 33.7341 7.79407 33.8841 6.28807C33.937 5.79807 33.8691 5.30259 33.6864 4.84485C33.5037 4.38712 33.2118 3.98104 32.8361 3.66207C31.0627 2.17572 29.0447 1.0084 26.8721 0.212071C26.4077 0.0459639 25.9097 -0.00388034 25.4216 0.0668936C24.9335 0.137668 24.4702 0.326906 24.0721 0.618071C22.8401 1.50007 21.4461 2.00007 20.0001 2.00007C18.5541 2.00007 17.1601 1.50207 15.9301 0.618071ZM14.0001 19.0001C14.0001 17.4088 14.6322 15.8826 15.7575 14.7574C16.8827 13.6322 18.4088 13.0001 20.0001 13.0001C21.5914 13.0001 23.1175 13.6322 24.2428 14.7574C25.368 15.8826 26.0001 17.4088 26.0001 19.0001C26.0001 20.5914 25.368 22.1175 24.2428 23.2427C23.1175 24.3679 21.5914 25.0001 20.0001 25.0001C18.4088 25.0001 16.8827 24.3679 15.7575 23.2427C14.6322 22.1175 14.0001 20.5914 14.0001 19.0001Z"
        fill="#375299"
      />
    </svg>
  );
}

// Step point
const StepPoint = ({ text }: { text: string }) => (
  <li className="flex gap-2 items-center">
    <CheckIcon
      className="bg-Secondary-Blue-Lowest"
      color="var(--color-Secondary-Blue-Medium)"
    />
    <span className="text-Neutral-Dark Text-S">{text}</span>
  </li>
);

// Step item
type StepItemProps = {
  stepNumber: string;
  title: string;
  Icon: React.ComponentType<SVGProps<SVGSVGElement>>;
  LineIcon: React.ComponentType<SVGProps<SVGSVGElement>>;
  points: string[];
};

const StepItem = ({
  stepNumber,
  title,
  Icon,
  LineIcon,
  points,
}: StepItemProps) => (
  <li className="flex gap-3 max-tablet:gap-2">
    <div className="f-col items-center gap-2 max-tablet:gap-3">
      <span className="text-Secondary-Blue-Medium z-10 text-center Headings-H4">
        {stepNumber}
      </span>
      <LineIcon />
    </div>
    <div className="f-col flex-1 gap-4">
      <div className="flex justify-between">
        <h3 className="text-Neutral-Dark Headings-H4">{title}</h3>
        <span className="flex-center p-2 max-tablet:p-1 rounded-2xl bg-Secondary-Blue-Lowest">
          <Icon className="max-tablet:w-9 max-tablet:h-9" />
        </span>
      </div>
      <ul className="f-col gap-4 pb-9">
        {points.map((point, i) => (
          <StepPoint key={i} text={point} />
        ))}
      </ul>
    </div>
  </li>
);

// Section3
export default function Section3() {
  const steps = [
    {
      stepNumber: "01.",
      title: "Analyse complète",
      Icon: Step1Icon,
      LineIcon: (props: SVGProps<SVGSVGElement>) => (
        <StepLine {...props} height={290} gradientId="line1" />
      ),
      points: [
        "Ciblage précis de vos besoins",
        "Évaluation des mesures de prévention existantes",
        "Audit des contrats et garanties en place",
        "Étude détaillée de la sinistralité",
        "Cartographie des risques & diagnostic technique",
        "Construction d’une stratégie d’assurance personnalisée",
      ],
    },
    {
      stepNumber: "02.",
      title: "Consultation ciblée",
      Icon: Step2Icon,
      LineIcon: (props: SVGProps<SVGSVGElement>) => (
        <StepLine {...props} height={216} gradientId="line2" />
      ),
      points: [
        "Élaboration d’un cahier des charges précis",
        "Sélection rigoureuse des assureurs pertinents",
        "Lancement d’une consultation performante",
        "Analyse comparative et benchmark des offres",
      ],
    },
    {
      stepNumber: "03.",
      title: "Mise en place",
      Icon: Step3Icon,
      LineIcon: (props: SVGProps<SVGSVGElement>) => (
        <StepLine {...props} height={179} gradientId="line3" />
      ),
      points: [
        "Évaluation des assureurs via scoring",
        "Conseils stratégiques d’optimisation",
        "Signature et déploiement des contrats",
      ],
    },
    {
      stepNumber: "04.",
      title: "Gestion des sinistres",
      Icon: Step4Icon,
      LineIcon: (props: SVGProps<SVGSVGElement>) => (
        <StepLine {...props} height={216} gradientId="line4" />
      ),
      points: [
        "Intervention rapide pour la prise en charge",
        "Accompagnement pour limiter vos pertes",
        "Suivi expert et transparent des dossiers",
        "Maximisation de vos indemnités",
      ],
    },
  ];

  return (
    <section className="flex w-full px-4 bg-[linear-gradient(180deg,_#FFF_0%,_var(--color-Secondary-Blue-Lowest)_100%)]">
      <Wrapper1180 className="max-mobile:py-16 max-mobile:gap-12 items-center py-[132px]">
        <div className="flex max-tablet:flex-col max-tablet:gap-12 gap-5 w-full">
          <SectionHeader
            className="items-start flex-1 h-fit sticky top-[88px] max-tablet:static"
            badgeText="4 étapes essentielles"
            heading="Notre approche dédiée aux entreprises"
            headingClassName="max-w-[490px] w-full text-left"
          />
          <ul className="f-col gap-4 flex-1">
            {steps.map((step, i) => (
              <StepItem key={i} {...step} />
            ))}
          </ul>
        </div>
      </Wrapper1180>
    </section>
  );
}
