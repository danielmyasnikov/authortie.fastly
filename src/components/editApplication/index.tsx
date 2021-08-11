import React, { useEffect, useState } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import { ApplicationForm } from 'components/applicationForm/applicationForm';
import { getDetailedApplication } from 'store/detailedApplication/actions';
import { getDetailedApplicationSelector } from 'store/detailedApplication/selectors';
import { AppDispatch } from 'store/types';
import { useDispatch, useSelector } from 'react-redux';

import css from './css.module.less';

interface Params {
  id: string;
}

export const EditApplication = () => {
  const dispatch: AppDispatch = useDispatch();
  const [postData, setPostData] = useState<any>(null);

  const params = useParams<Params>();
  const { post }: any = useSelector(getDetailedApplicationSelector);

  // +++++++approx_date: "2021-08-19"
  // ++++++++comment: "Описание работы Описание работы Описание работы Описание работыОписание работы Описание работы Описание работы Описание работы Описание работы Описание работы Описание работыОписание работы Описание работы Описание работы Описание работыОписание работы Описание работы Описание работы Описание работы Описание работы Описание работы Описание работыОписание работы Описание работы Описание работы Описание работыОписание работы Описание работы Описание работы Описание работы Описание работы Описание работы Описание работы\nОписание работы Описание работы Описание работы Описание работыОписание работы Описание работы Описание работы Описание работы Описание работы Описание работы Описание работы\nОписание работы Описание работы Описание работы Описание работыОписание работы Описание работы Описание работы Описание работы Описание работы Описание работы Описание работы"
  // count_views: null
  // +++++++hide_from_other_users: false
  // ++++++hide_from_search: true
  // id: 128
  // is_profile_visible: false
  // keyword_list: (2) ["Первый ключ", "Второй ключ"]
  // knowledge_area_list: (3) ["biology_genetics", "physics_astronomy", "engineering_material"]
  // offers: []
  // posting_id: null
  // request_type: "request"
  // reward_comment: null
  // reward_currency: null
  // +++++++++reward_sum: 400
  // reward_type_list: (3) ["accept_as_coauthors", "work_with_text_and_graphics", "money"]
  // +++++++title: "Название работы Название работы Название работы Название работы Название работы Название работы. Название работы Название работы Название работы"
  // user: {id: 55, profile: {…}}
  // whois: "self"
  // work_type_list: ["increase_the_citation_of_your_works"]

  useEffect(() => {
    setPostData(post);
  }, [post]);

  useEffect(() => {
    if (!!params.id) {
      dispatch(getDetailedApplication(params.id));
    }
  }, [params.id]);
  return (
    <div className={css.wrapper}>
      <div className={css.content}>
        <h1 className={css.title}>Редактирование</h1>

        <ApplicationForm isEdit editData={postData} />
      </div>
    </div>
  );
};
