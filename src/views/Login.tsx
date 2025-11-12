import { Link } from "react-router";

export const Login = () => {
  return (
    <section className="bg-background">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-text md:text-2xl">
              Ingresa con tu cuenta
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div className="relative">
                <input
                  type="text"
                  id="floating_email"
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-heading bg-transparent rounded-base border border-secondary rounded-xl border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-primary peer"
                  placeholder=" "
                />
                <label
                  htmlFor="floating_email"
                  className="absolute text-sm text-body duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-left bg-white px-2 peer-focus:px-2 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                >
                  Correo electrónico
                </label>
              </div>
              <div className="relative">
                <input
                  type="password"
                  id="floating_password"
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-heading bg-transparent rounded-base border border-secondary rounded-xl border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-primary peer"
                  placeholder=" "
                />
                <label
                  htmlFor="floating_password"
                  className="absolute text-sm text-body duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-left bg-white px-2 peer-focus:px-2 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                >
                  Contraseña
                </label>
              </div>
              <div className="flex justify-end">
                <a
                  href="#"
                  className="text-sm font-medium text-text hover:underline"
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary hover:bg-primary-hover focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer"
              >
                Iniciar sesión
              </button>
              <p className="text-sm font-light mt-2 text-gray-500">
                ¿No posees una cuenta?{" "}
                <Link
                  to="/register"
                  className="font-medium text-primary-600 hover:underline"
                >
                  Regístrate
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
