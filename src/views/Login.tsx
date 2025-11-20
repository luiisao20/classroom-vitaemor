import { Link, useNavigate } from "react-router";
import { ModalMessage } from "../components/modal/ModalMessage";
import { useEffect, useState } from "react";
import { useAuthStore } from "../presentation/store/useAuthStore";
import { InputPassword } from "../components/input/InputPassword";
import { InputComponent } from "../components/input/InputComponent";

interface ModaProps {
  open: boolean;
  message: string;
}

export const Login = () => {
  const navigate = useNavigate();
  const [modalProps, setModalProps] = useState<ModaProps>({
    open: false,
    message: "",
  });
  const [formLogin, setFormLogin] = useState({
    email: "",
    password: "",
  });

  const { status, loading, login } = useAuthStore();

  useEffect(() => {
    if (status === "authenticated") navigate("/home");
  }, []);

  const handleSubmit = async () => {
    const wasSuccessfull = await login(formLogin.email, formLogin.password);

    if (typeof wasSuccessfull !== "string") {
      return navigate("/home");
    }

    setModalProps((prev) => ({
      ...prev,
      open: true,
      message: `¡Ingreso incorrecto! Correo electrónico o contraseña son inválidos. 
      Codigo de error: ${wasSuccessfull}`,
    }));
  };

  return (
    <section className="bg-background">
      <ModalMessage
        warning
        message={modalProps.message}
        open={modalProps.open}
        onClose={() => setModalProps({ open: false, message: "" })}
      />
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-text md:text-2xl">
              Ingresa con tu cuenta
            </h1>
            <form className="flex flex-col gap-4" action="#">
              <InputComponent
                id="email"
                label="Correo electrónico"
                text={formLogin.email}
                onChangeText={(text) =>
                  setFormLogin((prev) => ({ ...prev, email: text }))
                }
              />
              <InputPassword
                password={formLogin.password}
                onChangeText={(text) =>
                  setFormLogin((prev) => ({ ...prev, password: text }))
                }
              />
              <div className="flex justify-end">
                <a
                  href="#"
                  className="text-sm font-medium text-text hover:underline"
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
              <button
                onClick={handleSubmit}
                disabled={loading}
                type="button"
                className={`w-full text-white bg-primary cursor-pointer hover:bg-primary/70 focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 ${
                  loading && "cursor-progress"
                }`}
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
