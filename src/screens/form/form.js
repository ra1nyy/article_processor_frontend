import {Fragment, useEffect, useState} from "react";
import {Button, ButtonGroup, Col, Form, ProgressBar, Row} from "react-bootstrap";
import {Field, FormikProvider, useFormik} from "formik";
import {FormikSelect, Input} from "../../components/forms/fields";
import {useNavigate} from "react-router-dom";
import axiosInstance, {protectedAxios} from "../../utils/axiosAPI";
import axios from "axios";

export const ArticleForm = () => {
    const navigate = useNavigate();
    const form = useFormik({
        initialValues: {
            scientific_adviser_fullname: '',
            scientific_adviser_academic_degree: '',
            scientific_adviser_academic_title: '',
            scientific_adviser_institute: '',
            scientific_adviser_department: '',
            attached_article_text: '',
            attached_docs_id: null,
            list_of_references: '',
            keywords_rus: '',
            keywords_eng: '',
            abstract_rus: '',
            abstract_eng: '',
            title_rus: '',
            title_eng: '',
            udc: '',
            authors_ids: []
        },
        onSubmit: values => handleSubmit(values),
    });

    const [authors, setAuthors] = useState(null);
    const [article_type, setArticleType] = useState('text');
    const [stage, setStage] = useState(1);
    const [title, setTitle] = useState('Общая информация');
    const [bar, setBar] = useState(5);

    useEffect(() => {
        if (!authors) {
            protectedAxios(axiosInstance.get, '/user/get_all_students').then(r => {
                if (r.status === 200)
                    setAuthors(r.data.map((student) => {
                        return {
                            value: student.id,
                            label: `${student.last_name} ${student.first_name} ${student.surname}`
                        }
                    }))
            })
        }
    }, [authors])

    useEffect(() => {
        switch (stage) {
            case 1: {
                setTitle('Общая информация');
                break
            }
            case 2: {
                setTitle('Научный руководитель');
                break
            }
            case 3: {
                setTitle('Статья');
                break
            }
            default: {
                break
            }
        }
        setBar(stage * 25);
    }, [stage])

    const handleSubmit = (values) => {
        let payload = {...values};
        if (article_type === 'text') {
            protectedAxios(axiosInstance.post, '/article', payload).then(r => {
                navigate('/article')
            })
        } else {
            delete payload.attached_article_text;
            delete payload.list_of_references;
            protectedAxios(axiosInstance.post, '/article', payload).then(r => {
                navigate('/article')
            })
        }
    }

    const nextStage = () => {
        if (stage + 1 <= 4) {
            setStage(stage + 1)
        }
    }

    const prevStage = () => {
        if (stage - 1 >= 1) {
            setStage(stage - 1)
        }
    }

    const loadFile = (e) => {
        let formData = new FormData();
        let file = e.target.files[0];
        formData.append('file_doc', file, file.name);
        protectedAxios(axiosInstance.post, '/file/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }).then(r => {
            if (r.status === 200) {
                form.setFieldValue('attached_docs_id', r.data?.id)
                form.setFieldValue('attached_article_text', null)
            }
        })
    }

    return <Fragment>
        <div className="d-flex justify-content-center align-items-center h-exclude-header">
            <Row style={{width: '100%'}}>
                <Col sm={true}/>
                <Col sm={true}>
                    <h1>
                        {title}
                    </h1>
                    <ProgressBar now={bar}/>
                    <FormikProvider value={form}>
                        <Form className={'mt-3'}>
                            {stage === 1 ?
                                <Fragment>
                                    <Input value={form.values.title_rus}
                                           name={'title_rus'}
                                           className={'mb-4'}
                                           onChange={form.handleChange}
                                           label={'Название статьи на русском'}
                                    />
                                    <Input value={form.values.title_eng}
                                           name={'title_eng'}
                                           className={'mb-4'}
                                           onChange={form.handleChange}
                                           label={'Название статьи на английском'}
                                    />
                                    <Field component={FormikSelect}
                                           isMulti={true}
                                           name={'authors_ids'}
                                           options={authors}
                                           id={'authors_ids'}
                                           label={'Авторы статьи'}
                                    />
                                </Fragment> : null}
                            {stage === 2 ?
                                <Fragment>
                                    <Input value={form.values.scientific_adviser_fullname}
                                           name={'scientific_adviser_fullname'}
                                           className={'mb-4'}
                                           onChange={form.handleChange}
                                           label={'ФИО Руководителя'}
                                    />
                                    <Input value={form.values.scientific_adviser_academic_degree}
                                           name={'scientific_adviser_academic_degree'}
                                           className={'mb-4'}
                                           onChange={form.handleChange}
                                           label={'Ученая степень'}
                                    />
                                    <Input value={form.values.scientific_adviser_academic_title}
                                           name={'scientific_adviser_academic_title'}
                                           className={'mb-4'}
                                           onChange={form.handleChange}
                                           label={'Ученое звание'}
                                    />
                                    <Input value={form.values.scientific_adviser_institute}
                                           name={'scientific_adviser_institute'}
                                           className={'mb-4'}
                                           onChange={form.handleChange}
                                           label={'Институт'}
                                    />
                                    <Input value={form.values.scientific_adviser_department}
                                           name={'scientific_adviser_department'}
                                           className={'mb-4'}
                                           onChange={form.handleChange}
                                           label={'Кафедра'}
                                    />
                                </Fragment> : null}
                            {stage === 3 ?
                                <Fragment>
                                    <Input value={form.values.udc}
                                           name={'udc'}
                                           className={'mb-4'}
                                           onChange={form.handleChange}
                                           label={'УДК'}
                                    />
                                    <Input value={form.values.abstract_rus}
                                           name={'abstract_rus'}
                                           as={'textarea'}
                                           className={'mb-4'}
                                           onChange={form.handleChange}
                                           label={'Аннотация на русском'}
                                    />
                                    <Input value={form.values.abstract_eng}
                                           name={'abstract_eng'}
                                           as={'textarea'}
                                           className={'mb-4'}
                                           onChange={form.handleChange}
                                           label={'Аннотация на английском'}
                                    />
                                    <ButtonGroup style={{width: '100%'}} className={'mb-4'}>
                                        <Button variant={article_type === 'text' ? 'primary' : 'outline-primary'}
                                                onClick={() => setArticleType('text')}>
                                            Текст
                                        </Button>
                                        <Button variant={article_type === 'file' ? 'primary' : 'outline-primary'}
                                                onClick={() => setArticleType('file')}>
                                            Файл
                                        </Button>
                                    </ButtonGroup>
                                    {article_type === 'text' ? <Fragment>
                                        <Input value={form.values.attached_article_text}
                                               name={'attached_article_text'}
                                               as={'textarea'}
                                               className={'mb-4'}
                                               onChange={form.handleChange}
                                               label={'Текст статьи'}
                                        />

                                        <Input value={form.values.list_of_references}
                                               name={'list_of_references'}
                                               as={'textarea'}
                                               className={'mb-4'}
                                               onChange={form.handleChange}
                                               label={'Список литературы'}
                                        />

                                    </Fragment> : null}
                                    {article_type === 'file' ? <Fragment>
                                        <Form.Control type={'file'} onChange={(e) => loadFile(e)}/>
                                    </Fragment> : null}
                                </Fragment> : null}
                            {stage === 4 ?
                                <Fragment>
                                    <Input value={form.values.keywords_rus}
                                           name={'keywords_rus'}
                                           className={'mb-4'}
                                           onChange={form.handleChange}
                                           label={'Ключевые слова на русском'}
                                    />
                                    <Input value={form.values.keywords_eng}
                                           name={'keywords_eng'}
                                           className={'mb-4'}
                                           onChange={form.handleChange}
                                           label={'Ключевые слова на английском'}
                                    />
                                </Fragment> : null}
                        </Form>
                        <div className={'text-center mt-4'}>
                            {stage === 1
                                ? <Button style={{width: '100%'}} onClick={nextStage}>Далее</Button>
                                : <Fragment>
                                    <Row>
                                        <Col md={6}>
                                            <Button style={{width: '100%'}} onClick={prevStage}>Назад</Button>
                                        </Col>
                                        <Col md={6}>
                                            {stage === 4
                                                ? <Button style={{width: '100%'}}
                                                          onClick={form.submitForm}>Сохранить</Button>
                                                : <Button style={{width: '100%'}} onClick={nextStage}>Далее</Button>
                                            }
                                        </Col>
                                    </Row>
                                </Fragment>
                            }
                        </div>
                        <hr/>
                    </FormikProvider>
                </Col>
                <Col sm={true}/>
            </Row>
        </div>
    </Fragment>
}
