import {Fragment} from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import {useFormik} from "formik";
import {Input} from "../../components/forms/fields";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

export const Registration = () => {
    const navigate = useNavigate();
    const form = useFormik({
        initialValues: {
            first_name: '',
            last_name: '',
            surname: '',
            username: '',
            email: '',
            place_of_study: '',
            study_group_number: '',
            place_of_work: '',
            social_network_url: '',
        },
        onSubmit: values => handleSubmit(values),
    });

    const handleSubmit = (values) => {
        axios.post('/api/auth/registration', values).then(r => {
            navigate('/login');
        }).catch();
    }

    return <Fragment>
        <div className="d-flex justify-content-center align-items-center h-exclude-header">
            <Row style={{width: '100%'}}>
                <Col sm={true}/>
                <Col sm={true}>
                    <h1 className={'text-center'}>
                        Регистрация
                    </h1>
                    <Form>
                        <Row>
                            <Col>
                                <Input value={form.values.last_name}
                                       name={'last_name'}
                                       className={'mb-4'}
                                       onChange={form.handleChange}
                                       label={'Фамилия'}
                                />
                            </Col>
                            <Col>
                                <Input value={form.values.first_name}
                                       name={'first_name'}
                                       className={'mb-4'}
                                       onChange={form.handleChange}
                                       label={'Имя'}
                                />
                            </Col>
                            <Col>
                                <Input value={form.values.surname}
                                       name={'surname'}
                                       className={'mb-4'}
                                       onChange={form.handleChange}
                                       label={'Отчество'}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Input value={form.values.email}
                                       name={'email'}
                                       className={'mb-4'}
                                       onChange={form.handleChange}
                                       label={'Email'}
                                />
                            </Col>
                            <Col>
                                <Input value={form.values.username}
                                       name={'username'}
                                       className={'mb-4'}
                                       onChange={form.handleChange}
                                       label={'Логин'}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Input value={form.values.place_of_study}
                                       name={'place_of_study'}
                                       className={'mb-4'}
                                       onChange={form.handleChange}
                                       label={'Место учебы'}
                                />
                            </Col>
                            <Col>
                                <Input value={form.values.study_group_number}
                                       name={'study_group_number'}
                                       className={'mb-4'}
                                       onChange={form.handleChange}
                                       label={'Номер группы'}
                                />
                            </Col>
                        </Row>
                        <Input value={form.values.place_of_work}
                               name={'place_of_work'}
                               className={'mb-4'}
                               onChange={form.handleChange}
                               label={'Место работы'}
                        />
                        <Input value={form.values.social_network_url}
                               name={'social_network_url'}
                               className={'mb-4'}
                               onChange={form.handleChange}
                               label={'Социальная сеть'}
                        />
                        <Button style={{width: '100%'}} onClick={form.submitForm}>
                            Зарегистрироваться
                        </Button>
                        <Link to={'/login'} className={'mt-3 d-block'}>Вход</Link>
                    </Form>
                    <hr/>
                </Col>
                <Col sm={true}/>
            </Row>
        </div>
    </Fragment>
}
