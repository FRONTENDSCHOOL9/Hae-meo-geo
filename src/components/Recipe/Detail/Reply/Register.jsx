import { Button } from "@components/Button/Button";
import useCustomAxios from "@hooks/useCustomAxios.mjs";
import useUserStore from "@zustand/userStore.mjs";
import modalStore from "@zustand/modalStore.mjs";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import uploadImage from "@utils/uploadImage.mjs";
import ReplyStyle from "./Reply.module.css";
import styles from "./Register.module.css";
import PropTypes from "prop-types";

ReplyRegister.propTypes = {
  rcpName: PropTypes.string.isRequired,
  rcpNum: PropTypes.number.isRequired,
  setRepliesFn: PropTypes.func.isRequired,
  rating: PropTypes.number,
  setRating: PropTypes.func.isRequired,
  ratingModify: PropTypes.number,
  attachImg: PropTypes.string,
  setAttachImg: PropTypes.func,
  attachImgModify: PropTypes.string,
  setAttachImgModify: PropTypes.func,
  isModify: PropTypes.bool.isRequired,
  originalContent: PropTypes.string,
  postId: PropTypes.number,
  setPostId: PropTypes.func.isRequired,
};

function ReplyRegister({
  rcpName,
  rcpNum,
  setRepliesFn,
  rating,
  setRating,
  ratingModify,
  attachImg,
  setAttachImg,
  attachImgModify,
  setAttachImgModify,
  isModify = false,
  originalContent,
  postId,
  setPostId,
}) {
  const { replyRegister, ratingErrorMsg, contentErrorMsg, noLogin, buttonWr } =
    styles;
  const { user } = useUserStore();
  const axios = useCustomAxios();
  const { setModal } = modalStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      rating: isModify ? ratingModify : null,
      content: isModify ? originalContent : null,
      image: isModify ? attachImgModify : null,
    },
  });

  const file = useRef();
  const fileModify = useRef();
  const ref = register("image");
  const refModify = register("imageModify");

  const onSubmit = async (formData) => {
    try {
      formData = {
        ...formData,
        type: "qna",
        product_id: rcpNum,
        title: `${rcpName} 후기`,
        extra: {
          rating: formData.rating,
        },
      };

      // 수정 버전이고 이미지를 새로 등록한 경우
      if (isModify && formData.imageModify?.length) {
        formData.image = formData.imageModify;
      }

      if (formData.image?.length) {
        if (formData.image[0] instanceof File) {
          // 첨부파일을 등록한 경우, 이미지 업로드 함수 실행
          formData.extra.image = await uploadImage(formData, "image");
        } else {
          // 기존 첨부파일을 사용할 경우
          formData.extra.image = formData.image;
        }
        delete formData.image;
      } else {
        delete formData?.image;
      }

      // 게시물 등록 및 수정
      const res = formData.isModify
        ? await axios.patch(`/posts/${postId}`, formData)
        : await axios.post("/posts", formData);

      // 수정 및 등록된 게시물을 반영한 리스트 조회
      const { data } = await axios.get(
        `/posts?type=qna&custom={"product_id": ${rcpNum}}&sort={"_id":1}`,
      );
      setRepliesFn(data);

      if (formData.isModify) {
        setModal({ message: "후기가 수정되었습니다." });
        setAttachImgModify();
      } else {
        setModal({ message: "후기가 등록되었습니다." });
        setAttachImg();
      }
      setPostId();
      reset();
      setRating();
    } catch (err) {
      console.error(err);
    }
  };

  const handleRatingClick = (e) => {
    if (!e.target.tagName === "INPUT") return;
    if (e.target.value) setRating(Number(e.target.value));
  };

  const handleAttachAdd = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onloadend = () => {
      isModify
        ? setAttachImgModify(reader.result)
        : setAttachImg(reader.result);
    };
  };

  const handleAttachRemove = () => {
    if (isModify) {
      setAttachImgModify();
      fileModify.current.value = "";
    } else {
      setAttachImg();
      file.current.value = "";
    }
  };

  return (
    <div className={replyRegister}>
      {user ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={ReplyStyle.replyWr}>
            <img
              className={ReplyStyle.profile}
              src={`${import.meta.env.VITE_API_SERVER}/files/${import.meta.env.VITE_CLIENT_ID}/${user.profile}`}
              alt={user.name}
            />
            <div className={ReplyStyle.contentWr}>
              <div className={ReplyStyle.flexWr}>
                <p className={ReplyStyle.name}>{user.name}</p>
                <div
                  className={`${ReplyStyle.ratingWr} ${
                    ReplyStyle[`n${isModify ? ratingModify : rating}`]
                  } ${rating || ratingModify ? ReplyStyle.act : ""}`}
                  onClick={handleRatingClick}
                >
                  <label>
                    <input
                      type="radio"
                      name="rating"
                      value="1"
                      {...register("rating", {
                        required: "별점을 등록하세요",
                      })}
                    />
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="rating"
                      value="2"
                      {...register("rating", {
                        required: "별점을 등록하세요",
                      })}
                    />
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="rating"
                      value="3"
                      {...register("rating", {
                        required: "별점을 등록하세요",
                      })}
                    />
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="rating"
                      value="4"
                      {...register("rating", {
                        required: "별점을 등록하세요",
                      })}
                    />
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="rating"
                      value="5"
                      {...register("rating", {
                        required: "별점을 등록하세요",
                      })}
                    />
                  </label>
                  {errors && (
                    <div className={`errorMsg ${ratingErrorMsg}`}>
                      {errors.rating?.message}
                    </div>
                  )}
                </div>
              </div>
              <textarea
                name="content"
                id="content"
                cols="30"
                rows="10"
                {...register("content", {
                  required: "내용을 입력하세요.",
                  minLength: {
                    value: 5,
                    message: "5자 이상 입력해주세요.",
                  },
                })}
              ></textarea>
              {errors && (
                <div className={`errorMsg ${contentErrorMsg}`}>
                  {errors.content?.message}
                </div>
              )}
            </div>
            <div
              className={`${ReplyStyle.attachWr} ${styles.attachWr} 
              ${
                isModify
                  ? attachImgModify
                    ? ReplyStyle.act
                    : ""
                  : attachImg
                    ? ReplyStyle.act
                    : ""
              }`}
            >
              <label htmlFor={isModify ? "imageModify" : "image"}>
                {isModify ? (
                  <img
                    src={
                      attachImgModify?.includes("data:image/")
                        ? attachImgModify
                        : `${import.meta.env.VITE_API_SERVER}/files/${import.meta.env.VITE_CLIENT_ID}/${attachImgModify}`
                    }
                    alt="후기 이미지"
                  />
                ) : (
                  <img src={attachImg} alt="후기 이미지" />
                )}
                <span className="hidden">첨부파일 선택</span>
              </label>
              <button type="button" onClick={handleAttachRemove}>
                <span className="hidden">첨부파일 삭제</span>
              </button>
              {isModify ? (
                <>
                  <input
                    type="hidden"
                    name="isModify"
                    value={true}
                    {...register("isModify")}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    id="imageModify"
                    {...register("imageModify", {
                      onChange: (e) => handleAttachAdd(e),
                    })}
                    ref={(e) => {
                      refModify.ref(e);
                      fileModify.current = e;
                    }}
                  />
                </>
              ) : (
                <input
                  type="file"
                  accept="image/*"
                  id="image"
                  {...register("image", {
                    onChange: (e) => handleAttachAdd(e),
                  })}
                  ref={(e) => {
                    ref.ref(e);
                    file.current = e;
                  }}
                />
              )}
            </div>
          </div>
          <div className={buttonWr}>
            {isModify ? (
              <>
                <Button size="medium" onClick={() => setPostId()}>
                  취소
                </Button>
                <Button type="submit" size="medium" color="primary">
                  수정
                </Button>
              </>
            ) : (
              <Button type="submit" size="medium" color="primary">
                등록하기
              </Button>
            )}
          </div>
        </form>
      ) : (
        <p className={noLogin}>
          <Link to="/user/login">로그인</Link>하여 후기를 작성해보세요!
        </p>
      )}
    </div>
  );
}

export default ReplyRegister;
