import React from 'react';
import { Link } from 'react-router-dom';
import Card from "../UI/Card";
import Button from "../UI/Button";
import TitleBig from '../UI/Titles/TitleBig';

const NotFound = () => {
  return <>
    <TitleBig>404 - URL Not Found!</TitleBig>
    <Link to="/"><Button>Go Home</Button></Link>
  </>
};

export default NotFound;