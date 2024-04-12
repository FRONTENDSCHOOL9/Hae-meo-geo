import useUserStore from "@zustand/userStore.mjs";
import styles from "./Register.module.css";

function ReplyRegister() {
  const { user } = useUserStore();
  console.log(user);
  return <div>Register</div>;
}

export default ReplyRegister;
