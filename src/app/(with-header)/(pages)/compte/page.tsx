"use client";

import Link from "next/link";
import { SVGProps, useState } from "react";
import { useRouter } from "next/navigation";
import InfoPersonnellesForm from "./form/Info-personnelles";
import { IconSearch } from "@/app/components/header/components/head-desktop";
import { IconSearchClear } from "@/app/components/popup/PopupSearch";
import PopupCompteAssurance from "@/app/components/popup/PopupCompteAssurance";
import PopupSupprimerCompte from "@/app/components/popup/PopupSupprimerCompte";
import { usePopup } from "@/app/components/popup/PopupContext";
import AuthGuard from "@/app/components/auth/AuthGuard";
import { useAuth } from "@/app/components/auth/AuthContext";

export function IconProfile(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width={112}
      height={112}
      viewBox="0 0 112 112"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M56 70C44.6833 70 34.3615 73.8331 26.7969 79.2604C30.2911 83.6527 34.7336 87.2006 39.7897 89.6374C44.846 92.0739 50.3873 93.3369 56 93.3333C61.6127 93.3369 67.1541 92.0739 72.2103 89.6374C77.2664 87.2006 81.7089 83.6527 85.2031 79.2604C77.6385 73.8331 67.3167 70 56 70Z"
        fill="url(#paint0_linear_10332_45289)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M56.0003 28C53.8554 28 51.7294 28.4233 49.7477 29.2441C47.7669 30.0649 45.9683 31.269 44.4521 32.7852C42.936 34.3013 41.7319 36.0999 40.9111 38.0807C40.0903 40.0624 39.667 42.1884 39.667 44.3333C39.667 48.6652 41.3891 52.8184 44.4521 55.8815C47.5152 58.9446 51.6685 60.6667 56.0003 60.6667C60.3322 60.6667 64.4854 58.9446 67.5485 55.8815C70.6116 52.8184 72.3337 48.6652 72.3337 44.3333C72.3337 42.1884 71.9103 40.0624 71.0895 38.0807C70.2687 36.0999 69.0647 34.3013 67.5485 32.7852C66.0323 31.269 64.2337 30.0649 62.2529 29.2441C60.2713 28.4233 58.1453 28 56.0003 28Z"
        fill="url(#paint1_linear_10332_45289)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_10332_45289"
          x1={84.8828}
          y1={70}
          x2={68.9821}
          y2={109.802}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#E2EFCE" />
          <stop offset={1} stopColor="#739A38" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_10332_45289"
          x1={72.1545}
          y1={28}
          x2={39.8468}
          y2={60.3077}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#E2EFCE" />
          <stop offset={1} stopColor="#739A38" />
        </linearGradient>
      </defs>
    </svg>
  );
}
export function IconPhone2(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M5.12962 1.8123C5.34068 1.83552 5.54195 1.9132 5.71393 2.03772C6.66635 2.73183 7.40811 3.67914 8.04141 4.58573L8.41006 5.12284L8.75755 5.63472C8.93135 5.88863 9.00601 6.19788 8.9667 6.50305C8.92736 6.80826 8.77687 7.08844 8.54433 7.29L6.91836 8.49768C6.8399 8.5544 6.78467 8.63771 6.76292 8.73205C6.7412 8.82643 6.75459 8.92584 6.80036 9.01119C7.16873 9.68035 7.82378 10.6767 8.57363 11.4266C9.32363 12.1765 10.3676 12.8753 11.0834 13.2853C11.1731 13.3356 11.279 13.3494 11.3788 13.3243C11.4786 13.2992 11.5653 13.237 11.6205 13.1502L12.6784 11.5389C12.873 11.2806 13.16 11.1079 13.4792 11.0563C13.7985 11.0047 14.1255 11.0783 14.3915 11.2622L14.9441 11.6447C15.9766 12.3613 17.0857 13.176 17.934 14.2618C18.0685 14.435 18.1545 14.6409 18.1822 14.8584C18.2099 15.0758 18.1786 15.2967 18.0919 15.498C17.3944 17.1255 15.6292 18.5115 13.7934 18.444L13.5435 18.4301L13.349 18.413L13.1342 18.3886L12.8998 18.3569L12.6459 18.3146L12.5124 18.2902L12.2325 18.2299L12.086 18.1966L11.7808 18.1184L11.4602 18.0265L11.1249 17.9183C9.58662 17.3966 7.63414 16.3716 5.63092 14.3684C3.62773 12.3653 2.60363 10.4136 2.08193 8.87528L1.9737 8.54L1.88174 8.21936L1.80361 7.91418L1.73851 7.6261C1.71976 7.53582 1.70185 7.44505 1.68561 7.35429L1.64411 7.09957L1.61074 6.86601L1.58714 6.65116L1.57005 6.45666L1.55703 6.20683C1.48953 4.37683 2.89032 2.59924 4.51032 1.90507C4.70524 1.82092 4.91858 1.78909 5.12962 1.8123Z"
        fill="white"
      />
      <path
        d="M12.4937 5.03332L12.5897 5.0439C13.1962 5.15088 13.7537 5.44727 14.1815 5.89026C14.6093 6.33331 14.886 6.90067 14.9717 7.51054C15.0023 7.72148 14.9506 7.93614 14.8277 8.11031C14.7048 8.2845 14.5199 8.40527 14.3109 8.44722C14.1021 8.4891 13.8851 8.44959 13.7047 8.33655C13.5241 8.22331 13.3933 8.04486 13.3401 7.8385L13.3214 7.74247C13.2878 7.50356 13.1856 7.27939 13.0276 7.09713C12.8693 6.91479 12.6614 6.78151 12.4294 6.71464L12.3 6.68616C12.0908 6.64906 11.9036 6.53278 11.7768 6.36226C11.6501 6.19178 11.5934 5.97916 11.6181 5.76819C11.6428 5.55729 11.7468 5.36359 11.9094 5.22701C12.0722 5.09036 12.2816 5.02111 12.4937 5.03332Z"
        fill="white"
      />
      <path
        d="M12.5002 2.49996C13.8263 2.49998 15.0977 3.02714 16.0354 3.9648C16.973 4.90248 17.5002 6.1739 17.5002 7.49996C17.5 7.71236 17.4182 7.9168 17.2724 8.07125C17.1266 8.22551 16.9276 8.31839 16.7157 8.33085C16.5037 8.34329 16.2951 8.27424 16.1322 8.13798C15.9694 8.00168 15.8644 7.80847 15.8393 7.59761L15.8336 7.49996C15.8335 6.65376 15.5111 5.83892 14.9327 5.22131C14.3543 4.60391 13.5625 4.22936 12.7183 4.17395L12.5002 4.16663C12.2792 4.16663 12.0673 4.07874 11.911 3.92248C11.7548 3.7662 11.6669 3.55431 11.6669 3.33329C11.6669 3.11228 11.7548 2.90038 11.911 2.7441C12.0673 2.58785 12.2792 2.49996 12.5002 2.49996Z"
        fill="white"
      />
    </svg>
  );
}
export function Iconusercircle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 5.20833C10.8288 5.20834 11.6234 5.53782 12.2095 6.12386C12.7955 6.70991 13.125 7.50454 13.125 8.33333C13.125 9.16213 12.7955 9.95676 12.2095 10.5428C11.6234 11.1288 10.8288 11.4583 10 11.4583C9.17121 11.4583 8.37657 11.1288 7.79053 10.5428C7.20448 9.95676 6.875 9.16213 6.875 8.33333C6.875 7.50454 7.20448 6.70991 7.79053 6.12386C8.37657 5.53782 9.17121 5.20834 10 5.20833ZM10 6.45833C9.50273 6.45834 9.02594 6.65603 8.67432 7.00765C8.32269 7.35928 8.125 7.83606 8.125 8.33333C8.125 8.83061 8.32269 9.30739 8.67432 9.65902C9.02594 10.0106 9.50273 10.2083 10 10.2083C10.4973 10.2083 10.9741 10.0106 11.3257 9.65902C11.6773 9.30739 11.875 8.83061 11.875 8.33333C11.875 7.83606 11.6773 7.35928 11.3257 7.00765C10.9741 6.65603 10.4973 6.45834 10 6.45833Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 1.875C11.067 1.875 12.1238 2.08517 13.1095 2.49349C14.0952 2.90181 14.991 3.50013 15.7454 4.25456C16.4999 5.00898 17.0982 5.90477 17.5065 6.89046C17.9148 7.87623 18.125 8.93301 18.125 10C18.125 11.067 17.9148 12.1238 17.5065 13.1095C17.0982 14.0952 16.4999 14.991 15.7454 15.7454C15.5993 15.8915 15.446 16.0296 15.2897 16.1637C15.273 16.1796 15.2562 16.1953 15.2376 16.2093C14.5998 16.7473 13.883 17.1861 13.1095 17.5065C12.1238 17.9148 11.067 18.125 10 18.125C8.93301 18.125 7.87623 17.9148 6.89046 17.5065C5.90477 17.0982 5.00898 16.4999 4.25456 15.7454C3.50013 14.991 2.90181 14.0952 2.49349 13.1095C2.08517 12.1238 1.875 11.067 1.875 10C1.875 8.93301 2.08517 7.87623 2.49349 6.89046C2.90181 5.90477 3.50013 5.00898 4.25456 4.25456C5.00898 3.50013 5.90477 2.90181 6.89046 2.49349C7.87623 2.08517 8.93301 1.875 10 1.875ZM8.33333 13.9583C7.75096 13.9582 7.18367 14.1455 6.71631 14.493C6.35867 14.7589 6.0744 15.1079 5.88542 15.507C6.34213 15.8481 6.84 16.1326 7.36898 16.3517C8.20309 16.6972 9.09716 16.875 10 16.875C10.9028 16.875 11.7969 16.6972 12.631 16.3517C13.16 16.1326 13.6579 15.8481 14.1146 15.507C13.9258 15.1087 13.6421 14.7604 13.2853 14.4946C12.8761 14.1899 12.3904 14.0079 11.8848 13.9673L11.6667 13.9583H8.33333ZM10 3.125C9.09716 3.125 8.20309 3.30277 7.36898 3.64827C6.53488 3.99378 5.77674 4.49995 5.13835 5.13835C4.49995 5.77674 3.99378 6.53488 3.64827 7.36898C3.30277 8.20309 3.125 9.09716 3.125 10C3.125 10.9028 3.30277 11.7969 3.64827 12.631C3.95518 13.3719 4.38949 14.0524 4.93001 14.6427C5.19583 14.1964 5.5489 13.8041 5.97087 13.4904C6.6539 12.9826 7.48221 12.7081 8.33333 12.7083H11.6667C12.5188 12.7081 13.3481 12.9831 14.0316 13.492C14.4524 13.8054 14.804 14.1973 15.0692 14.6427C15.6099 14.0523 16.0447 13.3721 16.3517 12.631C16.6972 11.7969 16.875 10.9028 16.875 10C16.875 9.09716 16.6972 8.20309 16.3517 7.36898C16.0062 6.53488 15.5 5.77674 14.8617 5.13835C14.2233 4.49995 13.4651 3.99378 12.631 3.64827C11.7969 3.30277 10.9028 3.125 10 3.125Z"
        fill="currentColor"
      />
    </svg>
  );
}
export function Iconfiles(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.5003 1.875C12.5404 1.875 12.5795 1.87918 12.6175 1.88639C12.6199 1.88685 12.6224 1.88672 12.6248 1.88721C12.6368 1.88963 12.6481 1.89469 12.6598 1.89779C12.6874 1.90509 12.715 1.91206 12.7412 1.92301C12.7658 1.93329 12.7883 1.94725 12.8112 1.96045C12.8233 1.96742 12.8362 1.97301 12.8478 1.98079C12.8779 2.00097 12.9056 2.0242 12.9316 2.04915C12.935 2.05234 12.939 2.05484 12.9422 2.05811L17.1089 6.22477C17.222 6.33787 17.292 6.49408 17.292 6.66667V12.5C17.292 13.1078 17.0504 13.6905 16.6206 14.1203C16.1908 14.5501 15.6081 14.7917 15.0003 14.7917H13.9587V15.8333C13.9587 16.4411 13.717 17.0238 13.2873 17.4536C12.8575 17.8834 12.2748 18.125 11.667 18.125H5.83366C5.22587 18.125 4.64315 17.8834 4.21338 17.4536C3.78361 17.0238 3.54199 16.4411 3.54199 15.8333V7.5C3.54199 6.89221 3.78361 6.30949 4.21338 5.87972C4.64315 5.44995 5.22587 5.20833 5.83366 5.20833H6.87533V4.16667C6.87533 3.55888 7.11694 2.97616 7.54671 2.54639C7.97648 2.11662 8.5592 1.875 9.16699 1.875H12.5003ZM5.83366 6.45833C5.55739 6.45833 5.29252 6.56816 5.09717 6.76351C4.90182 6.95886 4.79199 7.22373 4.79199 7.5V15.8333C4.79199 16.1096 4.90182 16.3745 5.09717 16.5698C5.29252 16.7652 5.55739 16.875 5.83366 16.875H11.667C11.9433 16.875 12.2081 16.7652 12.4035 16.5698C12.5988 16.3745 12.7087 16.1096 12.7087 15.8333V14.7917H9.16699C8.5592 14.7917 7.97648 14.5501 7.54671 14.1203C7.11694 13.6905 6.87533 13.1078 6.87533 12.5V6.45833H5.83366ZM9.16699 3.125C8.89072 3.125 8.62585 3.23483 8.4305 3.43018C8.23515 3.62553 8.12533 3.8904 8.12533 4.16667V12.5C8.12533 12.7763 8.23515 13.0411 8.4305 13.2365C8.62585 13.4318 8.89073 13.5417 9.16699 13.5417H15.0003C15.2766 13.5417 15.5415 13.4318 15.7368 13.2365C15.9322 13.0411 16.042 12.7763 16.042 12.5V7.29167H13.3337C12.9469 7.29167 12.5761 7.13791 12.3026 6.86442C12.0291 6.59093 11.8753 6.22011 11.8753 5.83333V3.125H9.16699ZM13.1253 5.83333C13.1253 5.88859 13.1473 5.94156 13.1864 5.98063C13.2254 6.0197 13.2784 6.04167 13.3337 6.04167H15.1582L13.1253 4.00879V5.83333Z"
        fill="#4C5242"
      />
    </svg>
  );
}
export function IconTrashEmpty(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.833 1.875C11.2128 1.875 11.529 1.87448 11.7876 1.89209C12.0516 1.91008 12.3011 1.94906 12.5428 2.04916C12.821 2.16433 13.0737 2.33346 13.2866 2.54639C13.4995 2.75932 13.6687 3.01197 13.7839 3.2902C13.8839 3.53195 13.9229 3.78141 13.9409 4.04541C13.9478 4.14633 13.9498 4.25619 13.9523 4.375H16.6663C17.0115 4.375 17.2913 4.65482 17.2913 5C17.2913 5.34518 17.0115 5.625 16.6663 5.625H15.6247V14.8356C15.6247 15.2911 15.6255 15.6709 15.6003 15.9798C15.5744 16.2959 15.5178 16.5926 15.3748 16.8734C15.155 17.304 14.8039 17.6545 14.3722 17.8744C14.0916 18.0175 13.7954 18.0747 13.4795 18.1006C13.1707 18.1259 12.7908 18.125 12.3353 18.125H7.66406C7.20856 18.125 6.82885 18.1259 6.51986 18.1006C6.20366 18.0747 5.90638 18.0185 5.62549 17.8752C5.19462 17.6554 4.8441 17.3043 4.62451 16.8734C4.48145 16.5924 4.42496 16.2955 4.39909 15.979C4.37382 15.6697 4.37467 15.2895 4.37467 14.8332V5.625H3.33301C2.98783 5.625 2.70801 5.34518 2.70801 5C2.70801 4.65482 2.98783 4.375 3.33301 4.375H6.04704C6.04953 4.25619 6.05156 4.14633 6.05843 4.04541C6.07642 3.78141 6.1154 3.53195 6.21549 3.2902L6.31152 3.08675C6.41748 2.88831 6.55234 2.70611 6.71191 2.54639C6.92457 2.33355 7.17701 2.16444 7.45492 2.04916C7.69686 1.94922 7.94748 1.91009 8.21175 1.89209C8.47041 1.87448 8.78654 1.875 9.16634 1.875H10.833ZM5.62467 14.8332C5.62467 15.3102 5.62487 15.6307 5.64502 15.8773C5.66457 16.1164 5.70012 16.2306 5.73861 16.3062C5.82601 16.4777 5.95871 16.6211 6.12191 16.7212L6.19352 16.7611C6.26843 16.7993 6.38272 16.8351 6.62158 16.8547C6.8678 16.8748 7.18791 16.875 7.66406 16.875H12.3353C12.8113 16.875 13.131 16.8748 13.377 16.8547C13.6156 16.8351 13.73 16.8002 13.805 16.7619C14.0014 16.6619 14.1606 16.5019 14.2607 16.3062C14.2993 16.2304 14.3348 16.116 14.3543 15.8773C14.3744 15.6312 14.3747 15.3116 14.3747 14.8356V5.625H5.62467V14.8332ZM9.16634 3.125C8.76948 3.125 8.50273 3.1256 8.29639 3.13965C8.09648 3.15328 7.99811 3.1765 7.93343 3.20313L7.93424 3.20394C7.80789 3.25634 7.6932 3.33342 7.59652 3.43018C7.49983 3.52695 7.42257 3.6415 7.37028 3.76791C7.34384 3.8319 7.31963 3.9306 7.30599 4.13086C7.30103 4.2037 7.29916 4.28406 7.29704 4.375H12.7023C12.7002 4.28406 12.6983 4.2037 12.6934 4.13086C12.6797 3.9306 12.6555 3.83271 12.6291 3.76872C12.5767 3.64232 12.4996 3.52691 12.4028 3.43018C12.3061 3.33344 12.1915 3.25629 12.0651 3.20394C12.0011 3.1775 11.9024 3.15329 11.7021 3.13965C11.496 3.12562 11.2297 3.125 10.833 3.125H9.16634Z"
        fill="white"
      />
    </svg>
  );
}
export function IconFile(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M10.0007 10.8333C10.2768 10.8333 10.5007 11.0572 10.5007 11.3333C10.5007 11.6095 10.2768 11.8333 10.0007 11.8333H6.00065C5.72451 11.8333 5.50065 11.6095 5.50065 11.3333C5.50065 11.0572 5.72451 10.8333 6.00065 10.8333H10.0007Z"
        fill="#0F110C"
      />
      <path
        d="M10.0007 8.16667C10.2768 8.16667 10.5007 8.39052 10.5007 8.66667C10.5007 8.94281 10.2768 9.16667 10.0007 9.16667H6.00065C5.72451 9.16667 5.50065 8.94281 5.50065 8.66667C5.50065 8.39052 5.72451 8.16667 6.00065 8.16667H10.0007Z"
        fill="#0F110C"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.33398 1.5C9.36605 1.5 9.39735 1.50335 9.42773 1.50911C9.42966 1.50948 9.43167 1.50938 9.43359 1.50977C9.44319 1.5117 9.4522 1.51575 9.46159 1.51823C9.48362 1.52407 9.5057 1.52964 9.52669 1.53841C9.54635 1.54663 9.56439 1.5578 9.58268 1.56836C9.59236 1.57394 9.60267 1.57841 9.61198 1.58464C9.63604 1.60077 9.65818 1.61936 9.67904 1.63932C9.6817 1.64187 9.68489 1.64387 9.6875 1.64648L13.0208 4.97982C13.1113 5.0703 13.1673 5.19526 13.1673 5.33333V12.6667C13.1673 13.1529 12.974 13.6191 12.6302 13.9629C12.2864 14.3067 11.8202 14.5 11.334 14.5H4.66732C4.18109 14.5 3.71491 14.3067 3.37109 13.9629C3.02728 13.6191 2.83398 13.1529 2.83398 12.6667V3.33333C2.83398 2.8471 3.02728 2.38093 3.37109 2.03711C3.71491 1.69329 4.18109 1.5 4.66732 1.5H9.33398ZM4.66732 2.5C4.4463 2.5 4.23441 2.58786 4.07812 2.74414C3.92184 2.90042 3.83398 3.11232 3.83398 3.33333V12.6667L3.83789 12.7493C3.85689 12.94 3.94145 13.1192 4.07812 13.2559C4.23441 13.4121 4.4463 13.5 4.66732 13.5H11.334C11.555 13.5 11.7669 13.4121 11.9232 13.2559C12.0795 13.0996 12.1673 12.8877 12.1673 12.6667V5.83333H10.0007C9.69123 5.83333 9.39457 5.71033 9.17578 5.49154C8.95699 5.27274 8.83398 4.97609 8.83398 4.66667V2.5H4.66732ZM9.83398 4.66667C9.83398 4.71087 9.85156 4.75325 9.88281 4.78451C9.91407 4.81576 9.95645 4.83333 10.0007 4.83333H11.4603L9.83398 3.20703V4.66667Z"
        fill="#0F110C"
      />
    </svg>
  );
}
export function IconDownload(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M15 16.875C15.3452 16.875 15.625 17.1548 15.625 17.5C15.625 17.8452 15.3452 18.125 15 18.125H5C4.65482 18.125 4.375 17.8452 4.375 17.5C4.375 17.1548 4.65482 16.875 5 16.875H15Z"
        fill="currentColor"
      />
      <path
        d="M10 1.875C10.3452 1.875 10.625 2.15482 10.625 2.5V12.6579L13.7248 9.55811C13.9688 9.31403 14.3645 9.31403 14.6086 9.55811C14.8526 9.80218 14.8526 10.1978 14.6086 10.4419L10.4419 14.6086C10.1978 14.8526 9.80218 14.8526 9.55811 14.6086L5.39144 10.4419C5.14736 10.1978 5.14736 9.80218 5.39144 9.55811C5.63552 9.31403 6.03115 9.31403 6.27523 9.55811L9.375 12.6579V2.5C9.375 2.15482 9.65482 1.875 10 1.875Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function ComptePage() {
  const { open } = usePopup();
  const { user, logout } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const [value, setValue] = useState("");
  const clear = () => setValue("");

  const tabs = ["Informations personnelles", "Mes contrats"];

  const handleLogout = () => {
    logout();
    router.push("/compte/connexion");
  };

  const displayName = user?.nom || user?.username || "Utilisateur";
  const displayEmail = user?.email || "";

  return (
    <AuthGuard>
    <main className="relative w-full max-w-[780px] mx-auto f-col gap-6 pt-[38px] pb[64px] px-4">
      <div className="flex items-center gap-4">
        <span className="p-2 flex-center size-[108px] rounded-full overflow-hidden bg-[#E2EFCE]">
          <IconProfile className=" shrink-0" />
        </span>
        <div className="f-col gap-1 flex-1">
          <h4 className="Headings-H4">{displayName}</h4>
          <p className="text-Sage-Gray-Higher Text-M">{displayEmail}</p>
        </div>
        <div className="f-col gap-1.5 button-s">
          <Link
            href="/contact"
            className="text-white py-2 px-4 rounded-full flex items-center gap-1 bg-Secondary-Violet-Medium"
          >
            <IconPhone2 className=" shrink-0" />
            <span>+212 5 22 27 03 43</span>
          </Link>
          <p className="text-Sage-Gray-Higher">Assistance d'urgence 24/7</p>
        </div>
      </div>
      <div className="f-col gap-3">
        <ul className="flex gap-1 p-1 rounded-3xl bg-Sage-Gray-Lower button-s w-fit">
          {tabs.map((label, index) => (
            <li
              key={index}
              onClick={() => setActiveTab(index)}
              className={`py-3 px-4 flex items-center gap-1 rounded-full cursor-pointer transition ${
                activeTab === index
                  ? "bg-white shadow-md text-Neutral-Dark"
                  : "text-Sage-Gray-Higher hover:bg-Sage-Gray-Low hover:text-Neutral-Dark"
              }`}
            >
              <Iconusercircle className="shrink-0" />
              <span>{label}</span>
            </li>
          ))}
        </ul>

        {activeTab === 0 && (
          <div className="f-col gap-1 p-1 rounded-3xl bg-Sage-Gray-Lower">
            <InfoPersonnellesForm />
            <div className="p-7 flex items-center justify-between gap-7 rounded-[20px] bg-white">
              <div className="f-col gap-1">
                <h6 className="text-Secondary-Red-High Headings-H6">
                  Supprimer mon compte
                </h6>
                <span className="text-Secondary-Red-Medium button2-s">
                  Cette action est irréversible
                </span>
              </div>
              <button
                type="button"
                onClick={() => open("SupprimerCompte")}
                className="py-2 px-4 flex items-center gap-1 text-white bg-Secondary-Red-Medium
                 rounded-full button2-s hover:bg-Secondary-Red-Higher cursor-pointer transition"
              >
                <IconTrashEmpty className=" shrink-0" />
                <span>Supprimer</span>
              </button>
            </div>
          </div>
        )}
        {activeTab === 1 && (
          <div className="f-col gap-4">
            <h4 className="Headings-H4">Mes contrats d'assurance</h4>
            <label
              className="py-3 px-4 bg-Sage-Gray-Lower hover:bg-Sage-Gray-Low text-Neutral-BG-5
               focus-within:text-Neutral-Dark transition flex items-center gap-2 rounded-full focus-within:hover:bg-Sage-Gray-Lowest
               focus-within:ring focus-within:ring-Neutral-Dark focus-within:bg-Sage-Gray-Lowest"
            >
              <IconSearch className=" shrink-0" />
              <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                type="text"
                placeholder="Ex : assurance voyage, auto, santé…"
                className="placeholder-Sage-Gray-High border-none outline-none w-full"
              />
              {value && (
                <button
                  type="button"
                  onClick={clear}
                  className="bg-Sage-Gray-Medium hover:bg-Sage-Gray-Higher transition rounded-full cursor-pointer"
                >
                  <IconSearchClear className=" shrink-0" />
                </button>
              )}
            </label>
            <div className="f-col gap-1 p-2 rounded-3xl bg-Sage-Gray-Lower button2-s">
              <ul className="flex">
                <li className="py-3 px-5 flex-1">Type</li>
                <li className="py-3 px-5 flex-1">Assureur</li>
                <li className="py-3 px-5 flex-1">Échéance </li>
                <li className="py-3 px-5 flex-1">Prime</li>
                <li className="w-[60px]"></li>
              </ul>
              <ul className="f-col gap-1 rounded-2xl overflow-hidden">
                <li
                  onClick={() => open("PopupCompteAssurance")}
                  className="grid grid-cols-[repeat(4,minmax(0,1fr))_fit-content(100%)] transition cursor-pointer bg-white hover:bg-Sage-Gray-Lowest"
                >
                  <div className="py-4 px-5 f-col gap-1">
                    <div className="flex items-center gap-0.5">
                      <IconFile />
                      <span className="button-s line-clamp-1">
                        Assurance Auto
                      </span>
                    </div>
                    <span className="text-Sage-Gray-Higher">MA-2024-8763</span>
                  </div>
                  <span className="my-auto px-5">Saham Assurance</span>
                  <span className="my-auto px-5">14/01/2025</span>
                  <span className="my-auto px-5 button-s">350 DH/mois</span>
                  <div className="my-auto px-3 w-auto">
                    <span className="p-2 flex-center bg-Sage-Gray-Lower rounded-full">
                      <IconDownload className=" shrink-0" />
                    </span>
                  </div>
                </li>
                <li
                  onClick={() => open("PopupCompteAssurance")}
                  className="grid grid-cols-[repeat(4,minmax(0,1fr))_fit-content(100%)] transition cursor-pointer bg-white hover:bg-Sage-Gray-Lowest"
                >
                  <div className="py-4 px-5 f-col gap-1">
                    <div className="flex items-center gap-0.5">
                      <IconFile />
                      <span className="button-s line-clamp-1">
                        Assurance Auto
                      </span>
                    </div>
                    <span className="text-Sage-Gray-Higher">MA-2024-8763</span>
                  </div>
                  <span className="my-auto px-5">Saham Assurance</span>
                  <span className="my-auto px-5">14/01/2025</span>
                  <span className="my-auto px-5 button-s">350 DH/mois</span>
                  <div className="my-auto px-3 w-auto">
                    <span className="p-2 flex-center bg-Sage-Gray-Lower rounded-full">
                      <IconDownload className=" shrink-0" />
                    </span>
                  </div>
                </li>
                <li
                  onClick={() => open("PopupCompteAssurance")}
                  className="grid grid-cols-[repeat(4,minmax(0,1fr))_fit-content(100%)] transition cursor-pointer bg-white hover:bg-Sage-Gray-Lowest"
                >
                  <div className="py-4 px-5 f-col gap-1">
                    <div className="flex items-center gap-0.5">
                      <IconFile />
                      <span className="button-s line-clamp-1">
                        Assurance Auto
                      </span>
                    </div>
                    <span className="text-Sage-Gray-Higher">MA-2024-8763</span>
                  </div>
                  <span className="my-auto px-5">Saham Assurance</span>
                  <span className="my-auto px-5">14/01/2025</span>
                  <span className="my-auto px-5 button-s">350 DH/mois</span>
                  <div className="my-auto px-3 w-auto">
                    <span className="p-2 flex-center bg-Sage-Gray-Lower rounded-full">
                      <IconDownload className=" shrink-0" />
                    </span>
                  </div>
                </li>
              </ul>
            </div>
            <PopupCompteAssurance />
          </div>
        )}
      </div>
      <PopupSupprimerCompte />
    </main>
    </AuthGuard>
  );
}
