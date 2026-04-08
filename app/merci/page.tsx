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
              Votre lecture complète arrive par email
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-cv-text/90 md:text-2xl">
              Merci. Votre paiement a bien été validé.
            </p>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-cv-muted md:text-base">
              Votre lecture complète sera envoyée à l’adresse email renseignée au paiement. Pensez à vérifier vos spams si vous ne la voyez pas d’ici quelques minutes.
            </p>
          </div>
        </Panel>
      </Container>
    </Shell>
  );
}
