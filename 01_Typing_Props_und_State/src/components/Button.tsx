// ─── Einfache Button-Komponente mit manuell definierten Props ──────────────────

type ButtonProps = {
  // React.ReactNode ist der allgemeinste Typ für alles, was React rendern kann:
  // Text, andere Komponenten, Arrays, Fragmente, null, undefined …
  // Ideal für die 'children'-Prop, da man nie weiß, was hineingegeben wird.
  children: React.ReactNode;

  // React.MouseEventHandler<HTMLButtonElement> ist ein fertiger Typ aus React
  // für Klick-Event-Handler, die an einem <button>-Element hängen.
  // Er ist präziser als '() => void', weil er das Event-Objekt mit korrektem Typ mitliefert
  // (z.B. event.currentTarget ist dann automatisch ein HTMLButtonElement).
  // '() => void' (auskommentiert) wäre eine vereinfachte Alternative ohne Event-Objekt.
  // onClick: () => void
  onClick: React.MouseEventHandler<HTMLButtonElement>;

  className?: string; // Optional – ermöglicht zusätzliche CSS-Klassen von außen
};

export function ButtonSimple({ children, onClick, className }: ButtonProps) {
  return (
    // Template-Literal: 'myBtn' ist immer gesetzt; className wird nur angehängt,
    // wenn es übergeben wurde – sonst würde ein leerer String '' entstehen.
    <button className={`myBtn ${className ? className : ''}`} onClick={onClick}>
      {children}
    </button>
  );
}

// ─── Erweiterte Button-Komponente mit intrinsischen HTML-Props ─────────────────

// React.ComponentProps<'button'> gibt uns automatisch *alle* nativen Props,
// die ein HTML-<button>-Element akzeptiert: onClick, disabled, type, aria-*, …
// Mit '&' (Intersection Type) fügen wir unsere eigene 'username'-Prop dazu.
// So müssen wir nichts manuell auflisten – zukünftige HTML-Attribute sind automatisch dabei.
type IntrinsicButtonProps = React.ComponentProps<'button'> & {
  username: string;
};

export default function Button({
  username,
  children,
  onClick,
  className,
  // '...rest' sammelt alle übrigen Props ein, die nicht explizit destructured wurden.
  // Das sind z.B. 'disabled', 'type', 'aria-label' – alles, was ComponentProps<'button'>
  // erlaubt, aber hier nicht einzeln aufgeführt ist.
  ...rest
}: IntrinsicButtonProps) {
  return (
    <button
      className={`myBtn ${className ? className : ''}`}
      onClick={onClick}
      // '{...rest}' verteilt alle eingesammelten Props direkt auf das <button>-Element.
      // Dadurch verhält sich unsere Komponente wie ein echter HTML-Button –
      // z.B. <Button disabled> funktioniert einfach, ohne extra Typen hinzuzufügen.
      {...rest}
    >
      {username}: {children}
    </button>
  );
}
