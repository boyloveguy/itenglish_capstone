import React, { useState, useEffect } from 'react';
import { Button, Form, Loader, Container, Select, TextArea, Label, Radio, Image, Icon, Input } from 'semantic-ui-react';
import { Helmet } from 'react-helmet';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Screen500 from '../Error/Screen500';
import InputNumber from 'react-input-just-numbers';
import { useParams } from "react-router-dom";
import FormData from 'form-data';
import axios from 'axios';
import MenuDiv from '../MenuDiv/MenuDiv';
import Screen404 from '../Error/Screen404';
import './Exam.css';
import Cookies from 'universal-cookie';

const AddFromQuestionPool = (props) => {
    return(
        <div className="exam_details pad-top-150">
            <Helmet>
                <title>ITEnglish | Add questions</title>
            </Helmet>
            <MenuDiv />
            <p>asadsadsdsajdh</p>
        </div>
    )
}

export default AddFromQuestionPool