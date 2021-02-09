import client from './client';

//프린트를 설정하고 타입에 맞게 출력, 그리고 저장
export const setPrint = ({type, semester, numberOfQuestion, questionType, typeOfExam, difficulty, includeMore }) => client.post('/api/print/' + type, 
{semester, numberOfQuestion, questionType, typeOfExam, difficulty, includeMore});

//내 프린트를 가져옴
export const getPrintList = () => client.get('/api/profile/getPrintList');

//내 프린트 중 특정한 프린트의 자세한 정보를 가져옴
export const getPrintDetail = (printId) => client.get('/api/print/' + printId);
