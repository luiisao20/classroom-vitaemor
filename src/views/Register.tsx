import { Formik } from "formik";
import type { UserData } from "../core/auth/interface";
import { CustomErrorMessage } from "../components/general/CustomErrorMessage";
import { registerForm } from "../helpers/get-error-forms";
import { useAuthStore } from "../presentation/store/useAuthStore";
import { Link, useNavigate } from "react-router";
import { useUser } from "../presentation/user/useUser";

export interface NewUser extends UserData {
  email: string;
  password: string;
  confirmPassword: string;
}

export const Register = () => {
  const navigate = useNavigate();

  const { user, register } = useAuthStore();

  const { userMutation } = useUser(user?.id);

  const newUser: NewUser = {
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  };

  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Crear una cuenta
            </h1>
            <Formik
              initialValues={newUser}
              validationSchema={registerForm}
              onSubmit={async (formLike, { setSubmitting }) => {
                await register(formLike);
                try {
                  await userMutation.mutateAsync({
                    firstName: formLike.firstName,
                    lastName: formLike.lastName,
                  });

                  navigate("/home");
                } catch (error) {
                  console.log(error);
                }
                setSubmitting(false);
              }}
            >
              {({
                values,
                errors,
                touched,
                isSubmitting,

                handleSubmit,
                handleChange,
                handleBlur,
              }) => (
                <form onSubmit={handleSubmit} className="space-y-3" action="#">
                  <div>
                    <label
                      htmlFor="first_name"
                      className="block text-sm font-medium text-gray-900"
                    >
                      Nombres
                    </label>
                    <input
                      type="text"
                      name="first_name"
                      id="first_name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary/60 focus:border-primary/60 block w-full p-2.5"
                      placeholder="Ingresa tus nombres"
                      value={values.firstName}
                      onChange={handleChange("firstName")}
                      onBlur={handleBlur("firstName")}
                    />
                  </div>
                  <CustomErrorMessage
                    name="firstName"
                    errors={errors}
                    touched={touched}
                  />
                  <div>
                    <label
                      htmlFor="last_name"
                      className="block text-sm font-medium text-gray-900"
                    >
                      Apellidos
                    </label>
                    <input
                      type="text"
                      name="last_name"
                      id="last_name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary/60 focus:border-primary/60 block w-full p-2.5"
                      placeholder="Ingresa tus apellidos"
                      value={values.lastName}
                      onChange={handleChange("lastName")}
                      onBlur={handleBlur("lastName")}
                    />
                  </div>
                  <CustomErrorMessage
                    name="lastName"
                    errors={errors}
                    touched={touched}
                  />
                  <div>
                    <label
                      htmlFor="email-register"
                      className="block text-sm font-medium text-gray-900"
                    >
                      Tu correo electrónico
                    </label>
                    <input
                      type="email"
                      name="email-register"
                      id="email-register"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary/60 focus:border-primary/60 block w-full p-2.5"
                      placeholder="name@company.com"
                      value={values.email}
                      onChange={handleChange("email")}
                      onBlur={handleBlur("email")}
                    />
                  </div>
                  <CustomErrorMessage
                    name="email"
                    errors={errors}
                    touched={touched}
                  />
                  <div>
                    <label
                      htmlFor="password-register"
                      className="block text-sm font-medium text-gray-900"
                    >
                      Contraseña
                    </label>
                    <input
                      type="password"
                      name="password-register"
                      id="password-register"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary/60 focus:border-primary/60 block w-full p-2.5"
                      value={values.password}
                      onChange={handleChange("password")}
                      onBlur={handleBlur("password")}
                    />
                  </div>
                  <CustomErrorMessage
                    name="password"
                    errors={errors}
                    touched={touched}
                  />
                  <div>
                    <label
                      htmlFor="confirm-password"
                      className="block text-sm font-medium text-gray-900"
                    >
                      Repite tu contraseña
                    </label>
                    <input
                      type="password"
                      name="confirm-password"
                      id="confirm-password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary/60 focus:border-primary/60 block w-full p-2.5"
                      value={values.confirmPassword}
                      onChange={handleChange("confirmPassword")}
                      onBlur={handleBlur("confirmPassword")}
                    />
                  </div>
                  <CustomErrorMessage
                    name="confirmPassword"
                    errors={errors}
                    touched={touched}
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full cursor-pointer text-white bg-primary hover:bg-primary/70 focus:ring-4 focus:outline-none focus:ring-primary/30 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
                      isSubmitting && "cursor-progress"
                    }`}
                  >
                    Iniciar
                  </button>
                  <p className="text-sm font-light mt-4 text-gray-500">
                    ¿Ya posees una cuenta?{" "}
                    <Link
                      to="/"
                      className="font-medium text-primary/60 hover:underline"
                    >
                      Ingresa aquí
                    </Link>
                  </p>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </section>
  );
};
