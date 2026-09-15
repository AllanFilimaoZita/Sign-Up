import { useState } from "react";
import { supabase } from "../lib/supabase"
import Spinner from "../components/Spinner";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignUp(event) {
    event.preventDefault();

    setMessage("");
    setErrorMessage("");

    if (!email || !password) {
      setErrorMessage("Preencha o email e password");
      return;
    }

    setLoading(true)

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    console.log("DATA: ", data);
    console.log("ERROR: ", error);
    
    if (error) {
      setErrorMessage(error.message)
      return
    }

    setMessage("Conta criada! Verifica o seu ")

    setLoading(false)
  }

  


  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <form
        onSubmit={handleSignUp}
        className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl"
      >
        <h1 className="text-2xl font-semibold text-white mb-1">
          Sign Up
        </h1>

        <p className="text-sm text-slate-400 mb-6">
          Acesse por Email ou Passowrd
        </p>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-slate-300 mb-1.5"
          >
            Email
          </label>

          <input
            type="email"
            name="email"
            id="email"
            placeholder="voce@exemplo.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-lg bg-slate-800 border border-[#3498db] text-white placeholder-slate-500 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-slate-300 mb-1.5"
          >
            Password
          </label>

          <input
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
          />
        </div>

        {
          message && (
            <p className="mb-4 rounded-lg bg-emerald-500/10 px-3 py-2 text-sm text-emerald-400">
              {message}
            </p>
          )
        }
        {
          errorMessage && (
            <p className="mb-4 rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400">
              {errorMessage}
            </p>
          )
        }

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold text-sm py-2.5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {
            loading ? (
              <>
                <Spinner />
                Criando conta...
              </>
            ) : (
              "Criar Conta"
            )
          } 
        </button>
      </form>
    </div>
  );
}

export default SignUp;