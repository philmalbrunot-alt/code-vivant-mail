import { BrandHeader, Container, Label, Panel, Shell } from '@/components/ui';

export default function MerciPage() {
  return (
    <Shell>
      <Container>
        <BrandHeader />

        <Panel className="py-12 md:py-16">
          <div className="mx-auto max-w-3xl text-center">
            <Label>PAIEMENT CONFIRMÉ</Label>

            <h1 className="mt-4 font-serif text-4xl leading-tight text-cv-text md:text-6xl">
              Votre lecture complète est en préparation
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-cv-text/90 md:text-2xl">
              Merci. Votre paiement a bien été validé.
            </p>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-cv-muted md:text-base">
              Votre lecture complète entre maintenant dans une profondeur plus précise :
              verrou principal, héritage invisible, rapport à la valeur, élan retenu et
              première direction de bascule.
            </p>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-cv-muted md:text-base">
              Vous la recevrez à l’adresse email renseignée au paiement dans quelques minutes.
            </p>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-cv-muted md:text-base">
              Pensez à vérifier vos spams si vous ne la voyez pas arriver.
            </p>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-cv-muted md:text-base">
              Certaines personnes préfèrent lire d’abord.
              D’autres sentent déjà qu’il faut aller directement au point vivant.
              Dans ce cas, la séance de clarification est l’étape la plus juste.
            </p>
            <div className="mt-8">
              <a
                href="https://koalendar.com/e/echange-avec-philippe-malbrunot"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center rounded-2xl border border-cv-gold/35 bg-cv-gold/12 px-5 py-4 text-sm font-medium text-cv-text transition hover:bg-cv-gold/20 md:w-auto"
              >
                Réserver ma séance
              </a>
            </div>
          </div>
        </Panel>
      </Container>
    </Shell>
  );
}
