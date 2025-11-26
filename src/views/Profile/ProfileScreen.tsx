import { useEffect, useState } from "react";
import type { UserData } from "../../core/auth/interface";
import { useAuthStore } from "../../presentation/store/useAuthStore";
import { useUser } from "../../presentation/user/useUser";
import { ModalMessage } from "../../components/modal/ModalMessage";

interface ModaProps {
  open: boolean;
  message: string;
}

export const ProfileScreen = () => {
  const [dataUser, setDataUser] = useState<UserData>();
  const [description, setDescription] = useState<string>("");
  const [modalProps, setModalProps] = useState<ModaProps>({
    open: false,
    message: "",
  });
  const [error, setError] = useState<boolean>(false);

  const { user } = useAuthStore();

  const { userQuery, userMutation } = useUser(user?.id);

  useEffect(() => {
    if (userQuery.data) setDataUser(userQuery.data);
  }, [userQuery.data]);

  useEffect(() => {
    if (userQuery.data) setDescription(userQuery.data.biography ?? "");
  }, [userQuery.data]);

  const handleUpdate = async () => {
    if (description.trim() === "") {
      setError(true);
      return;
    }
    await userMutation.mutateAsync({ biography: description });
    setModalProps({
      open: true,
      message: "La biografía se ha actualizado con éxito",
    });
  };

  return (
    <>
      <ModalMessage
        open={modalProps.open}
        message={modalProps.message}
        onClose={() => setModalProps({ message: "", open: false })}
      />
      <div>
        <h2 className="text-center text-primary mb-4 text-xl font-semibold">
          Bienvenido {dataUser?.firstName} {dataUser?.lastName}
        </h2>
        <h2 className="px-4 text-sm">Correo: {user?.email}</h2>
        <div className="my-5 px-4 text-sm">
          <h2 className="mb-4">Realiza una breve descripción de tu persona</h2>
          <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50">
            <div className="px-4 py-2 bg-white rounded-t-lg">
              <label htmlFor="comment" className="sr-only">
                Realiza una breve descripción de tu persona
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                id="comment"
                rows={8}
                className="w-full px-0 text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none bg-transparent"
                placeholder="Biografía personal"
              ></textarea>
              {error && (
                <p className="text-danger">El campo no puede estar vacío</p>
              )}
            </div>
            <div className="flex items-center justify-between px-3 py-2 border-t">
              <button
                disabled={userMutation.isPending}
                onClick={handleUpdate}
                className="bg-primary text-white p-2 font-semibold rounded-xl cursor-pointer"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
