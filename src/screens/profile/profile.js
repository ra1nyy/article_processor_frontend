import {Fragment, useContext, useEffect} from "react";
import {Button, ButtonGroup, Col, Form, Row} from "react-bootstrap";
import {useFormik} from "formik";
import {Input} from "../../components/forms/fields";
import {AuthContext} from "../../auth";
import {protectedAxios} from "../../utils/axiosAPI";
import axiosInstance from "../../utils/axiosAPI";

export const Profile = () => {
    const {user, setUser} = useContext(AuthContext);

    const form = useFormik({
        initialValues: {
            id: '',
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
        enableReinitialize: true,
        onSubmit: values => handleSubmit(values),
    });

    useEffect(() => {
        if (user) {
            for (let key of Object.keys(form.initialValues)) {
                form.setFieldValue(key, user?.[key]);
            }
        }
    }, [user])

    const handleSubmit = (values) => {
          protectedAxios(axiosInstance.put,'/user/profile', values).then(r => {
              setUser({...user, ...values})
          })
    }

    return <Fragment>
        <div className="d-flex justify-content-center align-items-center h-exclude-header">
            <Row style={{width: '100%'}}>
                <Col md={3}/>
                <Col md={6}>
                    <h1 className={'text-center'}>
                        {user ? `${user.last_name} ${user.first_name} ${user.surname}` : null}
                    </h1>
                    <hr/>
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
                            Обновить
                        </Button>
                    </Form>
                    <hr/>
                </Col>
                <Col md={3}/>
            </Row>
        </div>
    </Fragment>
}
