import { Button } from "@components/Button/Button";

function Signup(){
  return (
    <>
      <h3>회원가입</h3>
      <p>배달음식은 그만! 함께 밥 <strong>해머거</strong>요 :-)</p>
      <Button type="button" color="primary" size="large" filled="filled">이메일 주소로 회원가입</Button>
    </>
  )
}

export default Signup;