import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:4000",
  // timeout: 1,
  //0.001초의 시간을 주어 이 시간내에 응답을 못 받으면 오류가 나게 한다.
});

instance.interceptors.request.use(
  // 요청을 보내기 전 수행되는 함수
  function (config) {
    console.log("인터셉트 요청 성공!");
    return config;
  },
  // 오류 요청을 보내기 전 수행되는 함수
  function (error) {
    console.log("인터셉트 요청 오류!");
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  //응답을 내보내기 전 수행되는 함수
  function (response) {
    console.log("인터넵트 응답 받았어요!");
    return response;
  },
  // 오류응답을 내보내기 전 수행되는 함수
  function (error) {
    console.log("인터셉트 응답 못받았어요...ㅠㅠ");
    return Promise.reject(error);
  }
);

export default instance;
