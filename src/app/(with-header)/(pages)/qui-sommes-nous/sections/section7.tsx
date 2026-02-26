import CarouselTestimonials from "../components/testimonial-slider-section";

export default function Section7() {
  return (
    <section
      className="w-full px-4 relative bg-blend-multiply bg-Primary-300
     bg-[url('/testimonial-overlay.png')] bg-contain bg-top-right bg-no-repeat"
    >
      <CarouselTestimonials testimonials={testimonials} />
    </section>
  );
}
const testimonials = [
  {
    paragraph: `En un monde en mutation, notre rôle est clair : sécuriser, anticiper, optimiser.
    Chez TRT BROKER, nous faisons plus qu’intermédier. Nous créons des ponts durables entre vos besoins et les meilleures solutions d’assurance et de réassurance du marché.

    L’humain reste au centre de notre stratégie. Et l’avenir ? On le construit avec vous, jour après jour.`,
    author: "Yassine KHIRAOUI",
    role: "Directeur Général, TRT BROKER",
  },
  {
    paragraph: `En un monde en mutation, notre rôle est clair : sécuriser, anticiper, optimiser.
    Chez TRT BROKER, nous faisons plus qu’intermédier. Nous créons des ponts durables entre vos besoins et les meilleures solutions d’assurance et de réassurance du marché.
    
    L’humain reste au centre de notre stratégie. Et l’avenir ? On le construit avec vous, jour après jour.`,
    author: "Yassine KHIRAOUI",
    role: "Directeur Général, TRT BROKER",
  },
  {
    paragraph: `En un monde en mutation, notre rôle est clair : sécuriser, anticiper, optimiser.
    Chez TRT BROKER, nous faisons plus qu’intermédier. Nous créons des ponts durables entre vos besoins et les meilleures solutions d’assurance et de réassurance du marché.
    
    L’humain reste au centre de notre stratégie. Et l’avenir ? On le construit avec vous, jour après jour.`,
    author: "Yassine KHIRAOUI",
    role: "Directeur Général, TRT BROKER",
  },
];
