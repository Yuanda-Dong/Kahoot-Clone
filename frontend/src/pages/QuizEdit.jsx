import { useParams } from 'react-router-dom';
// import react from 'react';
import React from 'react';
import DropDown from '../components/DropDown';
import QuestionCard from '../components/QuestionCard';

export default function QuizEdit () {
  const params = useParams();
  console.log(params);
  const [age, setAge] = React.useState('1');
  return (
    <>
      <DropDown
        dropId="age"
        options={['1', '2', '3']}
        target={age}
        handle={setAge}
      ></DropDown>
      {console.log(age)}
      <QuestionCard />
    </>
  );
}
