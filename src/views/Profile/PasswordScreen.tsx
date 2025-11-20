import { Formik } from "formik";
import { useAuthStore } from "../../presentation/store/useAuthStore";
import { updatePassword } from "../../helpers/get-error-forms";
import { InputPassword } from "../../components/input/InputPassword";
import { CustomErrorMessage } from "../../components/general/CustomErrorMessage";

interface PasswordForm {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const PasswordScreen = () => {
  const passwordForm: PasswordForm = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const { changePassword } = useAuthStore();

  return (
    <div className="bg-white p-4 rounded-xl">
      <h2 className="text-center font-semibold text-xl">Cambiar contraseña</h2>
      <p className="text-sm font-normal px-10 my-4">
        La contraseña debe tener mínimo 8 caracteres, una letra mayúscula, una
        minúscula, un número y un carácter especial {`(= >?:;'{})`}.
      </p>
      <Formik
        initialValues={passwordForm}
        onSubmit={async (formLike, { setSubmitting }) => {
          const success = await changePassword(
            formLike.oldPassword,
            formLike.newPassword
          );

          if (success)
            alert("Exito la contraseña se ha actualizado con éxito!");
          setSubmitting(false);
        }}
        validationSchema={updatePassword}
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
          <div className="w-1/2 mx-auto flex flex-col gap-4">
            <InputPassword
              password={values.oldPassword}
              label="Contraseña antigua"
              id="oldPassword"
              name="oldPassword"
              onChangeText={handleChange("oldPassword")}
              onBlur={handleBlur("oldPassword")}
            />
            <CustomErrorMessage
              name="oldPassword"
              errors={errors}
              touched={touched}
            />
            <InputPassword
              label="Contraseña nueva"
              password={values.oldPassword}
              id="newPassword"
              name="newPassword"
              onChangeText={handleChange("newPassword")}
              onBlur={handleBlur("newPassword")}
            />
            <CustomErrorMessage
              name="newPassword"
              errors={errors}
              touched={touched}
            />
            <InputPassword
              password={values.oldPassword}
              label="Repite la nueva contraseña"
              id="confirmPassword"
              name="confirmPassword"
              onChangeText={handleChange("confirmPassword")}
              onBlur={handleBlur("confirmPassword")}
            />
            <CustomErrorMessage
              name="confirmPassword"
              errors={errors}
              touched={touched}
            />
            <button
              disabled={isSubmitting}
              onClick={() => handleSubmit()}
              type="button"
              className={`bg-primary text-center p-4 rounded-xl cursor-pointer hover:bg-primary/60 text-white font-semibold ${
                isSubmitting && "cursor-progress"
              }`}
            >
              Actualizar contraseña
            </button>
          </div>
        )}
      </Formik>
    </div>
  );
};
