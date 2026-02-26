"use client";

import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import BtnArrow from "./components/buttons/btn-arrow";
import Footer from "./components/footer/footer";
import Tag from "./components/text/Tag";
import Wrapper1180 from "./components/wrapper/wrapper-1180";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
  }, [error]);

  return (
    <>
      {/* Hero Section */}
      <div
        className="w-full min-h-screen
        bg-[url('/overlay.png'),linear-gradient(180deg,var(--color-Sage-Gray-Higher)_0%,var(--color-Sage-Gray-High)_100%)]
        bg-[position:bottom,center]
        bg-[length:contain,cover]
        bg-no-repeat
        f-col items-center justify-center pt-[108px] pb-28"
      >
        <Wrapper1180 className="items-center text-center">
          {/* Error Icon */}
          <div className="f-col gap-8 items-center mb-16">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-Secondary-Red-Lowest flex-center">
                <AlertTriangle className="w-16 h-16 text-Secondary-Red" />
              </div>
              <div className="absolute -top-4 -right-4">
                <Tag label="Erreur" />
              </div>
            </div>

            <div className="f-col gap-6 max-w-[600px]">
              <h2 className="text-white Headings-H1">
                Une erreur s&apos;est produite
              </h2>
              <p className="text-white/80 Text-L">
                Désolé, quelque chose s&apos;est mal passé. Notre équipe
                technique a été notifiée et travaille à résoudre le problème.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="f-col gap-6 items-center mb-16">
            <div className="flex gap-4 flex-wrap justify-center">
              <button
                onClick={() => {
                  reset();
                  window.location.reload();
                }}
                className="flex items-center gap-2 bg-Brand-500 hover:bg-Brand-600 text-white py-3 px-6 rounded-full transition-colors"
              >
                <RefreshCw className="w-5 h-5" />
                Réessayer
              </button>

              <Link href="/">
                <BtnArrow
                  variant="white"
                  direction="left"
                  label="Retour à l'accueil"
                  iconSize={20}
                />
              </Link>
            </div>
          </div>

          {/* Help Section */}
          <div className="w-full max-w-[800px]">
            <div className="f-col gap-8 p-8 rounded-3xl bg-white/10 backdrop-blur-[35px] border border-white/20">
              <div className="text-center">
                <h3 className="text-white Headings-H3 mb-4">
                  Que faire maintenant ?
                </h3>
                <p className="text-white/80 Text-M">
                  Voici quelques solutions pour résoudre le problème
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="f-col gap-4 p-6 rounded-2xl bg-white/10 backdrop-blur-[20px] border border-white/20">
                  <div className="flex-center w-12 h-12 rounded-full bg-Brand-500/20">
                    <RefreshCw className="w-6 h-6 text-Brand-500" />
                  </div>
                  <div className="text-center">
                    <h4 className="text-white Headings-H6 mb-2">
                      Actualiser la page
                    </h4>
                    <p className="text-white/70 Text-S">
                      Parfois, un simple rafraîchissement peut résoudre le
                      problème
                    </p>
                  </div>
                </div>

                <div className="f-col gap-4 p-6 rounded-2xl bg-white/10 backdrop-blur-[20px] border border-white/20">
                  <div className="flex-center w-12 h-12 rounded-full bg-Secondary-Blue-Lowest">
                    <Home className="w-6 h-6 text-Secondary-Blue" />
                  </div>
                  <div className="text-center">
                    <h4 className="text-white Headings-H6 mb-2">
                      Retour à l&apos;accueil
                    </h4>
                    <p className="text-white/70 Text-S">
                      Naviguez vers la page d&apos;accueil et réessayez
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-center pt-4">
                <p className="text-white/60 Text-S mb-4">
                  Si le problème persiste, contactez notre support technique
                </p>
                <Link href="/assurance-entreprise">
                  <BtnArrow
                    variant="white"
                    direction="right"
                    label="Contacter le support"
                    outline
                  />
                </Link>
              </div>
            </div>
          </div>
        </Wrapper1180>
      </div>

      {/* Additional Support Section */}
      <div className="w-full bg-Neutral-BG-1">
        <Wrapper1180 className="py-20">
          <div className="f-col gap-8 items-center">
            <Tag label="Support technique" />
            <h2 className="text-Neutral-Dark Headings-H2 text-center">
              Besoin d&apos;assistance ?
            </h2>
            <p className="text-Text-Body Text-M text-center max-w-[600px]">
              Notre équipe technique est disponible pour vous aider à résoudre
              ce problème et vous accompagner dans l&apos;utilisation de nos
              services.
            </p>

            <div className="flex gap-4 flex-wrap justify-center">
              <Link href="/entreprises">
                <BtnArrow
                  variant="Black"
                  direction="right"
                  label="Contacter le support"
                  iconSize={20}
                />
              </Link>

              <Link href="/">
                <BtnArrow
                  variant="avantage"
                  direction="right"
                  label="Retour à l'accueil"
                  iconSize={20}
                />
              </Link>
            </div>
          </div>
        </Wrapper1180>
      </div>

      {/* Technical Details (Development Only) */}
      {process.env.NODE_ENV === "development" && (
        <div className="w-full bg-custom-gradient">
          <Wrapper1180 className="py-20">
            <div className="f-col gap-8 items-center">
              <Tag label="Détails techniques" />
              <h2 className="text-Neutral-Dark Headings-H2 text-center">
                Informations de débogage
              </h2>

              <div className="w-full max-w-4xl">
                <div className="bg-white rounded-2xl p-6 border border-Neutral-BG-3">
                  <h3 className="text-BG-Dark Headings-H6 mb-4">
                    Message d&apos;erreur :
                  </h3>
                  <pre className="bg-Neutral-BG-2 p-4 rounded-lg text-sm text-BG-Dark overflow-x-auto">
                    {error.message}
                  </pre>

                  {error.digest && (
                    <div className="mt-4">
                      <h4 className="text-BG-Dark Headings-H7 mb-2">
                        Digest :
                      </h4>
                      <code className="bg-Neutral-BG-2 px-2 py-1 rounded text-sm text-BG-Dark">
                        {error.digest}
                      </code>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Wrapper1180>
        </div>
      )}

      <Footer />
    </>
  );
}
