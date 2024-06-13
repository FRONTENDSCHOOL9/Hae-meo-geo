import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@components/Button/Button";
import styles from "./MyPage.module.css";
import ReplyStyle from "../../components/Recipe/Detail/Reply/Reply.module.css";
import useCustomAxios from "@hooks/useCustomAxios.mjs";
import modalStore from "@zustand/modalStore.mjs";
import { useNavigate } from "react-router-dom";

function EditProfile({ userInfo, user, setUser }) {
  const axios = useCustomAxios();
  const [attachImg, setAttachImg] = useState();
  const defaultImage = "no-profile.png";
  const isHttpUrl = /^(http|https):\/\//;
  const { setModal } = modalStore();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, dirtyFields },
  } = useForm();
  const file = useRef();
  const { ref } = register("profileImage");

  useEffect(() => {
    if (userInfo?.profileImage) {
      setAttachImg(
        isHttpUrl.test(userInfo.profileImage)
          ? userInfo.profileImage
          : `${import.meta.env.VITE_API_SERVER}/files/${import.meta.env.VITE_CLIENT_ID}/${userInfo.profileImage}`,
      );
    } else {
      setAttachImg(defaultImage);
    }
    reset({
      name: userInfo?.name || "",
      birthday: userInfo?.extra?.birthday || userInfo?.birthday || "",
    });
  }, [userInfo, reset]);

  const handleAttachRemove = () => {
    setAttachImg(null);
    file.current.value = "";
  };

  const handleLogout = () => {
    setModal({
      message:
        "회원 정보 수정이 완료되었습니다. \n다시 로그인 후 이용해주세요!",
      event: () => {
        setUser(null);
        localStorage.removeItem("user");
        navigate("/user/login");
      },
    });
  };

  const onSubmit = async (formData) => {
    if (
      Object.keys(dirtyFields).length === 0 &&
      attachImg ===
        (isHttpUrl.test(userInfo.profileImage)
          ? userInfo.profileImage
          : `${import.meta.env.VITE_API_SERVER}/files/${import.meta.env.VITE_CLIENT_ID}/${userInfo.profileImage}`)
    ) {
      setModal({ message: "수정 사항이 없습니다." });
      return;
    }
    try {
      if (file.current.files[0]) {
        const imageFormData = new FormData();
        imageFormData.append("attach", file.current.files[0]);

        const fileRes = await axios("/files", {
          method: "post",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          data: imageFormData,
        });

        if (fileRes.data.item.length !== 0) {
          formData.profileImage = fileRes.data.item[0].name;
        } else {
          formData.profileImage = userInfo.profileImage || defaultImage;
        }
      } else {
        formData.profileImage =
          attachImg === defaultImage ? defaultImage : userInfo?.profileImage;
      }

      const data = new FormData();
      data.append("name", formData.name);
      data.append("birthday", formData.birthday);
      data.append("profileImage", formData.profileImage);
      const res = await axios.patch(`/users/${user._id}`, data);

      if (res.status === 200) {
        handleLogout();
      }
    } catch (err) {
      console.error(err);
      setModal({
        message: "회원 정보 수정 중 오류가 발생했습니다. 다시 시도해 주세요",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset>
        <label htmlFor="email">아이디(이메일)</label>
        <input
          type="email"
          id="email"
          defaultValue={user.email || "카카오 로그인 사용자입니다."}
          disabled
        />
      </fieldset>

      <fieldset>
        <label htmlFor="name">닉네임</label>
        <input
          type="text"
          id="name"
          defaultValue={userInfo?.name}
          {...register("name", {
            required: "닉네임을 입력하세요.",
            minLength: {
              value: 2,
              message: "닉네임은 2글자 이상 입력하세요.",
            },
          })}
        />
        {errors.name && <p>{errors.name.message}</p>}
      </fieldset>

      <fieldset>
        <label htmlFor="birthday">생일</label>
        <input
          type="text"
          id="birthday"
          defaultValue={userInfo?.extra?.birthday || userInfo?.birthday}
          placeholder="MM-DD"
          {...register("birthday", {
            pattern: {
              value: /^(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/,
              message: "올바른 형식으로 입력하세요. (MM-DD)",
            },
          })}
        />
        {errors.birthday && <p>{errors.birthday.message}</p>}
      </fieldset>

      <fieldset className={styles.profilewrapper}>
        <label htmlFor="profileImage" className="profilelabel">
          프로필
        </label>
        <div
          className={`${styles.profile} ${ReplyStyle.attachWr} ${styles.attachWr} ${
            attachImg ? ReplyStyle.act : ""
          }`}
        >
          <label htmlFor="profileImage" className="profilelabel">
            <img src={attachImg || defaultImage} alt="프로필 이미지" />
            <span className="hidden">첨부파일 선택</span>
          </label>
          <button type="button" onClick={handleAttachRemove}>
            <span className="hidden">첨부파일 삭제</span>
          </button>
          <input
            type="file"
            accept="image/*"
            id="profileImage"
            {...register("profileImage", {
              onChange: (e) => {
                const reader = new FileReader();
                reader.readAsDataURL(e.target.files[0]);
                reader.onloadend = () => {
                  setAttachImg(reader.result);
                };
              },
            })}
            ref={(e) => {
              ref(e);
              file.current = e;
            }}
          />
        </div>
      </fieldset>
      <hr />
      <Button type="submit" color="primary" size="large" filled="false">
        수정하기
      </Button>
    </form>
  );
}

export default EditProfile;
