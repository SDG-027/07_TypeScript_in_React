import z from 'zod';
import { FormSchema, sleep } from './utils/index.js';
import { useActionState } from 'react';

// Der Ausgangszustand des Formulars — wird beim ersten Render und nach erfolgreichem Absenden verwendet.
// Alle Felder sind leer, alle Fehler-Arrays enthalten einen leeren String, success ist false.
const initialState = {
  input: {
    name: '',
    number: '0',
    email: '',
    message: '',
  },
  errors: {
    name: [''],
    number: [''],
    email: [''],
    message: [''],
  },
  success: false,
};

// TypeScript-Typ wird direkt aus initialState abgeleitet — so bleibt der Typ immer synchron mit der Struktur
type FormState = typeof initialState;

// Die Action — wird aufgerufen, wenn das Formular abgeschickt wird.
// _prevState ist der vorherige Zustand (wird hier nicht gebraucht, muss aber als Parameter vorhanden sein).
// formData enthält alle Felder des Formulars als rohe Strings.
async function action(_prevState: FormState, formData: FormData) {
  // FormData liefert immer Strings — daher der Cast zu FormState['input']
  const data = Object.fromEntries(formData) as FormState['input'];

  // safeParse validiert die Formulardaten gegen das Schema — ohne Exception bei Fehler
  const { success, data: dataZod, error } = FormSchema.safeParse(data);

  if (success) {
    console.log(dataZod);
    await sleep(1000); // simuliert einen echten fetch/API-Aufruf
    // Bei Erfolg: Formular zurücksetzen und success-Flag setzen
    return {
      ...initialState,
      success: true,
    };
  } else {
    // z.flattenError() wandelt den Zod-Fehler in ein flaches Objekt um:
    // { fieldErrors: { name: ['Name required'], email: ['Invalid email'], ... } }
    // Das macht es einfach, die Fehler pro Feld im JSX anzuzeigen
    const validationErrors = z.flattenError(error).fieldErrors;

    // Bei Fehler: eingegebene Werte behalten (damit der Nutzer nicht alles neu tippen muss)
    // und die Fehlermeldungen in den State schreiben
    return {
      input: data,
      success: false,
      errors: { ...initialState.errors, ...validationErrors },
    };
  }
}

export default function App() {
  // useActionState verbindet die Action mit dem Komponenten-State.
  const [state, formAction, isPending] = useActionState(action, initialState);

  return (
    <main className="min-h-screen bg-gray-900 p-8 font-sans">
      <div className="mx-auto max-w-xl space-y-6 rounded-lg bg-gray-950 p-6 shadow">
        <h2 className="text-center text-2xl font-bold text-gray-200">
          Contact Us
        </h2>

        <form className="space-y-4" action={formAction}>
          <div>
            <label
              className="block text-sm font-medium text-gray-200"
              htmlFor="name"
            >
              Name
            </label>
            <input
              name="name"
              id="name"
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
              placeholder="Leia Organa"
              defaultValue={state?.input?.name}
            />
            {state?.errors?.name && (
              <p className="mt-1 text-sm text-red-600">
                {state.errors.name[0]}
              </p>
            )}
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-200"
              htmlFor="number"
            >
              Number
            </label>
            <input
              name="number"
              // z.coerce.number() im Schema übernimmt die Umwandlung von String zu Zahl.
              type="number"
              id="number"
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
              placeholder="0-123"
              defaultValue={state?.input?.number}
            />
            {state?.errors?.number && (
              <p className="mt-1 text-sm text-red-600">
                {state.errors.number[0]}
              </p>
            )}
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              name="email"
              id="email"
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
              placeholder="leia@rebellion.org"
              defaultValue={state?.input?.email}
            />
            {state?.errors?.email && (
              <p className="mt-1 text-sm text-red-600">
                {state.errors.email[0]}
              </p>
            )}
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="message"
            >
              {/*{dict[currLang].message}*/}
              Message
            </label>
            <textarea
              name="message"
              id="message"
              rows={4}
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
              placeholder="Tell us how we can help..."
              defaultValue={state?.input?.message}
            />
            {state?.errors?.message && (
              <p className="mt-1 text-sm text-red-600">
                {state.errors.message[0]}
              </p>
            )}
          </div>

          {/* Erfolgsmeldung — wird nur angezeigt, wenn state.success === true */}
          {state?.success && (
            <p className="text-sm text-green-500">Thanks for your Message!</p>
          )}

          {/* isPending deaktiviert den Button während die Action läuft — verhindert Doppel-Submits */}
          <button
            type="submit"
            disabled={isPending}
            className={`w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700 ${
              isPending ? 'cursor-not-allowed opacity-70' : ''
            }`}
          >
            {isPending ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </main>
  );
}
